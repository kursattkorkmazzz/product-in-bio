import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updatedAt").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});
