import { z } from "zod";

// Define Zod schema for story form validation based on Prisma Story model
export const StoryFormSchema = z.object({
  // Basic Information (Required fields from Story model)
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  excerpt: z
    .string()
    .min(10, "Excerpt must be at least 10 characters")
    .max(500, "Excerpt must be less than 500 characters")
    .trim(),
  content: z
    .string()
    .min(50, "Content must be at least 50 characters")
    .max(10000, "Content must be less than 10,000 characters")
    .trim(),
  content2: z
    .string()
    .refine(
      (val) => !val || val.length >= 50,
      "Content 2 must be at least 50 characters if provided"
    )
    .refine(
      (val) => !val || val.length <= 10000,
      "Content 2 must be less than 10,000 characters"
    )
    .transform((val) => val?.trim()),

  // Media files (will be processed on backend)
  coverImage: z.any().optional(), // File or existing URL
  images: z
    .array(z.any())
    .max(5, "Maximum 5 additional images allowed")
    .optional()
    .default([]), // Files or existing URLs

  // Categorization (matches StoryCategory enum)
  category: z.enum(
    [
      "EDUCATION",
      "HEALTH",
      "COMMUNITY",
      "VOLUNTEER",
      "SUCCESS",
      "IMPACT",
      "YOUTH",
      "OTHER",
    ],
    {
      message: "Please select a valid category",
    }
  ),

  // Tags array (matches String[] in Prisma)
  tags: z
    .array(z.string().min(1).max(50).trim())
    .max(10, "Maximum 10 tags allowed")
    .optional()
    .default([]),

  // Author Information (optional fields in Story model)
  authorName: z
    .string()
    .min(1, "Author name is required")
    .max(100, "Author name must be less than 100 characters")
    .trim(),
  authorRole: z
    .string()
    .max(100, "Author role must be less than 100 characters")
    .trim()
    .optional(),

  // Publication settings (matches StoryStatus enum and Boolean)
  status: z
    .enum(["DRAFT", "PUBLISHED", "ARCHIVED"], {
      message: "Please select a valid status",
    })
    .default("DRAFT"),
  featured: z.boolean().default(false),
  metaTitle: z
    .string()
    .max(60, "Meta title should be less than 60 characters for SEO")
    .trim()
    .optional(),
  metaDescription: z
    .string()
    .max(160, "Meta description should be less than 160 characters for SEO")
    .trim()
    .optional(),
  readTime: z
    .number()
    .int()
    .min(1, "Read time must be at least 1 minute")
    .max(120, "Read time must be less than 120 minutes")
    .optional(),
});

export type StoryFormData = z.infer<typeof StoryFormSchema>;
