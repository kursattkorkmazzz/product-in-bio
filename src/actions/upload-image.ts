"use server";
import ImageUploader from "@server/managers/ImageManager";
import { auth } from "../lib/better-auth/auth";
import { headers } from "next/headers";

export async function uploadImage(formData: FormData) {
  const userId = formData.get("userId") as string;
  const imageData = formData.get("avatar-image") as File;
  if (!userId) {
    throw new Error("User ID is required for image upload.");
  }

  if (!imageData) {
    throw new Error("Image should be upload");
  }

  await ImageUploader.deleteAvatar(userId);
  const { image_path } = await ImageUploader.uploadAvatar(imageData, userId);

  auth.api.updateUser({
    body: {
      image: image_path,
    },
    headers: await headers(),
  });
}
