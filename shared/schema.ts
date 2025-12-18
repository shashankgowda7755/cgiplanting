import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const goals = pgTable("goals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(), // URL to image
  color: text("color").notNull(), // Tailwind classes or hex
  goalId: integer("goal_id").notNull().unique(), // The 1-17 number
  featured: boolean("featured").default(false),
  impactMetric: text("impact_metric"), // e.g., "meals provided", "trees planted"
  impactValue: text("impact_value"), // e.g., "10", "1000"
  impactDescription: text("impact_description"), // e.g., "Each pledge helps provide 10 meals to families in need"
});

export const pledges = pgTable("pledges", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  goalId: integer("goal_id").notNull(), // References goals.goalId
  story: text("story"),
  city: text("city").notNull(),
  country: text("country").notNull(),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGoalSchema = createInsertSchema(goals);
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
