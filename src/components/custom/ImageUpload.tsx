"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  X,
  Image as ImageIcon,
  FileImage,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
  existingImages?: string[];
  className?: string;
  accept?: Record<string, string[]>;
}

export function ImageUpload({
  onImagesChange,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024, // 5MB
  existingImages = [],
  className,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"],
  },
}: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setErrors([]);

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const newErrors: string[] = [];
        rejectedFiles.forEach(({ file, errors }) => {
          errors.forEach((error: any) => {
            if (error.code === "file-too-large") {
              newErrors.push(
                `${file.name} is too large (max ${maxSize / (1024 * 1024)}MB)`
              );
            } else if (error.code === "file-invalid-type") {
              newErrors.push(`${file.name} is not a valid image file`);
            } else if (error.code === "too-many-files") {
              newErrors.push(
                `Too many files. Maximum ${maxFiles} files allowed`
              );
            }
          });
        });
        setErrors(newErrors);
      }

      // Handle accepted files
      if (acceptedFiles.length > 0) {
        const totalFiles =
          files.length + acceptedFiles.length + existingImages.length;

        if (totalFiles > maxFiles) {
          setErrors([`Cannot upload more than ${maxFiles} images total`]);
          return;
        }

        const newFiles = [...files, ...acceptedFiles];
        setFiles(newFiles);
        onImagesChange(newFiles);
      }
    },
    [files, maxFiles, maxSize, existingImages.length, onImagesChange]
  );

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onImagesChange(newFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles: maxFiles - existingImages.length,
    maxSize,
    multiple: maxFiles > 1,
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={cn(
              "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50"
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center space-y-2">
              <div className="p-3 bg-primary/10 rounded-full">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              {isDragActive ? (
                <p className="text-primary font-medium">
                  Drop the images here...
                </p>
              ) : (
                <>
                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG, WEBP up to {maxSize / (1024 * 1024)}MB
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum {maxFiles} images
                  </p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Messages */}
      {errors.length > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                {errors.map((error, index) => (
                  <p key={index} className="text-sm text-red-800">
                    {error}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">Current Images</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {existingImages.map((url, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={url}
                    alt={`Existing image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <Badge variant="secondary" className="absolute top-2 left-2">
                    Current
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Files Preview */}
      {files.length > 0 && (
        <div>
          <h4 className="font-medium mb-3">New Images to Upload</h4>
          <div className="space-y-3">
            {files.map((file, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {file.type.startsWith("image/") ? (
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-primary" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <FileImage className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      className="flex-shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Image Preview */}
                  {file.type.startsWith("image/") && (
                    <div className="mt-3">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Upload Summary */}
      <div className="text-sm text-muted-foreground">
        {existingImages.length + files.length} of {maxFiles} images selected
      </div>
    </div>
  );
}
