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
  BarChart3,
  Users,
  Eye,
  Calendar,
  TrendingUp,
  Download,
} from "lucide-react";

const analyticsData = [
  { metric: "Page Views", value: "125,689", change: "+12%", trend: "up" },
  { metric: "Unique Visitors", value: "45,231", change: "+8%", trend: "up" },
  { metric: "Bounce Rate", value: "32%", change: "-5%", trend: "down" },
  { metric: "Session Duration", value: "4m 32s", change: "+15%", trend: "up" },
];

const popularPages = [
  { page: "/", views: "45,123", percentage: "35%" },
  { page: "/about", views: "23,456", percentage: "18%" },
  { page: "/programs", views: "18,789", percentage: "15%" },
  { page: "/contact", views: "12,345", percentage: "10%" },
  { page: "/donate", views: "9,876", percentage: "8%" },
];

const trafficSources = [
  { source: "Direct", visitors: "18,456", percentage: "41%" },
  { source: "Google", visitors: "15,234", percentage: "34%" },
  { source: "Social Media", visitors: "6,789", percentage: "15%" },
  { source: "Referrals", visitors: "3,456", percentage: "8%" },
  { source: "Email", visitors: "1,234", percentage: "2%" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Track website performance and user behavior
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 Days
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {analyticsData.map((metric, index) => (
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
        {/* Popular Pages */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              Popular Pages
            </CardTitle>
            <CardDescription>
              Most visited pages on your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {popularPages.map((page, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{page.page}</TableCell>
                    <TableCell>{page.views}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{page.percentage}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-600" />
              Traffic Sources
            </CardTitle>
            <CardDescription>
              Where your visitors are coming from
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Visitors</TableHead>
                  <TableHead>Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trafficSources.map((source, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {source.source}
                    </TableCell>
                    <TableCell>{source.visitors}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{source.percentage}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Real-time Activity
          </CardTitle>
          <CardDescription>
            Current website activity and online users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">127</div>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">8</div>
              <p className="text-sm text-gray-600">Pages/Session</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">2m 45s</div>
              <p className="text-sm text-gray-600">Avg Session</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
