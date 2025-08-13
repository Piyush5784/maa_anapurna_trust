import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  User,
  Eye,
  ArrowLeft,
  Share2,
  Heart,
  Tag,
} from "lucide-react";
import { getStoryById } from "@/lib/actions/story";
import { formatDistance, format } from "date-fns";
import { Topbar } from "@/components/custom/topbar";
import { Suspense } from "react";
import StoryLoading from "./loading";

interface StoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await getStoryById(id);

  if (!result.success || !result.data) {
    return {
      title: "Story Not Found | MAT",
    };
  }

  const story = result.data;

  return {
    title: `${story.title} | MAT Stories`,
    description: story.metaDescription || story.excerpt,
    openGraph: {
      title: story.metaTitle || story.title,
      description: story.metaDescription || story.excerpt,
      images: story.coverImage ? [story.coverImage] : [],
    },
  };
}
async function StoryContent({ id }: { id: string }) {
  const result = await getStoryById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const story = result.data;

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
    <div className="min-h-screen bg-gray-50">
      <Topbar />
      {/* Navigation */}
      <div className=" border-b container mx-auto max-w-4xl">
        <div className="container mx-auto px-4 py-4">
          <Link href="/Stories">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Stories
            </Button>
          </Link>
        </div>
      </div>

      {/* Story Content */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Badge className={getCategoryColor(story.category)}>
              {story.category}
            </Badge>
            {story.featured && (
              <Badge
                variant="secondary"
                className="ml-2 bg-yellow-100 text-yellow-800"
              >
                Featured
              </Badge>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {story.title}
          </h1>

          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {story.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            {story.authorName && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>
                  {story.authorName}
                  {story.authorRole && (
                    <span className="text-gray-400"> • {story.authorRole}</span>
                  )}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {format(new Date(story.createdAt), "MMMM d, yyyy")}
                {story.publishedAt && story.publishedAt !== story.createdAt && (
                  <span className="text-gray-400">
                    {" "}
                    • Published{" "}
                    {formatDistance(new Date(story.publishedAt), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                )}
              </span>
            </div>

            {story.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{story.readTime} min read</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{story.views || 0} views</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {story.coverImage && (
          <div className="mb-8">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <Image
                src={story.coverImage}
                alt={story.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Story Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <div className="text-gray-700 leading-relaxed">
            {story.content
              .split("\n")
              .map((paragraph: string, index: number) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>

        {/* Additional Images */}
        {story.images && story.images.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">More from this story</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {story.images.map((imageUrl: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-video rounded-lg overflow-hidden bg-gray-100"
                >
                  <Image
                    src={imageUrl}
                    alt={`${story.title} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Additional Content */}
        {story.content2 && (
          <div className="prose prose-lg max-w-none mb-8">
            <Separator className="my-8" />
            <div className="text-gray-700 leading-relaxed">
              {story.content2
                .split("\n")
                .map((paragraph: string, index: number) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button variant="outline" className="gap-2">
            <Heart className="w-4 h-4" />
            Like this story
          </Button>
          <Button variant="outline" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>

        {/* Footer */}
        <footer className="border-t pt-8">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Inspired by this story? Learn more about our work and how you can
              get involved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/About">
                <Button variant="outline">Learn About Our Mission</Button>
              </Link>
              <Link href="/Contact">
                <Button className="bg-green-600 hover:bg-green-700">
                  Get Involved
                </Button>
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}

export default async function StoryPage({ params }: StoryPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<StoryLoading />}>
      <StoryContent id={id} />
    </Suspense>
  );
}
