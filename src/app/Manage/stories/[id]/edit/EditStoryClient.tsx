"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StoryForm from "@/components/custom/StoryForm";
import { updateStory } from "@/lib/actions/story";
import { type StoryFormData } from "@/form-schemas/story-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface EditStoryClientProps {
  storyId: string;
  initialData: Partial<StoryFormData>;
}

export default function EditStoryClient({
  storyId,
  initialData,
}: EditStoryClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (data: StoryFormData) => {
    setIsLoading(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();

      // Add all form fields to FormData
      formData.append("title", data.title);
      formData.append("excerpt", data.excerpt);
      formData.append("content", data.content);
      if (data.content2) {
        formData.append("content2", data.content2);
      }
      formData.append("category", data.category);
      formData.append("status", data.status);
      formData.append("featured", data.featured.toString());
      formData.append("authorName", data.authorName);
      formData.append("authorRole", data.authorRole || "");
      formData.append("readTime", data.readTime?.toString() || "");
      formData.append("tags", JSON.stringify(data.tags));

      // Extract cover image file (if it's a new file)
      let coverImageFile: File | undefined;
      if (data.coverImage && data.coverImage instanceof File) {
        coverImageFile = data.coverImage;
      }

      // Extract additional image files (if they're new files)
      const additionalImageFiles: File[] = [];
      if (data.images && data.images.length > 0) {
        data.images.forEach((image) => {
          if (image instanceof File) {
            additionalImageFiles.push(image);
          }
        });
      }

      const result = await updateStory(
        storyId,
        formData,
        coverImageFile,
        additionalImageFiles.length > 0 ? additionalImageFiles : undefined
      );

      if (result.success) {
        toast.success("Story updated successfully!");
        router.push("/Manage/stories");
        router.refresh();
      } else {
        toast.error(result.message || "Failed to update story");
      }
    } catch (error) {
      console.error("Error updating story:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center gap-4">
        <Link href="/Manage/stories">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Stories
          </Button>
        </Link>
      </div>

      {/* Form */}
      <StoryForm
        onSubmit={handleFormSubmit}
        initialData={initialData}
        isLoading={isLoading}
      />
    </div>
  );
}
