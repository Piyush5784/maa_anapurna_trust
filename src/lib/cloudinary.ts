import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadImage = async (file: File | string): Promise<string> => {
  try {
    let uploadSource: string;

    if (file instanceof File) {
      // Convert File to base64
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      uploadSource = `data:${file.type};base64,${buffer.toString("base64")}`;
    } else {
      uploadSource = file;
    }

    const result = await cloudinary.uploader.upload(uploadSource, {
      transformation: [
        { width: 800, height: 600, crop: "fill", quality: "auto" },
      ],
    });

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Failed to upload image");
  }
};

export const deleteImage = async (publicId: string): Promise<boolean> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === "ok";
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return false;
  }
};

export const getPublicIdFromUrl = (url: string): string => {
  const matches = url.match(/\/v\d+\/(.+)\./);
  return matches ? matches[1] : "";
};
