import { type Goal, type InsertGoal, type Pledge, type InsertPledge, type Category, type InsertCategory, goals, pledges, categories } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getGoals(): Promise<Goal[]>;
  getGoalsByCategory(categoryId: number): Promise<Goal[]>;
  getGoal(id: number): Promise<Goal | undefined>;
  createPledge(pledge: InsertPledge): Promise<Pledge>;
  getPledge(id: number): Promise<Pledge | undefined>;
  seedCategories(initialCategories: InsertCategory[]): Promise<void>;
  seedGoals(initialGoals: InsertGoal[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories).orderBy(categories.order);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async getGoals(): Promise<Goal[]> {
    return await db.select().from(goals).orderBy(goals.goalId);
  }

  async getGoalsByCategory(categoryId: number): Promise<Goal[]> {
    return await db.select().from(goals).where(eq(goals.categoryId, categoryId)).orderBy(goals.goalId);
  }

  async getGoal(id: number): Promise<Goal | undefined> {
    const [goal] = await db.select().from(goals).where(eq(goals.goalId, id));
    return goal;
  }

  async createPledge(insertPledge: InsertPledge): Promise<Pledge> {
    const [pledge] = await db
      .insert(pledges)
      .values(insertPledge)
      .returning();
    return pledge;
  }

  async getPledge(id: number): Promise<Pledge | undefined> {
    const [pledge] = await db.select().from(pledges).where(eq(pledges.id, id));
    return pledge;
  }

  async seedCategories(initialCategories: InsertCategory[]): Promise<void> {
    const existing = await this.getCategories();
    if (existing.length === 0) {
      await db.insert(categories).values(initialCategories);
    }
  }

  async seedGoals(initialGoals: InsertGoal[]): Promise<void> {
    const existing = await this.getGoals();
    if (existing.length === 0) {
      await db.insert(goals).values(initialGoals);
    }
  }
}

export const storage = new DatabaseStorage();
