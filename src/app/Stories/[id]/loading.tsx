import { Skeleton } from "@/components/ui/skeleton";
import { Topbar } from "@/components/custom/topbar";

export default function StoryLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topbar />

      {/* Navigation Skeleton */}
      <div className="border-b container mx-auto max-w-4xl">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      {/* Story Content Skeleton */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Story Header */}
        <header className="mb-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Skeleton className="h-6 w-24" />
          </div>

          {/* Title */}
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-3/4 mb-6" />

          {/* Story Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-4 h-4 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Excerpt */}
          <div className="text-lg text-muted-foreground mb-8">
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-4/5" />
          </div>
        </header>

        {/* Cover Image */}
        <div className="mb-8">
          <Skeleton className="w-full h-64 md:h-80 lg:h-96 rounded-lg" />
        </div>

        {/* Story Content */}
        <div className="prose prose-lg max-w-none mb-8">
          {/* Content paragraphs */}
          <div className="space-y-4 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="space-y-4 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Quote block */}
          <div className="my-8 p-6 bg-muted rounded-lg border-l-4 border-primary">
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-5 w-4/5" />
          </div>

          <div className="space-y-4 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Additional images placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        {/* Tags Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-5 w-12" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="h-6 w-16" />
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="my-8">
          <Skeleton className="h-px w-full" />
        </div>

        {/* Footer Actions */}
        <footer className="border-t pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-20" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
}
