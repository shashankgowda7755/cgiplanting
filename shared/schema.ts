import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  order: integer("order").default(0),
});

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  color: text("color").notNull(),
  goalId: integer("goal_id").notNull().unique(),
  featured: boolean("featured").default(false),
  impactMetric: text("impact_metric"),
  impactValue: text("impact_value"),
  impactDescription: text("impact_description"),
  categoryId: integer("category_id"),
});

export const pledges = pgTable("pledges", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  goalId: integer("goal_id").notNull(),
  story: text("story"),
  city: text("city").notNull(),
  country: text("country").notNull(),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const insertGoalSchema = createInsertSchema(goals).omit({ id: true });
export type InsertGoal = z.infer<typeof insertGoalSchema>;
export type Goal = typeof goals.$inferSelect;

export const insertPledgeSchema = createInsertSchema(pledges).pick({
  fullName: true,
  email: true,
  goalId: true,
  story: true,
  city: true,
  country: true,
});

export type InsertPledge = z.infer<typeof insertPledgeSchema>;
export type Pledge = typeof pledges.$inferSelect;
