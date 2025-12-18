import { type Goal, type InsertGoal, type Pledge, type InsertPledge, goals, pledges } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getGoals(): Promise<Goal[]>;
  getGoal(id: number): Promise<Goal | undefined>;
  createPledge(pledge: InsertPledge): Promise<Pledge>;
  getPledge(id: number): Promise<Pledge | undefined>;
  seedGoals(initialGoals: InsertGoal[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getGoals(): Promise<Goal[]> {
    return await db.select().from(goals).orderBy(goals.goalId);
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

  async seedGoals(initialGoals: InsertGoal[]): Promise<void> {
    const existing = await this.getGoals();
    if (existing.length === 0) {
      await db.insert(goals).values(initialGoals);
    }
  }
}

export const storage = new DatabaseStorage();
