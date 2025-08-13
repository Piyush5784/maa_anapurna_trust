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
  Plus,
  Eye,
  Edit,
  BookOpen,
  User,
  Calendar,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { getAllStories } from "@/lib/actions/story";
import { formatDistance } from "date-fns";
import DeleteStoryDialog from "@/components/custom/DeleteStoryDialog";

async function StoriesPage() {
  const result = await getAllStories();
  const stories = result.success ? result.data : [];

  // Calculate stats
  const totalStories = stories.length;
  const publishedStories = stories.filter(
    (story: any) => story.status === "PUBLISHED"
  ).length;
  const draftStories = stories.filter(
    (story: any) => story.status === "DRAFT"
  ).length;
  const featuredStories = stories.filter((story: any) => story.featured).length;

  const storyStats = [
    {
      metric: "Total Stories",
      value: totalStories.toString(),
      change: "",
      period: "All Time",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      metric: "Published",
      value: publishedStories.toString(),
      change: "",
      period: "Live Stories",
      icon: Eye,
      color: "text-green-600",
    },
    {
      metric: "Drafts",
      value: draftStories.toString(),
      change: "",
      period: "In Progress",
      icon: Edit,
      color: "text-yellow-600",
    },
    {
      metric: "Featured",
      value: featuredStories.toString(),
      change: "",
      period: "Highlighted",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-100 text-green-800";
      case "DRAFT":
        return "bg-yellow-100 text-yellow-800";
      case "ARCHIVED":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "EDUCATION":
        return "bg-blue-100 text-blue-800";
      case "HEALTH":
        return "bg-red-100 text-red-800";
      case "COMMUNITY":
        return "bg-green-100 text-green-800";
      case "VOLUNTEER":
        return "bg-purple-100 text-purple-800";
      case "SUCCESS":
        return "bg-yellow-100 text-yellow-800";
      case "IMPACT":
        return "bg-pink-100 text-pink-800";
      case "YOUTH":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stories</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize community stories and impact narratives
          </p>
        </div>
        <Link href="/Manage/stories/create">
          <Button className="bg-green-600 text-white hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Story
          </Button>
        </Link>
      </div>

      {/* Story Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {storyStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-600">{stat.metric}</p>
                  </div>
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stories Table */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-green-600" />
                All Stories
              </CardTitle>
              <CardDescription>
                Manage your community stories and impact narratives
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {stories.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No stories yet
              </h3>
              <p className="text-gray-600 mb-4">
                Create your first story to share impact and inspire your
                community.
              </p>
              <Link href="/Manage/stories/create">
                <Button className="bg-green-600 text-white hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Story
                </Button>
              </Link>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Story</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stories.map((story: any) => (
                  <TableRow key={story.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium line-clamp-1">
                            {story.title}
                          </p>
                          {story.featured && (
                            <Badge
                              variant="secondary"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Featured
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {story?.excerpt?.length > 25
                            ? story?.excerpt?.slice(0, 25) + "..."
                            : story.excerpt}
                        </p>
                        {story.coverImage && (
                          <img
                            src={story.coverImage}
                            alt={story.title}
                            className="w-16 h-12 object-cover rounded border"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">
                            {story.authorName}
                          </p>
                          {story.authorRole && (
                            <p className="text-xs text-gray-600">
                              {story.authorRole}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getCategoryColor(story.category)}>
                        {story.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(story.status)}>
                        {story.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-gray-400" />
                        <span>{story.views || 0}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm">
                            {formatDistance(
                              new Date(story.createdAt),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </p>
                          {story.publishedAt && (
                            <p className="text-xs text-gray-600">
                              Published:{" "}
                              {formatDistance(
                                new Date(story.publishedAt),
                                new Date(),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/Stories/${story.id}`}>
                          <Button
                            size="sm"
                            variant="outline"
                            title="View Story"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/Manage/stories/${story.id}/edit`}>
                          <Button
                            size="sm"
                            variant="outline"
                            title="Edit Story"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <DeleteStoryDialog
                          storyId={story.id}
                          storyTitle={story.title}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              Story Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Use pre-made templates for different story types
            </p>
            <Button className="w-full bg-green-600 hover:bg-green-700">
              Browse Templates
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              View story performance and engagement metrics
            </p>
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Author Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Manage story authors and contributor permissions
            </p>
            <Button variant="outline" className="w-full">
              Manage Authors
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default StoriesPage;
