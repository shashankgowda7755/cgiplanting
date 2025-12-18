import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPledgeSchema } from "@shared/schema";
import { z } from "zod";

const SDGs = [
  { goalId: 1, title: "No Poverty", description: "End poverty in all its forms everywhere.", color: "#E5243B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg" },
  { goalId: 2, title: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.", color: "#DDA63A", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg" },
  { goalId: 3, title: "Good Health and Well-being", description: "Ensure healthy lives and promote well-being for all at all ages.", color: "#4C9F38", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg" },
  { goalId: 4, title: "Quality Education", description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.", color: "#C5192D", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg" },
  { goalId: 5, title: "Gender Equality", description: "Achieve gender equality and empower all women and girls.", color: "#FF3A21", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg" },
  { goalId: 6, title: "Clean Water and Sanitation", description: "Ensure availability and sustainable management of water and sanitation for all.", color: "#26BDE2", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg" },
  { goalId: 7, title: "Affordable and Clean Energy", description: "Ensure access to affordable, reliable, sustainable and modern energy for all.", color: "#FCC30B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg" },
  { goalId: 8, title: "Decent Work and Economic Growth", description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.", color: "#A21942", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg" },
  { goalId: 9, title: "Industry, Innovation and Infrastructure", description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.", color: "#FD6925", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg" },
  { goalId: 10, title: "Reduced Inequalities", description: "Reduce inequality within and among countries.", color: "#DD1367", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg" },
  { goalId: 11, title: "Sustainable Cities and Communities", description: "Make cities and human settlements inclusive, safe, resilient and sustainable.", color: "#FD9D24", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg" },
  { goalId: 12, title: "Responsible Consumption and Production", description: "Ensure sustainable consumption and production patterns.", color: "#BF8B2E", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg" },
  { goalId: 13, title: "Climate Action", description: "Take urgent action to combat climate change and its impacts.", color: "#3F7E44", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg" },
  { goalId: 14, title: "Life Below Water", description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.", color: "#0A97D9", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg" },
  { goalId: 15, title: "Life on Land", description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss.", color: "#56C02B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg" },
  { goalId: 16, title: "Peace, Justice and Strong Institutions", description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.", color: "#00689D", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg" },
  { goalId: 17, title: "Partnerships for the Goals", description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development.", color: "#19486A", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg" },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed goals on startup
  try {
    await storage.seedGoals(SDGs);
    console.log("Goals seeded successfully");
  } catch (error) {
    console.error("Error seeding goals:", error);
  }

  app.get("/api/goals", async (_req, res) => {
    try {
      const goals = await storage.getGoals();
      res.json(goals);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch goals" });
    }
  });

  app.get("/api/goals/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const goal = await storage.getGoal(id);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch goal" });
    }
  });

  app.post("/api/pledges", async (req, res) => {
    try {
      const pledgeData = insertPledgeSchema.parse(req.body);
      const pledge = await storage.createPledge(pledgeData);
      res.status(201).json(pledge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid pledge data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create pledge" });
    }
  });

  app.get("/api/pledges/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pledge = await storage.getPledge(id);
      if (!pledge) {
        return res.status(404).json({ message: "Pledge not found" });
      }
      res.json(pledge);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pledge" });
    }
  });

  return httpServer;
}
