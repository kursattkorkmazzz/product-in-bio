import fs from "fs/promises";
import path from "path";

export default class ImageUploader {
  static basePath: string = path.join("public", "uploads");
  static async uploadAvatar(image_data: File, user_id: string) {
    if (!user_id) {
      throw Error("User ID is required for image upload.");
    }
    if (!image_data) {
      throw Error("Image data is required for upload.");
    }

    const [_, image_extension] = image_data.name.split(".");

    const uploadPath = path.join(
      this.basePath,
      user_id,
      "avatar-image",
      `avatar.${image_extension}`
    );

    const image_buffer = await image_data.arrayBuffer();
    await fs.writeFile(uploadPath, Buffer.from(image_buffer));

    return {
      image_path: uploadPath.replace("public", ""),
    };
  }

  static async deleteAvatar(user_id: string) {
    const uploadPath = path.join(this.basePath, user_id, "avatar-image");

    try {
      await fs.access(uploadPath);
      const files = await fs.readdir(uploadPath);

      // Remove all files in the directory
      await Promise.all(
        files.map((file) => fs.unlink(path.join(uploadPath, file)))
      );
    } catch {
      await fs.mkdir(uploadPath, { recursive: true });
    }
  }
}
