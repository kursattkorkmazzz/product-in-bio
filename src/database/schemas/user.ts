import { pgTable, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const languageEnum = pgEnum("language", ["en"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  lang: languageEnum()
    .$default(() => "en")
    .notNull(),
  createdAt: timestamp("createdAt")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});
