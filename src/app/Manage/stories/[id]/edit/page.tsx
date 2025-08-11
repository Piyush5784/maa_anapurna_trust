import { notFound } from "next/navigation";
import { ActionResult, getStoryById } from "@/lib/actions/story";
import EditStoryClient from "./EditStoryClient";
import { Story } from "@/generated/prisma";

interface EditStoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { id } = await params;
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
}
