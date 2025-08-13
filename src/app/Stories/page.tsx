import { Topbar } from "@/components/custom/topbar";
import { Metadata } from "next";
import { Suspense } from "react";
import StoriesLoading from "./storySkeleton";
import { StoriesContent } from "./storyContent";

export const metadata: Metadata = {
  title: "Stories | MAT",
  description:
    "Read inspiring stories from our community and the positive impact we're making together.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <>
      <Topbar showDuration={false} />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community Stories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These are the stories that inspire us every day.
          </p>
        </div>

        {/* Suspense boundary for dynamic content */}
        <Suspense fallback={<StoriesLoading />}>
          <StoriesContent />
        </Suspense>
      </div>
    </>
  );
}
