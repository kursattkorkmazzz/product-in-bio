"use server";
import { SocialMediaType } from "@/app/dashboard/link-editor/types/social-media";

export default async function updateSocialMediaLink(
  userId: string,
  linkId: string,
  new_social_media: Partial<SocialMediaType>
) {}
