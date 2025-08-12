"use server";

import { prisma } from "@/db/prisma";
import { headers } from "next/headers";
import { getToken } from "next-auth/jwt";
import { createLog } from "./logs";

interface TrackPageViewData {
  page: string;
  title?: string;
  sessionId: string;
  duration?: number;
}

export async function trackPageView(data: TrackPageViewData) {
  try {
    const { page, title, sessionId, duration } = data;

    // Get request info from headers
    const headersList = await headers();
    const userAgent = headersList.get("user-agent") || "";
    const referer = headersList.get("referer") || "";
    const forwarded = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const ipAddress = forwarded ? forwarded.split(",")[0] : realIp || "unknown";

    // Create page visit record
    await prisma.pageVisit.create({
      data: {
        page,
        sessionId,
        userAgent,
        ipAddress,
        referer,
        duration,
        visitedAt: new Date(),
      },
    });

    // Update page stats (increment total views)
    await prisma.pageStats.upsert({
      where: { page },
      update: {
        totalViews: { increment: 1 },
        title: title || undefined,
      },
      create: {
        page,
        title: title || page,
        totalViews: 1,
      },
    });

    return { success: true };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to track page view",
      source: "analytics",
      metadata: JSON.stringify({
        page: data.page,
        sessionId: data.sessionId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
    console.error("Analytics trackPageView error:", error);
    return { success: false, error: "Failed to track page view" };
  }
}

export async function getAnalyticsStats(days: number = 30) {
  try {
    // Calculate date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all page stats
    const pageStats = await prisma.pageStats.findMany({
      orderBy: {
        totalViews: "desc",
      },
    });

    // Get recent visits within the date range
    const recentVisits = await prisma.pageVisit.findMany({
      where: {
        visitedAt: {
          gte: startDate,
        },
      },
      orderBy: {
        visitedAt: "desc",
      },
      take: 100,
      select: {
        page: true,
        visitedAt: true,
        duration: true,
        sessionId: true,
        referer: true,
        country: true,
      },
    });

    // Calculate total views for the period
    const totalViewsInPeriod = await prisma.pageVisit.count({
      where: {
        visitedAt: {
          gte: startDate,
        },
      },
    });

    // Calculate unique sessions in the period
    const uniqueSessions = await prisma.pageVisit.findMany({
      where: {
        visitedAt: {
          gte: startDate,
        },
      },
      select: {
        sessionId: true,
      },
      distinct: ["sessionId"],
    });

    // Calculate daily views for chart data
    const dailyViews = await prisma.pageVisit.aggregateRaw({
      pipeline: [
        {
          $match: {
            visitedAt: {
              $gte: startDate,
            },
          },
        },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$visitedAt",
              },
            },
            views: { $sum: 1 },
            uniqueSessions: { $addToSet: "$sessionId" },
          },
        },
        {
          $project: {
            date: "$_id",
            views: 1,
            uniqueViews: { $size: "$uniqueSessions" },
          },
        },
        {
          $sort: {
            date: 1,
          },
        },
      ],
    });

    // Calculate average duration
    const avgDurationResult = await prisma.pageVisit.aggregate({
      where: {
        visitedAt: {
          gte: startDate,
        },
        duration: {
          not: null,
        },
      },
      _avg: {
        duration: true,
      },
    });

    // Get page views by page for the period
    const pageViewsByPage = await prisma.pageVisit.aggregateRaw({
      pipeline: [
        {
          $match: {
            visitedAt: {
              $gte: startDate,
            },
          },
        },
        {
          $group: {
            _id: "$page",
            views: { $sum: 1 },
            uniqueSessions: { $addToSet: "$sessionId" },
          },
        },
        {
          $project: {
            page: "$_id",
            views: 1,
            uniqueViews: { $size: "$uniqueSessions" },
          },
        },
        {
          $sort: {
            views: -1,
          },
        },
      ],
    });

    // Get today's stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayViews = await prisma.pageVisit.count({
      where: {
        visitedAt: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    return {
      success: true,
      data: {
        totalPages: pageStats.length,
        totalViewsAllTime: pageStats.reduce(
          (sum, page) => sum + page.totalViews,
          0
        ),
        totalViewsInPeriod,
        uniqueSessionsInPeriod: uniqueSessions.length,
        todayViews,
        avgDuration: avgDurationResult._avg.duration || 0,
        pageStats,
        recentVisits,
        dailyViews,
        pageViewsByPage,
        period: days,
      },
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to fetch analytics stats",
      source: "analytics",
      metadata: JSON.stringify({
        days,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
    console.error("Analytics stats error:", error);
    return { success: false, error: "Failed to fetch analytics" };
  }
}

export async function getProtectedAnalytics(days: number = 30) {
  try {
    const result = await getAnalyticsStats(days);

    return result;
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to fetch protected analytics",
      source: "analytics",
      metadata: JSON.stringify({
        days,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
    console.error("Protected analytics error:", error);
    return { success: false, error: "Failed to fetch protected analytics" };
  }
}

export async function cleanupOldAnalyticsData(daysToKeep: number = 365) {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    // Delete old page visits
    const deletedVisits = await prisma.pageVisit.deleteMany({
      where: {
        visitedAt: {
          lt: cutoffDate,
        },
      },
    });

    return {
      success: true,
      deletedVisits: deletedVisits.count,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to cleanup old analytics data",
      source: "analytics",
      metadata: JSON.stringify({
        daysToKeep,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
    console.error("Analytics cleanup error:", error);
    return { success: false, error: "Failed to cleanup analytics data" };
  }
}

export async function getAnalyticsHealth() {
  try {
    // Check database connectivity and get basic stats
    const [pageStatsCount, pageVisitsCount, recentVisits] = await Promise.all([
      prisma.pageStats.count(),
      prisma.pageVisit.count(),
      prisma.pageVisit.count({
        where: {
          visitedAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
    ]);

    const health = {
      totalPageStats: pageStatsCount,
      totalPageVisits: pageVisitsCount,
      recentVisits24h: recentVisits,
      status: "healthy",
      timestamp: new Date().toISOString(),
    };

    return {
      success: true,
      data: health,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Analytics health check failed",
      source: "analytics",
      metadata: JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
    return {
      success: false,
      error: "Analytics health check failed",
      data: {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
      },
    };
  }
}
