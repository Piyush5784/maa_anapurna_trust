import { prisma } from "@/db/prisma";
import { Logtype } from "@/generated/prisma";
import { Info, AlertCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import {
  getLogIcon,
  getLogVariant,
  formatTimeAgo,
} from "@/helpers/logs-helper";

export async function LogsData({
  level,
  source,
  search,
  page = 1,
}: {
  level?: Logtype;
  source?: string;
  search?: string;
  page?: number;
}) {
  const ITEMS_PER_PAGE = 50;
  const skip = (page - 1) * ITEMS_PER_PAGE;

  try {
    // Build where clause
    const where: any = {};
    if (level) where.level = level;
    if (source) where.source = { contains: source, mode: "insensitive" };
    if (search) {
      where.OR = [
        { message: { contains: search, mode: "insensitive" } },
        { source: { contains: search, mode: "insensitive" } },
        { metadata: { contains: search, mode: "insensitive" } },
      ];
    }

    // Fetch logs with pagination (using the createdAt index)
    const [logs, totalCount] = await Promise.all([
      prisma.logs.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: ITEMS_PER_PAGE,
        skip,
      }),
      prisma.logs.count({ where }),
    ]);

    // Get stats for last 24 hours (using the level index)
    const stats = await prisma.logs.groupBy({
      by: ["level"],
      _count: { level: true },
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
    });

    // Get unique sources (using the source index)
    const sources = await prisma.logs.findMany({
      where: { source: { not: null } },
      select: { source: true },
      distinct: ["source"],
      take: 20,
    });

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    return (
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {(["ERROR", "WARN", "INFO", "SUCCESS", "DEBUG"] as Logtype[]).map(
            (logLevel) => {
              const count =
                stats.find((s) => s.level === logLevel)?._count.level || 0;
              return (
                <Card key={logLevel}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      {getLogIcon(logLevel)}
                      <div>
                        <p className="text-sm font-medium text-gray-600">
                          {logLevel}
                        </p>
                        <p className="text-2xl font-bold">{count}</p>
                        <p className="text-xs text-gray-500">Last 24h</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            }
          )}
        </div>

        {/* Logs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
            <CardDescription>
              Showing {logs.length} of {totalCount} logs{" "}
              {totalPages > 1 && `(Page ${page} of ${totalPages})`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.length === 0 ? (
                <div className="text-center py-8">
                  <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    No logs found matching your criteria
                  </p>
                </div>
              ) : (
                logs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start space-x-4 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex-shrink-0">{getLogIcon(log.level)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant={getLogVariant(log.level)}>
                          {log.level}
                        </Badge>
                        {log.source && (
                          <Badge variant="outline">{log.source}</Badge>
                        )}
                        <span className="text-sm text-gray-500">
                          {formatTimeAgo(new Date(log.createdAt))}
                        </span>
                        <span className="text-xs text-gray-400">
                          {new Date(log.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 dark:text-gray-100 break-words">
                        {log.message}
                      </p>
                      {log.metadata && (
                        <details className="mt-2">
                          <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200">
                            Show metadata
                          </summary>
                          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-x-auto">
                            {log.metadata}
                          </pre>
                        </details>
                      )}
                      <div className="flex gap-4 mt-1 text-xs text-gray-500">
                        {log.userId && <span>User: {log.userId}</span>}
                        {log.sessionId && (
                          <span>
                            Session: {log.sessionId.substring(0, 8)}...
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <p className="text-sm text-gray-600">
                  Page {page} of {totalPages} ({totalCount} total logs)
                </p>
                <div className="flex space-x-2">
                  {page > 1 && (
                    <Button variant="outline" size="sm">
                      Previous
                    </Button>
                  )}
                  {page < totalPages && (
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sources List */}
        {sources.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Log Sources</CardTitle>
              <CardDescription>
                Components and services generating logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
                  <Badge key={source.source} variant="secondary">
                    {source.source}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching logs:", error);
    return (
      <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200">
            <AlertCircle className="w-5 h-5" />
            <div>
              <h3 className="font-semibold">Error loading logs</h3>
              <p className="text-sm">
                {error instanceof Error
                  ? error.message
                  : "Unknown error occurred"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
}
