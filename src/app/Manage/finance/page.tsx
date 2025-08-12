import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  CreditCard,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  IndianRupee,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { fetchLatestRazorpayPayments } from "@/lib/actions/razorpay";
import { RefreshButton } from "@/components/custom/RefreshButton";

// Force dynamic rendering to ensure fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FinancePage() {
  // Get current timestamp for cache debugging
  const fetchTime = new Date().toISOString();
  console.log("[FINANCE PAGE] Rendering at:", fetchTime);

  // Fetch latest Razorpay data (last 7 days, 50 transactions)
  const razorpayResult = await fetchLatestRazorpayPayments(7, 50);

  // Check if there's an error
  const hasError = !razorpayResult.success;
  const errorMessage = hasError ? razorpayResult.error : null;

  // Fallback data in case of error
  const defaultData = {
    payments: [] as Array<{
      id: any;
      orderId: any;
      amount: number;
      currency: any;
      status: string;
      method: string;
      captured: any;
      email: any;
      contact: any;
      description: any;
      fee: number;
      tax: number;
      createdAt: Date;
      notes: any;
      errorCode: any;
      errorDescription: any;
      bank: any;
      wallet: any;
      cardId: any;
    }>,
    summary: {
      totalAmount: 0,
      totalFees: 0,
      totalTransactions: 0,
      successfulTransactions: 0,
      failedTransactions: 0,
      pendingTransactions: 0,
      paymentsByStatus: {} as Record<string, number>,
      paymentsByMethod: {} as Record<string, number>,
    },
  };

  const data =
    razorpayResult.success && (razorpayResult as any).data
      ? (razorpayResult as any).data
      : defaultData;

  // Format revenue data from Razorpay
  const revenueData = [
    {
      metric: "Total Revenue",
      value: `₹${data.summary.totalAmount.toLocaleString()}`,
      change: `${data.summary.successfulTransactions} successful`,
      trend: "up",
      icon: IndianRupee,
    },
    {
      metric: "Total Fees",
      value: `₹${data.summary.totalFees.toLocaleString()}`,
      change: `${
        data.summary.totalAmount > 0
          ? ((data.summary.totalFees / data.summary.totalAmount) * 100).toFixed(
              2
            )
          : 0
      }% of revenue`,
      trend: "neutral",
      icon: CreditCard,
    },
    {
      metric: "Success Rate",
      value: `${
        data.summary.totalTransactions > 0
          ? (
              (data.summary.successfulTransactions /
                data.summary.totalTransactions) *
              100
            ).toFixed(1)
          : 0
      }%`,
      change: `${data.summary.failedTransactions} failed`,
      trend:
        data.summary.successfulTransactions > data.summary.failedTransactions
          ? "up"
          : "down",
      icon: TrendingUp,
    },
    {
      metric: "Average Transaction",
      value: `₹${
        data.summary.successfulTransactions > 0
          ? Math.round(
              data.summary.totalAmount / data.summary.successfulTransactions
            ).toLocaleString()
          : 0
      }`,
      change: `From ${data.summary.totalTransactions} payments`,
      trend: "up",
      icon: DollarSign,
    },
  ];

  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "captured":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Success
          </Badge>
        );
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "authorized":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Pending
          </Badge>
        );
      case "refunded":
        return (
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            Refunded
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  // Get method display name
  const getMethodName = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card";
      case "netbanking":
        return "Net Banking";
      case "wallet":
        return "Wallet";
      case "upi":
        return "UPI";
      default:
        return method.charAt(0).toUpperCase() + method.slice(1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-muted-foreground">
            Latest payments and financial metrics from Razorpay (Last 7 days)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {new Date(fetchTime).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-2">
          <RefreshButton showBothOptions={true} />
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {hasError && (
        <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
              <AlertCircle className="w-5 h-5" />
              <div>
                <h3 className="font-semibold">Unable to fetch Razorpay data</h3>
                <p className="text-sm">{errorMessage}</p>
                <p className="text-xs mt-1">
                  Please check your Razorpay credentials in environment
                  variables.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {revenueData.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.metric}
                    </p>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {metric.change}
                    </div>
                  </div>
                  <IconComponent className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>
                  Latest payments from Razorpay - Last 7 days (
                  {data.payments.length} found)
                </CardDescription>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {data.payments.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.payments.slice(0, 10).map((payment: any) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-xs">
                        {payment.id.slice(-10)}
                      </TableCell>
                      <TableCell className="font-semibold text-green-600">
                        ₹{payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getMethodName(payment.method)}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="max-w-32 truncate">
                        {payment.contact || payment.email || "N/A"}
                      </TableCell>
                      <TableCell className="text-sm">
                        {payment.createdAt.toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No transactions found</p>
                <p className="text-sm">
                  Payments will appear here once configured
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Payment Methods
            </CardTitle>
            <CardDescription>Breakdown by payment method</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.summary.paymentsByMethod).length > 0 ? (
                Object.entries(data.summary.paymentsByMethod).map(
                  ([method, count], index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{getMethodName(method)}</p>
                        <p className="text-sm text-muted-foreground">
                          {count as number} transactions
                        </p>
                      </div>
                      <Badge variant="outline">
                        {(
                          ((count as number) / data.summary.totalTransactions) *
                          100
                        ).toFixed(1)}
                        %
                      </Badge>
                    </div>
                  )
                )
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  <p className="text-sm">No payment method data available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Status Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Payment Status Overview
          </CardTitle>
          <CardDescription>Transaction status distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {data.summary.successfulTransactions}
              </div>
              <div className="text-sm text-green-600">Successful</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-950 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {data.summary.failedTransactions}
              </div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {data.summary.pendingTransactions}
              </div>
              <div className="text-sm text-yellow-600">Pending</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {data.summary.totalTransactions}
              </div>
              <div className="text-sm text-blue-600">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
