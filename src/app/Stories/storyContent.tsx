import { Topbar } from "@/components/custom/topbar";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllStories } from "@/lib/actions/story";
import { formatDistance } from "date-fns";
import { Eye, Clock, User, Calendar } from "lucide-react";
import { Suspense } from "react";
import StoriesLoading from "./storySkeleton";

export async function StoriesContent() {
  // Fetch stories from backend
  const result = await getAllStories("PUBLISHED");
  const allStories = result?.success ? result?.data?.reverse() : [];

  // Filter featured and regular stories
  const featuredStories = allStories.filter((story: any) => story.featured);
  const regularStories = allStories.filter((story: any) => !story.featured);

  // Get unique categories from stories
  const uniqueCategories = new Set<string>();
  allStories.forEach((story: any) => {
    if (story.category && typeof story.category === "string") {
      uniqueCategories.add(story.category);
    }
  });
  const categories: string[] = ["All", ...Array.from(uniqueCategories)];

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

  const formatCategoryName = (category: string) => {
    return category.charAt(0) + category.slice(1).toLowerCase();
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Filter Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                idx === 0
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {category === "All" ? category : formatCategoryName(category)}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        {allStories.length > 0 && (
          <div className="mb-16">
            <div className="bg-card rounded-xl overflow-hidden shadow-lg border">
              <div className="md:flex">
                <div className="md:w-1/2">
                  {allStories[0].coverImage ? (
                    <div className="relative h-64 md:h-full">
                      <Image
                        src={allStories[0].coverImage}
                        alt={allStories[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-64 md:h-full bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <svg
                          className="w-16 h-16 mx-auto mb-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-sm">Featured Story</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="md:w-1/2 p-8">
                  <div className="mb-4">
                    <Badge className="bg-yellow-100 text-yellow-800 mr-2">
                      Featured Story
                    </Badge>
                    <Badge className={getCategoryColor(allStories[0].category)}>
                      {formatCategoryName(allStories[0].category)}
                    </Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-4">
                    {allStories[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {allStories[0].excerpt}
                  </p>
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-6 gap-4">
                    {allStories[0].authorName && (
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{allStories[0].authorName}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {formatDistance(
                          new Date(allStories[0].createdAt),
                          new Date(),
                          {
                            addSuffix: true,
                          }
                        )}
                      </span>
                    </div>
                    {allStories[0].readTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{allStories[0].readTime} min read</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{allStories[0].views || 0} views</span>
                    </div>
                  </div>
                  <Link href={`/Stories/${allStories[0].id}`}>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                      Read Full Story
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Stories Message */}
        {allStories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-center text-muted-foreground mb-8">
              <svg
                className="w-16 h-16 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">No Stories Yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              We're working on sharing inspiring stories from our community.
              Check back soon!
            </p>
            <Link href="/Contact">
              <Button>Share Your Story</Button>
            </Link>
          </div>
        )}

        {allStories?.length > 1 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allStories?.slice(1)?.map((story: any) => (
              <article
                key={story.id}
                className="bg-card rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-all duration-200"
              >
                <div className="relative h-48">
                  {story.coverImage ? (
                    <Image
                      src={story.coverImage}
                      alt={story.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full bg-muted flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <svg
                          className="w-12 h-12 mx-auto mb-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="text-xs">Story Image</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="mb-3">
                    <Badge className={getCategoryColor(story.category)}>
                      {formatCategoryName(story.category)}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <span>
                      {formatDistance(new Date(story.createdAt), new Date(), {
                        addSuffix: true,
                      })}
                    </span>
                    <div className="flex items-center gap-3">
                      {story.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {story.readTime}m
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {story.views || 0}
                      </span>
                    </div>
                  </div>
                  <Link href={`/Stories/${story.id}`}>
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary/80 text-sm font-medium p-0 h-auto"
                    >
                      Read More →
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center bg-muted p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Share Your Story</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have you been impacted by our programs? We'd love to hear from you
            and share your story to inspire others in our community.
          </p>
          <div className="space-x-4">
            <Link href="/Contact">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Your Story
              </Button>
            </Link>
            <Link href="/Contact">
              <Button variant="outline">Contact Us</Button>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allStories.reduce(
                (total: number, story: any) => total + (story.views || 0),
                0
              )}
            </div>
            <div className="text-muted-foreground">Total Views</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allStories.length}+
            </div>
            <div className="text-muted-foreground">Published Stories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {categories.length - 1}
            </div>
            <div className="text-muted-foreground">Story Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {allStories.length}
            </div>
            <div className="text-muted-foreground">Featured Stories</div>
          </div>
        </div>
      </div>
    </>
  );
}
