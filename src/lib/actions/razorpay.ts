"use server";

import Razorpay from "razorpay";
import { createLog } from "./logs";

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function fetchRazorpayPayments(
  options: {
    count?: number;
    skip?: number;
    from?: number;
    to?: number;
  } = {}
) {
  try {
    // Since this function is called from a server component in the /Manage route,
    // the middleware has already validated the user is an admin
    // We'll skip the token validation here for now

    const { count = 100, skip = 0, from, to } = options;

    // If no date range specified, get payments from last 30 days
    const defaultTo = Math.floor(Date.now() / 1000); // Current timestamp
    const defaultFrom = Math.floor(
      (Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000
    ); // 30 days ago

    const finalFrom = from || defaultFrom;
    const finalTo = to || defaultTo;

    // Validate parameters
    if (count < 1 || count > 1000) {
      return {
        success: false,
        error: "Count parameter must be between 1 and 1000",
      };
    }

    if (skip < 0) {
      return {
        success: false,
        error: "Skip parameter must be non-negative",
      };
    }

    // Fetch payments from Razorpay with date filtering to get latest payments
    const payments = await razorpay.payments.all({
      count,
      skip,
      from: finalFrom,
      to: finalTo,
    });

    // Fetch orders for additional context (also with date filtering)
    const orders = await razorpay.orders.all({
      count,
      skip,
      from: finalFrom,
      to: finalTo,
    });

    // Transform the data for easier consumption
    const transformedPayments = payments.items
      .map((payment: any) => ({
        id: payment.id,
        orderId: payment.order_id,
        amount: Number(payment.amount) / 100, // Convert from paise to rupees
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        captured: payment.captured,
        email: payment.email,
        contact: payment.contact,
        description: payment.description,
        fee: Number(payment.fee || 0) / 100, // Convert from paise to rupees
        tax: Number(payment.tax || 0) / 100, // Convert from paise to rupees
        createdAt: new Date(Number(payment.created_at) * 1000), // Convert from timestamp
        notes: payment.notes || {},
        errorCode: payment.error_code,
        errorDescription: payment.error_description,
        bank: payment.bank,
        wallet: payment.wallet,
        cardId: payment.card_id,
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by latest first

    const transformedOrders = orders.items
      .map((order: any) => ({
        id: order.id,
        amount: Number(order.amount) / 100,
        amountPaid: Number(order.amount_paid) / 100,
        amountDue: Number(order.amount_due) / 100,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        attempts: order.attempts,
        createdAt: new Date(Number(order.created_at) * 1000),
        notes: order.notes || {},
      }))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Sort by latest first

    // Calculate summary statistics
    const totalAmount = transformedPayments
      .filter((p) => p.status === "captured")
      .reduce((sum, payment) => sum + payment.amount, 0);

    const totalFees = transformedPayments
      .filter((p) => p.status === "captured")
      .reduce((sum, payment) => sum + payment.fee, 0);

    const paymentsByStatus = transformedPayments.reduce((acc, payment) => {
      acc[payment.status] = (acc[payment.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const paymentsByMethod = transformedPayments.reduce((acc, payment) => {
      acc[payment.method] = (acc[payment.method] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const summaryData = {
      totalAmount,
      totalFees,
      totalTransactions: transformedPayments.length,
      successfulTransactions: transformedPayments.filter(
        (p) => p.status === "captured"
      ).length,
      failedTransactions: transformedPayments.filter(
        (p) => p.status === "failed"
      ).length,
      pendingTransactions: transformedPayments.filter(
        (p) => p.status === "authorized"
      ).length,
      paymentsByStatus,
      paymentsByMethod,
    };

    return {
      success: true,
      data: {
        payments: transformedPayments,
        orders: transformedOrders,
        summary: summaryData,
      },
    };
  } catch (error) {
    const { count = 100, skip = 0, from, to } = options;
    const defaultTo = Math.floor(Date.now() / 1000);
    const defaultFrom = Math.floor(
      (Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000
    );

    await createLog({
      level: "ERROR",
      message: "Failed to fetch Razorpay payments",
      source: "razorpay",
      metadata: JSON.stringify({
        count,
        skip,
        from: from || defaultFrom,
        to: to || defaultTo,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "fetchRazorpayPayments",
      }),
    });
    console.error("Error fetching Razorpay payments:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to fetch payments",
    };
  }
}

export async function fetchLatestRazorpayPayments(
  days: number = 7,
  count: number = 50
) {
  try {
    // Validate parameters
    if (days < 1 || days > 365) {
      return {
        success: false,
        error: "Days parameter must be between 1 and 365",
      };
    }

    if (count < 1 || count > 1000) {
      return {
        success: false,
        error: "Count parameter must be between 1 and 1000",
      };
    }

    // Get payments from the last X days (default 7 days)
    const to = Math.floor(Date.now() / 1000); // Current timestamp
    const from = Math.floor((Date.now() - days * 24 * 60 * 60 * 1000) / 1000); // X days ago

    const result = await fetchRazorpayPayments({
      count,
      skip: 0,
      from,
      to,
    });

    return result;
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Latest Razorpay payments fetch failed with exception",
      source: "razorpay",
      metadata: JSON.stringify({
        days,
        count,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "fetchLatestRazorpayPayments",
      }),
    });

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch latest payments",
    };
  }
}

export async function fetchRazorpayPaymentDetails(paymentId: string) {
  try {
    // Validate payment ID
    if (
      !paymentId ||
      typeof paymentId !== "string" ||
      paymentId.trim().length === 0
    ) {
      return {
        success: false,
        error: "Valid payment ID is required",
      };
    }

    // Since this function is called from a server component in the /Manage route,
    // the middleware has already validated the user is an admin

    const payment = await razorpay.payments.fetch(paymentId);

    const paymentDetails = {
      id: payment.id,
      orderId: payment.order_id,
      amount: Number(payment.amount) / 100,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      captured: payment.captured,
      email: payment.email,
      contact: payment.contact,
      description: payment.description,
      fee: Number(payment.fee || 0) / 100,
      tax: Number(payment.tax || 0) / 100,
      createdAt: new Date(Number(payment.created_at) * 1000),
      notes: payment.notes || {},
      errorCode: payment.error_code,
      errorDescription: payment.error_description,
      bank: payment.bank,
      wallet: payment.wallet,
      cardId: payment.card_id,
      acquirerData: payment.acquirer_data || {},
    };

    return {
      success: true,
      data: paymentDetails,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to fetch Razorpay payment details",
      source: "razorpay",
      metadata: JSON.stringify({
        paymentId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "fetchRazorpayPaymentDetails",
      }),
    });
    console.error("Error fetching payment details:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to fetch payment details",
    };
  }
}

export async function getRazorpayHealth() {
  try {
    // Test API connectivity by fetching a small amount of recent data
    const testResult = await fetchLatestRazorpayPayments(1, 1);

    if (!testResult.success) {
      await createLog({
        level: "ERROR",
        message: "Razorpay health check failed - API connectivity issue",
        source: "razorpay",
        metadata: JSON.stringify({
          error: testResult.error,
          action: "getRazorpayHealth",
        }),
      });

      return {
        success: false,
        status: "unhealthy",
        error: testResult.error,
        timestamp: new Date().toISOString(),
      };
    }

    const health = {
      status: "healthy",
      apiConnectivity: "operational",
      keyId: process.env.RAZORPAY_KEY_ID ? "configured" : "missing",
      keySecret: process.env.RAZORPAY_KEY_SECRET ? "configured" : "missing",
      lastTestPayment: testResult.error || null,
      timestamp: new Date().toISOString(),
    };

    return {
      success: true,
      data: health,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Razorpay health check failed with exception",
      source: "razorpay",
      metadata: JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "getRazorpayHealth",
      }),
    });

    return {
      success: false,
      status: "unhealthy",
      error: error instanceof Error ? error.message : "Health check failed",
      timestamp: new Date().toISOString(),
    };
  }
}

// export async function verifyRazorpayWebhook(
//   signature: string,
//   body: string,
//   secret: string
// ) {
//   try {

//     if (!signature || !body || !secret) {
//       await createLog({
//         level: "WARN",
//         message: "Invalid parameters for webhook verification",
//         source: "razorpay",
//         metadata: JSON.stringify({
//           hasSignature: !!signature,
//           hasBody: !!body,
//           hasSecret: !!secret,
//         }),
//       });
//       return {
//         success: false,
//         error: "Missing required parameters for webhook verification",
//       };
//     }

//     // Use Razorpay's built-in verification
//     const crypto = require("crypto");
//     const expectedSignature = crypto
//       .createHmac("sha256", secret)
//       .update(body)
//       .digest("hex");

//     const isValid = signature === expectedSignature;

//     if (isValid) {
//       await createLog({
//         level: "SUCCESS",
//         message: "Razorpay webhook verification successful",
//         source: "razorpay",
//         metadata: JSON.stringify({
//           signatureMatch: true,
//           action: "verifyRazorpayWebhook",
//         }),
//       });
//     } else {
//       await createLog({
//         level: "WARN",
//         message: "Razorpay webhook verification failed - signature mismatch",
//         source: "razorpay",
//         metadata: JSON.stringify({
//           signatureMatch: false,
//           providedSignature: signature.substring(0, 20) + "...",
//           expectedSignature: expectedSignature.substring(0, 20) + "...",
//           action: "verifyRazorpayWebhook",
//         }),
//       });
//     }

//     return {
//       success: true,
//       verified: isValid,
//     };
//   } catch (error) {
//     await createLog({
//       level: "ERROR",
//       message: "Razorpay webhook verification failed with exception",
//       source: "razorpay",
//       metadata: JSON.stringify({
//         error: error instanceof Error ? error.message : String(error),
//         stack: error instanceof Error ? error.stack : undefined,
//         action: "verifyRazorpayWebhook",
//       }),
//     });

//     return {
//       success: false,
//       error:
//         error instanceof Error ? error.message : "Webhook verification failed",
//     };
//   }
// }
