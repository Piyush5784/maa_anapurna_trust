"use server";

import Razorpay from "razorpay";

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

    // Fetch payments from Razorpay with date filtering to get latest payments
    const payments = await razorpay.payments.all({
      count,
      skip,
      from: from || defaultFrom,
      to: to || defaultTo,
    });

    // Fetch orders for additional context (also with date filtering)
    const orders = await razorpay.orders.all({
      count,
      skip,
      from: from || defaultFrom,
      to: to || defaultTo,
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

    return {
      success: true,
      data: {
        payments: transformedPayments,
        orders: transformedOrders,
        summary: {
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
        },
      },
    };
  } catch (error) {
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
  // Get payments from the last X days (default 7 days)
  const to = Math.floor(Date.now() / 1000); // Current timestamp
  const from = Math.floor((Date.now() - days * 24 * 60 * 60 * 1000) / 1000); // X days ago

  return fetchRazorpayPayments({
    count,
    skip: 0,
    from,
    to,
  });
}

export async function fetchRazorpayPaymentDetails(paymentId: string) {
  try {
    // Since this function is called from a server component in the /Manage route,
    // the middleware has already validated the user is an admin

    const payment = await razorpay.payments.fetch(paymentId);

    return {
      success: true,
      data: {
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
      },
    };
  } catch (error) {
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
