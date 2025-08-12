"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoryFormSchema, type StoryFormData } from "@/form-schemas/story-form";
import { X } from "lucide-react";
import { toast } from "sonner";

interface StoryFormProps {
  onSubmit: (data: StoryFormData) => void;
  initialData?: Partial<StoryFormData>;
  isLoading?: boolean;
}

export default function StoryForm({
  onSubmit,
  initialData,
  isLoading = false,
}: StoryFormProps) {
  const [tagInput, setTagInput] = useState("");
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<
    string[]
  >([]);

  const form = useForm<StoryFormData>({
    resolver: zodResolver(StoryFormSchema) as any,
    defaultValues: {
      title: initialData?.title,
      excerpt: initialData?.excerpt,
      content: initialData?.content,
      content2: initialData?.content2,
      category: initialData?.category ?? "COMMUNITY",
      coverImage: initialData?.coverImage,
      images: initialData?.images ?? [],
      tags: initialData?.tags,
      authorName: initialData?.authorName,
      authorRole: initialData?.authorRole,
      status: initialData?.status ?? "DRAFT",
      featured: initialData?.featured ?? false,
      metaTitle: initialData?.metaTitle,
      metaDescription: initialData?.metaDescription,
      readTime: initialData?.readTime ?? 5,
    },
  });

  // Initialize image previews for existing images
  useEffect(() => {
    if (initialData?.coverImage && typeof initialData.coverImage === "string") {
      setCoverImagePreview(initialData.coverImage);
    }

    if (initialData?.images && Array.isArray(initialData.images)) {
      const existingImageUrls = initialData.images.filter(
        (img): img is string => typeof img === "string"
      );
      setAdditionalImagePreviews(existingImageUrls);
    }
  }, [initialData]);

  const addTag = () => {
    if (tagInput.trim() && tagInput.length <= 50) {
      const currentTags = form.getValues("tags") || [];
      if (currentTags.length < 10 && !currentTags.includes(tagInput.trim())) {
        form.setValue("tags", [...currentTags, tagInput.trim()]);
        setTagInput("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const categoryOptions = [
    { value: "EDUCATION", label: "Education" },
    { value: "HEALTH", label: "Health" },
    { value: "COMMUNITY", label: "Community" },
    { value: "VOLUNTEER", label: "Volunteer" },
    { value: "SUCCESS", label: "Success" },
    { value: "IMPACT", label: "Impact" },
    { value: "YOUTH", label: "Youth" },
    { value: "OTHER", label: "Other" },
  ];

  const statusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "PUBLISHED", label: "Published" },
    { value: "ARCHIVED", label: "Archived" },
  ];

  // File validation
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File "${file.name}" is too large. Maximum size is 5MB.`);
      return false;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast.error(
        `File "${file.name}" is not a supported image format. Please use JPEG, PNG, or WebP.`
      );
      return false;
    }

    return true;
  };

  // Image upload handlers
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      form.setValue("coverImage", file);
      const reader = new FileReader();
      reader.onload = () => setCoverImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    // Reset the input
    e.target.value = "";
  };

  const handleAdditionalImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentImages = form.getValues("images") || [];

      // Check if adding these files would exceed the limit
      if (currentImages.length + files.length > 5) {
        toast.error(
          `You can only upload a maximum of 5 additional images. You currently have ${currentImages.length}.`
        );
        e.target.value = "";
        return;
      }

      // Validate all files
      const validFiles = files.filter(validateFile);

      if (validFiles.length > 0) {
        const newImages = [...currentImages, ...validFiles];
        form.setValue("images", newImages);

        // Create previews
        const newPreviews: string[] = [];
        validFiles.forEach((file) => {
          const reader = new FileReader();
          reader.onload = () => {
            newPreviews.push(reader.result as string);
            if (newPreviews.length === validFiles.length) {
              setAdditionalImagePreviews((prev) => [...prev, ...newPreviews]);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    }
    // Reset the input
    e.target.value = "";
  };

  const removeCoverImage = () => {
    form.setValue("coverImage", undefined);
    setCoverImagePreview(null);
  };

  const removeAdditionalImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("images", newImages);

    const newPreviews = additionalImagePreviews.filter((_, i) => i !== index);
    setAdditionalImagePreviews(newPreviews);
  };

  const handleFormSubmit = async (data: StoryFormData) => {
    // Call the original onSubmit - backend will handle image upload
    await onSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6"
      >
        {/* Basic Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter story title"
                      {...field}
                      maxLength={200}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of the story"
                      className="resize-none"
                      rows={3}
                      {...field}
                      maxLength={500}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Content Section */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Content *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write the main content of your story..."
                      className="resize-none min-h-[200px]"
                      {...field}
                      maxLength={10000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Content *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional content, conclusion, or call-to-action..."
                      className="resize-none min-h-[200px]"
                      {...field}
                      maxLength={10000}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Media Section */}
        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Cover Image */}
            <div className="space-y-2">
              <FormLabel>Cover Image</FormLabel>
              <p className="text-sm text-muted-foreground">
                Upload a cover image for your story (max 5MB, JPEG/PNG/WebP)
              </p>
              <Input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleCoverImageChange}
                className="cursor-pointer"
              />
              {coverImagePreview && (
                <div className="space-y-2">
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-32 h-24 object-cover rounded border"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeCoverImage}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove Cover Image
                  </Button>
                </div>
              )}
            </div>

            {/* Additional Images */}
            <div className="space-y-2">
              <FormLabel>Additional Images</FormLabel>
              <p className="text-sm text-muted-foreground">
                Upload up to 5 additional images (max 5MB each, JPEG/PNG/WebP)
              </p>
              <Input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                multiple
                onChange={handleAdditionalImagesChange}
                className="cursor-pointer"
                disabled={(form.watch("images")?.length || 0) >= 5}
              />
              {additionalImagePreviews.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Images: {additionalImagePreviews.length}/5
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {additionalImagePreviews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview}
                          alt={`Story image ${index + 1}`}
                          className="w-full h-20 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                          onClick={() => removeAdditionalImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tags Section */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add a tag (max 50 characters)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                maxLength={50}
              />
              <Button
                type="button"
                variant="outline"
                onClick={addTag}
                disabled={
                  !tagInput.trim() ||
                  (form.getValues("tags")?.length || 0) >= 10
                }
              >
                Add Tag
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.watch("tags")?.map((tag, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)}
                  />
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {form.getValues("tags")?.length || 0}/10 tags used
            </p>
          </CardContent>
        </Card>

        {/* Author Information Section */}
        <Card>
          <CardHeader>
            <CardTitle>Author Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter author name"
                      {...field}
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="authorRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Volunteer, Staff Member, Director"
                      {...field}
                      maxLength={100}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Publication Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Publication Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured Story</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Mark this story as featured to highlight it on the
                      homepage
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Read Time (minutes)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g., 5"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
                      min={1}
                      max={120}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* SEO Settings Section */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SEO title for search engines"
                      {...field}
                      maxLength={60}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    {field.value?.length || 0}/60 characters
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="SEO description for search engines"
                      className="resize-none"
                      rows={3}
                      {...field}
                      maxLength={160}
                    />
                  </FormControl>
                  <p className="text-sm text-muted-foreground">
                    {field.value?.length || 0}/160 characters
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isLoading}
          >
            Reset
          </Button>
          <Button className="cursor-pointer" type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Story"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
