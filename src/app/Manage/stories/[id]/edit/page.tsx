import { notFound } from "next/navigation";
import { ActionResult, getStoryById } from "@/lib/actions/story";
import EditStoryClient from "./EditStoryClient";
import { Story } from "@/generated/prisma";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface EditStoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

// Loading component for the edit page
function EditStoryLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>

        {/* Form Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Excerpt field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-20 w-full" />
            </div>

            {/* Content field */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-32 w-full" />
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Cover Image */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-40 w-full" />
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-20" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Server component to fetch story data
async function EditStoryContent({ id }: { id: string }) {
  try {
    const result: ActionResult<Story> = await getStoryById(id);

    if (!result.success || !result.data) {
      notFound();
    }

    const story = result.data;

    // Transform the story data to match the form format
    const initialData = {
      title: story.title,
      excerpt: story.excerpt,
      content: story.content,
      content2: story.content2 || undefined,
      category: story.category,
      status: story.status,
      featured: story.featured,
      authorName: story.authorName || "",
      authorRole: story.authorRole || "",
      readTime: story.readTime || undefined,
      tags: story.tags || [],
      coverImage: story.coverImage || undefined,
      images: story.images || [],
      metaTitle: story.metaTitle || "",
      metaDescription: story.metaDescription || "",
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Story</h1>
            <p className="text-gray-600 mt-1">
              Update and modify your story content
            </p>
          </div>

          <EditStoryClient storyId={id} initialData={initialData} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading story for edit:', error);
    notFound();
  }
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <Suspense fallback={<EditStoryLoading />}>
      <EditStoryContent id={id} />
    </Suspense>
  );
}
