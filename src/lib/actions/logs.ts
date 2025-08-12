"use server";

import { prisma } from "@/db/prisma";
import { ActionResult } from "next/dist/server/app-render/types";
import { Logtype } from "@/generated/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

// Types for logging
interface LogEntry {
  level: Logtype;
  message: string;
  metadata?: string;
  source?: string;
  userId?: string;
  sessionId?: string;
}

// Create a new log entry
export async function createLog(entry: LogEntry): Promise<ActionResult> {
  try {
    const log = await prisma.logs.create({
      data: {
        level: entry.level,
        message: entry.message,
        metadata: entry.metadata,
        source: entry.source,
        userId: entry.userId,
        sessionId: entry.sessionId,
      },
    });

    return {
      success: true,
      data: log,
      message: "Log entry created successfully",
    };
  } catch (error) {
    console.error("Error creating log entry:", error);
    return {
      success: false,
      data: null,
      message: "Failed to create log entry",
    };
  }
}

// Get all logs with optional filtering
export async function getAllLogs(filters?: {
  level?: Logtype;
  source?: string;
  limit?: number;
  offset?: number;
}): Promise<ActionResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return {
        success: false,
        data: null,
        message: "Unauthorized access",
      };
    }

    const where: any = {};
    if (filters?.level) where.level = filters.level;
    if (filters?.source)
      where.source = { contains: filters.source, mode: "insensitive" };

    const logs = await prisma.logs.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: filters?.limit || 100,
      skip: filters?.offset || 0,
    });

    return {
      success: true,
      data: logs,
      message: "Logs data successfully fetched",
    };
  } catch (error) {
    console.error("Error fetching logs:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch logs data",
    };
  }
}

// Get log statistics
export async function getLogStats(): Promise<ActionResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return {
        success: false,
        data: null,
        message: "Unauthorized access",
      };
    }

    // Get stats for different time periods
    const now = new Date();
    const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [stats24h, stats7d, totalCount] = await Promise.all([
      prisma.logs.groupBy({
        by: ["level"],
        _count: { level: true },
        where: { createdAt: { gte: last24h } },
      }),
      prisma.logs.groupBy({
        by: ["level"],
        _count: { level: true },
        where: { createdAt: { gte: last7d } },
      }),
      prisma.logs.count(),
    ]);

    return {
      success: true,
      data: {
        last24h: stats24h,
        last7d: stats7d,
        total: totalCount,
      },
      message: "Log statistics fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching log stats:", error);
    return {
      success: false,
      data: null,
      message: "Failed to fetch log statistics",
    };
  }
}

// Clear old logs (cleanup utility)
export async function clearOldLogs(
  daysToKeep: number = 30
): Promise<ActionResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return {
        success: false,
        data: null,
        message: "Unauthorized access",
      };
    }

    const cutoffDate = new Date(Date.now() - daysToKeep * 24 * 60 * 60 * 1000);

    const result = await prisma.logs.deleteMany({
      where: {
        createdAt: { lt: cutoffDate },
      },
    });

    return {
      success: true,
      data: { deletedCount: result.count },
      message: `Successfully deleted ${result.count} old log entries`,
    };
  } catch (error) {
    console.error("Error clearing old logs:", error);
    return {
      success: false,
      data: null,
      message: "Failed to clear old logs",
    };
  }
}

// Utility functions for easy logging throughout the app
export async function logError(
  message: string,
  metadata?: any,
  source?: string,
  userId?: string
) {
  return createLog({
    level: "ERROR",
    message,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
    source,
    userId,
  });
}

export async function logWarning(
  message: string,
  metadata?: any,
  source?: string,
  userId?: string
) {
  return createLog({
    level: "WARN",
    message,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
    source,
    userId,
  });
}

export async function logInfo(
  message: string,
  metadata?: any,
  source?: string,
  userId?: string
) {
  return createLog({
    level: "INFO",
    message,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
    source,
    userId,
  });
}

export async function logSuccess(
  message: string,
  metadata?: any,
  source?: string,
  userId?: string
) {
  return createLog({
    level: "SUCCESS",
    message,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
    source,
    userId,
  });
}

export async function logDebug(
  message: string,
  metadata?: any,
  source?: string,
  userId?: string
) {
  return createLog({
    level: "DEBUG",
    message,
    metadata: metadata ? JSON.stringify(metadata) : undefined,
    source,
    userId,
  });
}
