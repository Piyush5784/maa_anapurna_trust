"use server";

import { prisma } from "@/db/prisma";
import { StoryFormSchema, type StoryFormData } from "@/form-schemas/story-form";
import { uploadImage, deleteImage, getPublicIdFromUrl } from "@/lib/cloudinary";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createLog } from "./logs";

export interface ActionResult<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

// Create story with form data (simplified version)
export async function createStoryFromForm(
  data: StoryFormData
): Promise<ActionResult> {
  try {
    const result = StoryFormSchema.safeParse(data);

    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = [];
        }
        errors[fieldName].push(issue.message);
      });

      return {
        success: false,
        message: "Please check the form for errors.",
        errors,
      };
    }

    const validatedData = result.data;

    // Generate unique slug
    let baseSlug = slugify(validatedData.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and make it unique
    while (await prisma.story.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Create the story
    const story = await prisma.story.create({
      data: {
        ...validatedData,
        slug,
        publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
        // Use image data from form or set defaults
        coverImage: validatedData.coverImage || null,
        images: validatedData.images || [],
        views: 0,
      },
    });

    revalidatePath("/Stories");
    revalidatePath("/Manage/stories");

    return {
      success: true,
      message: "Story created successfully!",
      data: story,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Story creation from form data failed with exception",
      source: "story",
      metadata: JSON.stringify({
        title: data.title?.substring(0, 100),
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "createStoryFromForm",
      }),
    });
    console.error("Story creation error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// Create a new story
export async function createStory(formData: FormData): Promise<ActionResult> {
  try {
    // Extract cover image file
    const coverImageFile = formData.get("coverImage") as File | null;

    // Extract additional image files
    const additionalImages: File[] = [];
    let index = 0;
    while (formData.has(`image_${index}`)) {
      const imageFile = formData.get(`image_${index}`) as File;
      if (imageFile) {
        additionalImages.push(imageFile);
      }
      index++;
    }

    // Extract and validate form data
    const rawData = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      content2: formData.get("content2"),
      category: formData.get("category"),
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
      authorName: formData.get("authorName"),
      authorRole: formData.get("authorRole") || undefined,
      status: formData.get("status") || "DRAFT",
      featured: formData.get("featured") === "true",
      metaTitle: formData.get("metaTitle") || undefined,
      metaDescription: formData.get("metaDescription") || undefined,
      readTime: formData.get("readTime")
        ? parseInt(formData.get("readTime") as string)
        : undefined,
    };

    const result = StoryFormSchema.safeParse(rawData);

    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = [];
        }
        errors[fieldName].push(issue.message);
      });
      console.log(errors);
      return {
        success: false,
        message: "Please check the form for errors.",
        errors,
      };
    }

    const validatedData = result.data;

    // Generate unique slug
    let baseSlug = slugify(validatedData.title, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    // Check if slug already exists and make it unique
    while (await prisma.story.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Upload cover image if provided
    let coverImageUrl: string | undefined;
    if (coverImageFile && coverImageFile.size > 0) {
      coverImageUrl = await uploadImage(coverImageFile);
    }

    // Upload additional images if provided
    let imageUrls: string[] = [];
    if (additionalImages && additionalImages.length > 0) {
      const uploadPromises = additionalImages.map((file) => uploadImage(file));
      imageUrls = await Promise.all(uploadPromises);
    }

    // Create the story
    const story = await prisma.story.create({
      data: {
        ...validatedData,
        slug,
        coverImage: coverImageUrl || null,
        images: imageUrls,
        publishedAt: validatedData.status === "PUBLISHED" ? new Date() : null,
        views: 0,
      },
    });
    revalidatePath("/Stories");
    revalidatePath("/Manage/stories");

    return {
      success: true,
      message: "Story created successfully!",
      data: story,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Story creation with file upload failed with exception",
      source: "story",
      metadata: JSON.stringify({
        title: formData.get("title")?.toString().substring(0, 100),
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "createStory",
      }),
    });
    console.error("Story creation error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// Update an existing story
export async function updateStory(
  storyId: string,
  formData: FormData,
  coverImageFile?: File,
  additionalImages?: File[]
): Promise<ActionResult> {
  try {
    // Check if story exists
    const existingStory = await prisma.story.findUnique({
      where: { id: storyId },
    });

    if (!existingStory) {
      return {
        success: false,
        message: "Story not found.",
      };
    }

    // Extract and validate form data
    const rawData = {
      title: formData.get("title"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      content2: formData.get("content2"),
      category: formData.get("category"),
      tags: JSON.parse((formData.get("tags") as string) || "[]"),
      authorName: formData.get("authorName"),
      authorRole: formData.get("authorRole") || undefined,
      status: formData.get("status") || "DRAFT",
      priority: formData.get("priority") || "MEDIUM",
      featured: formData.get("featured") === "true",
      metaTitle: formData.get("metaTitle") || undefined,
      metaDescription: formData.get("metaDescription") || undefined,
      readTime: formData.get("readTime")
        ? parseInt(formData.get("readTime") as string)
        : undefined,
    };

    const result = StoryFormSchema.safeParse(rawData);

    if (!result.success) {
      const errors: Record<string, string[]> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path.join(".");
        if (!errors[fieldName]) {
          errors[fieldName] = [];
        }
        errors[fieldName].push(issue.message);
      });
      console.log(errors);
      return {
        success: false,
        message: "Please check the form for errors.",
        errors,
      };
    }

    const validatedData = result.data;

    // Generate new slug if title changed
    let slug = existingStory.slug;
    if (validatedData.title !== existingStory.title) {
      let baseSlug = slugify(validatedData.title, {
        lower: true,
        strict: true,
      });
      slug = baseSlug;
      let counter = 1;

      while (
        await prisma.story.findFirst({
          where: {
            slug,
            id: { not: storyId },
          },
        })
      ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
      }
    }

    // Handle cover image update
    let coverImageUrl = existingStory.coverImage;
    if (coverImageFile) {
      // Delete old cover image if it exists
      if (existingStory.coverImage) {
        const publicId = getPublicIdFromUrl(existingStory.coverImage);
        await deleteImage(publicId);
      }
      // Upload new cover image
      coverImageUrl = await uploadImage(coverImageFile);
    }

    // Handle additional images update
    let imageUrls = existingStory.images;
    if (additionalImages && additionalImages.length > 0) {
      // Delete old additional images
      for (const imageUrl of existingStory.images) {
        const publicId = getPublicIdFromUrl(imageUrl);
        await deleteImage(publicId);
      }
      // Upload new additional images
      const uploadPromises = additionalImages.map((file) => uploadImage(file));
      imageUrls = await Promise.all(uploadPromises);
    }

    // Update the story
    const updatedStory = await prisma.story.update({
      where: { id: storyId },
      data: {
        ...validatedData,
        slug,
        coverImage: coverImageUrl,
        images: imageUrls,
        publishedAt:
          validatedData.status === "PUBLISHED" &&
          existingStory.status !== "PUBLISHED"
            ? new Date()
            : existingStory.publishedAt,
      },
    });

    revalidatePath("/Stories");
    revalidatePath(`/Stories/${slug}`);
    revalidatePath("/Manage/stories");

    return {
      success: true,
      message: "Story updated successfully!",
      data: updatedStory,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Story update failed with exception",
      source: "story",
      metadata: JSON.stringify({
        storyId,
        title: formData.get("title")?.toString().substring(0, 100),
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "updateStory",
      }),
    });
    console.error("Story update error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// Delete a story
export async function deleteStory(storyId: string): Promise<ActionResult> {
  try {
    const story = await prisma.story.findUnique({
      where: { id: storyId },
    });

    if (!story) {
      return {
        success: false,
        message: "Story not found.",
      };
    }

    // Delete images from Cloudinary
    if (story.coverImage) {
      const publicId = getPublicIdFromUrl(story.coverImage);
      await deleteImage(publicId);
    }

    for (const imageUrl of story.images) {
      const publicId = getPublicIdFromUrl(imageUrl);
      await deleteImage(publicId);
    }

    // Delete story from database
    await prisma.story.delete({
      where: { id: storyId },
    });

    revalidatePath("/Stories");
    revalidatePath("/Manage/stories");

    return {
      success: true,
      message: "Story deleted successfully!",
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Story deletion failed with exception",
      source: "story",
      metadata: JSON.stringify({
        storyId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "deleteStory",
      }),
    });
    console.error("Story deletion error:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

// Get all stories
export async function getAllStories(
  status?: "DRAFT" | "PUBLISHED" | "ARCHIVED",
  limit?: number
): Promise<ActionResult> {
  try {
    const where = status ? { status } : {};
    const stories = await prisma.story.findMany({
      where,
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      take: limit,
    });

    return {
      success: true,
      message: "Stories fetched successfully",
      data: stories,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to fetch all stories",
      source: "story",
      metadata: JSON.stringify({
        status,
        limit,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "getAllStories",
      }),
    });
    console.error("Error fetching stories:", error);
    return {
      success: false,
      message: "Failed to fetch stories",
    };
  }
}

// Get story by slug
export async function getStoryBySlug(slug: string): Promise<ActionResult> {
  try {
    const story = await prisma.story.findUnique({
      where: { slug },
    });

    if (!story) {
      return {
        success: false,
        message: "Story not found",
      };
    }

    // Increment view count
    await prisma.story.update({
      where: { id: story.id },
      data: { views: { increment: 1 } },
    });

    return {
      success: true,
      message: "Story fetched successfully",
      data: story,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to fetch story by slug",
      source: "story",
      metadata: JSON.stringify({
        slug,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "getStoryBySlug",
      }),
    });
    console.error("Error fetching story:", error);
    return {
      success: false,
      message: "Failed to fetch story",
    };
  }
}

// Get story by ID
export async function getStoryById(id: string): Promise<ActionResult> {
  try {
    const story = await prisma.story.findUnique({
      where: { id },
    });

    if (!story) {
      return {
        success: false,
        message: "Story not found",
      };
    }

    // Increment view count
    await prisma.story.update({
      where: { id: story.id },
      data: { views: { increment: 1 } },
    });

    return {
      success: true,
      message: "Story fetched successfully",
      data: story,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Failed to fetch story by ID",
      source: "story",
      metadata: JSON.stringify({
        storyId: id,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "getStoryById",
      }),
    });
    console.error("Error fetching story:", error);
    return {
      success: false,
      message: "Failed to fetch story",
    };
  }
}

// Publish/unpublish story
export async function toggleStoryStatus(
  storyId: string
): Promise<ActionResult> {
  try {
    const story = await prisma.story.findUnique({
      where: { id: storyId },
    });

    if (!story) {
      return {
        success: false,
        message: "Story not found",
      };
    }

    const newStatus = story.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";

    const updatedStory = await prisma.story.update({
      where: { id: storyId },
      data: {
        status: newStatus,
        publishedAt: newStatus === "PUBLISHED" ? new Date() : null,
      },
    });
    revalidatePath("/Stories");
    revalidatePath(`/Stories/${story.slug}`);
    revalidatePath("/Manage/stories");

    return {
      success: true,
      message: `Story ${newStatus.toLowerCase()} successfully!`,
      data: updatedStory,
    };
  } catch (error) {
    await createLog({
      level: "ERROR",
      message: "Story status toggle failed with exception",
      source: "story",
      metadata: JSON.stringify({
        storyId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        action: "toggleStoryStatus",
      }),
    });
    console.error("Error toggling story status:", error);
    return {
      success: false,
      message: "Failed to update story status",
    };
  }
}
