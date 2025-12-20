import { type Goal, type InsertGoal, type Pledge, type InsertPledge, type Category, type InsertCategory, goals, pledges, categories } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getGoals(): Promise<Goal[]>;
  getGoalsByCategory(categoryId: number): Promise<Goal[]>;
  getGoal(id: number): Promise<Goal | undefined>;
  updateGoalImpact(goalId: number, impactMetric: string, impactValue: string, impactDescription: string): Promise<Goal | undefined>;
  createPledge(pledge: InsertPledge): Promise<Pledge>;
  getPledge(id: number): Promise<Pledge | undefined>;
  seedCategories(initialCategories: InsertCategory[]): Promise<void>;
  seedGoals(initialGoals: InsertGoal[]): Promise<void>;
}

export class MemStorage implements IStorage {
  private categories: Category[] = [];
  private goals: Goal[] = [];
  private pledges: Pledge[] = [];
  private currentCategoryId = 1;
  private currentGoalId = 1;
  private currentPledgeId = 1;

  async getCategories(): Promise<Category[]> {
    return this.categories.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.find((c) => c.id === id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return this.categories.find((c) => c.slug === slug);
  }

  async getGoals(): Promise<Goal[]> {
    return this.goals.sort((a, b) => a.goalId - b.goalId);
  }

  async getGoalsByCategory(categoryId: number): Promise<Goal[]> {
    return this.goals.filter((g) => g.categoryId === categoryId).sort((a, b) => a.goalId - b.goalId);
  }

  async getGoal(id: number): Promise<Goal | undefined> {
    return this.goals.find((g) => g.goalId === id);
  }

  async updateGoalImpact(goalId: number, impactMetric: string, impactValue: string, impactDescription: string): Promise<Goal | undefined> {
    const index = this.goals.findIndex((g) => g.goalId === goalId);
    if (index === -1) return undefined;
    this.goals[index] = { ...this.goals[index], impactMetric, impactValue, impactDescription };
    return this.goals[index];
  }

  async createPledge(insertPledge: InsertPledge): Promise<Pledge> {
    const pledge: Pledge = {
      ...insertPledge,
      id: this.currentPledgeId++,
      createdAt: new Date(),
      story: insertPledge.story || null,
      photoUrl: null,
    };
    this.pledges.push(pledge);
    return pledge;
  }

  async getPledge(id: number): Promise<Pledge | undefined> {
    return this.pledges.find((p) => p.id === id);
  }

  async seedCategories(initialCategories: InsertCategory[]): Promise<void> {
    if (this.categories.length === 0) {
      this.categories = initialCategories.map((c) => ({
        ...c,
        id: this.currentCategoryId++,
        order: c.order ?? null
      }));
    }
  }

  async seedGoals(initialGoals: InsertGoal[]): Promise<void> {
    if (this.goals.length === 0) {
      this.goals = initialGoals.map((g) => ({
        ...g,
        id: this.currentGoalId++,
        featured: g.featured ?? null,
        impactMetric: g.impactMetric ?? null,
        impactValue: g.impactValue ?? null,
        impactDescription: g.impactDescription ?? null,
        categoryId: g.categoryId ?? null,
      }));
    }
  }
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

  async updateGoalImpact(goalId: number, impactMetric: string, impactValue: string, impactDescription: string): Promise<Goal | undefined> {
    const [goal] = await db
      .update(goals)
      .set({ impactMetric, impactValue, impactDescription })
      .where(eq(goals.goalId, goalId))
      .returning();
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

export const storage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();


