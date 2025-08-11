import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Plus,
  Eye,
} from "lucide-react";

const revenueData = [
  { metric: "Total Revenue", value: "$125,689", change: "+12%", trend: "up" },
  { metric: "Monthly Recurring", value: "$45,231", change: "+8%", trend: "up" },
  {
    metric: "One-time Donations",
    value: "$32,458",
    change: "+15%",
    trend: "up",
  },
  { metric: "Average Donation", value: "$127", change: "+3%", trend: "up" },
];

const recentTransactions = [
  {
    id: "TXN001",
    donor: "John Smith",
    amount: "$500",
    type: "One-time",
    status: "Completed",
    date: "2024-08-09",
    method: "Credit Card",
  },
  {
    id: "TXN002",
    donor: "Jane Doe",
    amount: "$50",
    type: "Monthly",
    status: "Completed",
    date: "2024-08-09",
    method: "PayPal",
  },
  {
    id: "TXN003",
    donor: "Mike Johnson",
    amount: "$250",
    type: "One-time",
    status: "Pending",
    date: "2024-08-08",
    method: "Bank Transfer",
  },
  {
    id: "TXN004",
    donor: "Sarah Wilson",
    amount: "$100",
    type: "Monthly",
    status: "Completed",
    date: "2024-08-08",
    method: "Credit Card",
  },
];

const paymentMethods = [
  { method: "Credit/Debit Card", transactions: "1,234", percentage: "65%" },
  { method: "PayPal", transactions: "456", percentage: "24%" },
  { method: "Bank Transfer", transactions: "123", percentage: "7%" },
  { method: "Crypto", transactions: "78", percentage: "4%" },
];

export default function FinancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">
            Track donations, revenue, and financial metrics
          </p>
        </div>
        <div className="flex gap-2">
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

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {revenueData.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {metric.metric}
                  </p>
                  <div className="text-2xl font-bold">{metric.value}</div>
                </div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp className="w-4 h-4" />
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  Latest donations and payments received
                </CardDescription>
              </div>
              <Button variant="outline" className="w-full sm:w-auto">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>{transaction.donor}</TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {transaction.amount}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.type}</Badge>
                    </TableCell>
                    <TableCell>{transaction.method}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          transaction.status === "Completed"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{transaction.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Payment Methods
            </CardTitle>
            <CardDescription>
              Popular payment methods used by donors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{method.method}</p>
                    <p className="text-sm text-gray-600">
                      {method.transactions} transactions
                    </p>
                  </div>
                  <Badge variant="outline">{method.percentage}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" />
              Manual Entry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Record offline donations or payments
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Add Transaction
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Recurring Setup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Manage recurring donation settings
            </p>
            <Button variant="outline" className="w-full">
              Configure
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              Financial Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Generate detailed financial reports
            </p>
            <Button variant="outline" className="w-full">
              Generate Report
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
