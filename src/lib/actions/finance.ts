"use server";

import { revalidatePath } from "next/cache";
import { fetchLatestRazorpayPayments } from "./razorpay";

export async function refreshFinanceData(days: number = 7, count: number = 50) {
  try {
    console.log("[REFRESH ACTION] Refreshing finance data...");
    console.log("[REFRESH ACTION] Parameters:", { days, count });

    // Fetch fresh data from Razorpay
    const result = await fetchLatestRazorpayPayments(days, count);

    if (!result.success) {
      console.error("[REFRESH ACTION] Razorpay fetch failed:", result.error);
      return {
        success: false,
        error: result.error || "Failed to fetch data from Razorpay",
        timestamp: new Date().toISOString(),
      };
    }

    // Revalidate the finance page to force fresh data
    revalidatePath("/Manage/finance");

    console.log("[REFRESH ACTION] Finance data refreshed successfully");
    console.log(
      "[REFRESH ACTION] Payment count:",
      result.data?.payments?.length || 0
    );

    return {
      success: true,
      data: result.data,
      message: `Refreshed ${result.data?.payments?.length || 0} payments`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
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
    revalidatePath("/Manage", "layout");

    console.log("[REFRESH ACTION] Page refreshed successfully");

    return {
      success: true,
      message: "Page refreshed successfully",
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("[REFRESH ACTION] Error force refreshing page:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to refresh page",
      timestamp: new Date().toISOString(),
    };
  }
}
