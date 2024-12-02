import { pgTable, uuid, text, varchar } from 'drizzle-orm/pg-core';

// Define the Story table
export const stories = pgTable("stories", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
});