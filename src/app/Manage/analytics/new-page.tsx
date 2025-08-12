import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Clock,
} from "lucide-react";
import { getProtectedAnalytics } from "@/lib/actions/analytics";

export default async function AnalyticsPage() {
  // Fetch analytics data using server action
  const result = await getProtectedAnalytics(30);

  if (!result.success) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Error loading analytics data: {result.error}
          </p>
        </div>
      </div>
    );
  }

  const data = result.data!;

  // Calculate additional metrics
  const avgViewsPerDay = Math.round(data.totalViewsInPeriod / 30);
  const avgDurationMinutes = Math.round((data.avgDuration / 60) * 10) / 10;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track website performance and user engagement over the last 30 days
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Views (All Time)
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.totalViewsAllTime.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {data.totalPages} pages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Views (30 Days)
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.totalViewsInPeriod.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {avgViewsPerDay} per day average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unique Sessions
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.uniqueSessionsInPeriod.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Views</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.todayViews}</div>
            <p className="text-xs text-muted-foreground">
              {avgDurationMinutes} min avg duration
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Page Statistics */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Pages (All Time)</CardTitle>
            <CardDescription>
              Most viewed pages based on total views
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.pageStats.slice(0, 10).map((page) => (
                  <TableRow key={page.id}>
                    <TableCell>
                      <div className="font-medium">
                        {page.title || page.page}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {page.page}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">
                        {page.totalViews.toLocaleString()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Performance (30 Days)</CardTitle>
            <CardDescription>Views and unique sessions by page</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Unique</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(data.pageViewsByPage) &&
                  data.pageViewsByPage.slice(0, 10).map((page: any, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="font-medium">{page.page}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline">{page.views}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary">{page.uniqueViews}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Page Views</CardTitle>
          <CardDescription>
            Latest visitor activity (last 50 visits)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Referrer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentVisits.slice(0, 20).map((visit, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{visit.page}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(visit.visitedAt).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {visit.duration ? (
                      <Badge variant="outline">{visit.duration}s</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-muted-foreground max-w-48 truncate">
                      {visit.referer || "Direct"}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Daily Views Chart Data */}
      {Array.isArray(data.dailyViews) && data.dailyViews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Daily Views Trend</CardTitle>
            <CardDescription>Page views over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.dailyViews.map((day: any, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{day.date}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{day.views} views</Badge>
                    <Badge variant="secondary">{day.uniqueViews} unique</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
