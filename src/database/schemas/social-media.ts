import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user";

export const socialMedia = pgTable("social_media", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(),
  base_url: text("base_url"),
  value: text("value").notNull(),
});
