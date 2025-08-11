"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StoryForm from "@/components/custom/StoryForm";
import { createStory } from "@/lib/actions/story";
import { type StoryFormData } from "@/form-schemas/story-form";

function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: StoryFormData) => {
    setIsLoading(true);

    try {
      // Create FormData to handle files
      const formData = new FormData();
      
      // Add text fields
      formData.append("title", data.title);
      formData.append("excerpt", data.excerpt);
      formData.append("content", data.content);
      formData.append("content2", data.content2);
      formData.append("category", data.category);
      formData.append("authorName", data.authorName);
      formData.append("status", data.status);
      formData.append("featured", data.featured.toString());
      
      // Add optional fields
      if (data.authorRole) formData.append("authorRole", data.authorRole);
      if (data.metaTitle) formData.append("metaTitle", data.metaTitle);
      if (data.metaDescription) formData.append("metaDescription", data.metaDescription);
      if (data.readTime) formData.append("readTime", data.readTime.toString());
      
      // Add tags as JSON string
      formData.append("tags", JSON.stringify(data.tags || []));
      
      // Add cover image if present
      if (data.coverImage instanceof File) {
        formData.append("coverImage", data.coverImage);
      }
      
      // Add additional images if present
      if (data.images && Array.isArray(data.images)) {
        data.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append(`image_${index}`, image);
          }
        });
      }

      const result = await createStory(formData);

      if (result.success) {
        toast.success(result.message);
        router.push("/Manage/stories");
      } else {
        toast.error(result.message);
        // Handle field errors if any
        if (result.errors) {
          console.error("Form errors:", result.errors);
        }
      }
    } catch (error) {
      console.error("Error creating story:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Create New Story</h1>
        <p className="text-muted-foreground">
          Share your story and inspire others in your community.
        </p>
      </div>

      <StoryForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}

export default Page;
