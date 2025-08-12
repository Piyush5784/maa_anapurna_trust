"use server";

import { revalidatePath } from "next/cache";
import { fetchLatestRazorpayPayments } from "./razorpay";
import { createLog } from "./logs";

export async function refreshFinanceData(days: number = 7, count: number = 50) {
  try {
    // Validate parameters
    if (days < 1 || days > 365) {
      return {
        success: false,
        error: "Days parameter must be between 1 and 365",
        timestamp: new Date().toISOString(),
      };
    }

    if (count < 1 || count > 1000) {
      return {
        success: false,
        error: "Count parameter must be between 1 and 1000",
        timestamp: new Date().toISOString(),
      };
    }

    // Fetch fresh data from Razorpay
    const result = await fetchLatestRazorpayPayments(days, count);

    // Revalidate the finance page cache
    revalidatePath("/Manage/finance");

    if (!result.success) {
      await createLog({
        level: "ERROR",
        message: "Failed to fetch latest payment details during refresh",
        source: "finance",
        metadata: JSON.stringify({
          days,
          count,
          razorpayError: result.error,
        }),
      });
      return {
        success: false,
        error: result.error || "Failed to fetch latest payment details",
        timestamp: new Date().toISOString(),
      };
    }

    // Type assertion for successful result
    const successResult = result as {
      success: true;
      data: { payments: any[]; orders: any[]; summary: any };
    };

    return {
      success: true,
      message: `Refreshed ${successResult.data.payments.length} payments from last ${days} days`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Finance data refresh failed with exception",
      source: "finance",
      metadata: JSON.stringify({
        days,
        count,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
    console.error("[REFRESH ACTION] Error refreshing finance data:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to refresh data",
      timestamp: new Date().toISOString(),
    };
  }
}

export async function forceRefreshFinancePage() {
  try {
    console.log("[REFRESH ACTION] Force refreshing finance page...");

    // Revalidate the entire finance page and its layout
    revalidatePath("/Manage/finance", "page");

    console.log("[REFRESH ACTION] Page refreshed successfully");

    return {
      success: true,
      message: "Page refreshed successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Finance page force refresh failed with exception",
      source: "finance",
      metadata: JSON.stringify({
        action: "forceRefreshFinancePage",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });
    console.error("[REFRESH ACTION] Error force refreshing page:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to refresh page",
      timestamp: new Date().toISOString(),
    };
  }
}

export async function exportFinanceData(
  days: number = 30,
  format: "csv" | "json" = "json"
) {
  try {
    // Fetch data for export
    const result = await fetchLatestRazorpayPayments(days, 1000); // Get up to 1000 transactions

    if (!result.success) {
      await createLog({
        level: "ERROR",
        message: "Failed to fetch data for finance export",
        source: "finance",
        metadata: JSON.stringify({
          days,
          format,
          razorpayError: result.error,
        }),
      });
      return {
        success: false,
        error: result.error || "Failed to fetch data for export",
        timestamp: new Date().toISOString(),
      };
    }

    // Type assertion to help TypeScript understand that result.data exists after success check
    const successResult = result as {
      success: true;
      data: { payments: any[]; orders: any[]; summary: any };
    };

    return {
      success: true,
      data: successResult.data.payments,
      format,
      recordCount: successResult.data.payments.length,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Finance data export failed with exception",
      source: "finance",
      metadata: JSON.stringify({
        days,
        format,
        action: "exportFinanceData",
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      }),
    });

    return {
      success: false,
      error: error instanceof Error ? error.message : "Export failed",
      timestamp: new Date().toISOString(),
    };
  }
}
