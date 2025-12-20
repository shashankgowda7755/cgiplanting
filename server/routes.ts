import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPledgeSchema } from "../shared/schema";
import { z } from "zod";

const CATEGORIES = [
  { name: "UN Sustainable Development Goals", slug: "un-sdgs", description: "The 17 global goals adopted by all UN Member States", icon: "Globe", color: "#0A97D9", order: 1 },
  { name: "Personal Habits", slug: "personal-habits", description: "Daily lifestyle changes for a sustainable future", icon: "User", color: "#10B981", order: 2 },
  { name: "Corporate & Workplace", slug: "corporate", description: "Business and organizational sustainability pledges", icon: "Building2", color: "#6366F1", order: 3 },
  { name: "Health & Wellbeing", slug: "health", description: "Physical and mental health commitments", icon: "Heart", color: "#EC4899", order: 4 },
  { name: "Environmental Conservation", slug: "conservation", description: "Direct action to protect our planet", icon: "TreePine", color: "#22C55E", order: 5 },
  { name: "Community & Social", slug: "community", description: "Building stronger, more inclusive communities", icon: "Users", color: "#F59E0B", order: 6 },
];

const GOALS = [
  // UN SDGs (Category 1)
  { goalId: 1, categoryId: 1, title: "No Poverty", description: "End poverty in all its forms everywhere.", color: "#E5243B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-01.jpg", featured: false, impactMetric: "families lifted out of poverty", impactValue: "1", impactDescription: "Each pledge helps support economic empowerment programs" },
  { goalId: 2, categoryId: 1, title: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition.", color: "#DDA63A", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-02.jpg", featured: false, impactMetric: "meals provided", impactValue: "50", impactDescription: "Each pledge provides 50 meals to families in need" },
  { goalId: 3, categoryId: 1, title: "Good Health and Well-being", description: "Ensure healthy lives and promote well-being for all.", color: "#4C9F38", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-03.jpg", featured: false, impactMetric: "health screenings provided", impactValue: "10", impactDescription: "Each pledge funds 10 preventive health screenings" },
  { goalId: 4, categoryId: 1, title: "Quality Education", description: "Ensure inclusive and equitable quality education.", color: "#C5192D", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-04.jpg", featured: false, impactMetric: "hours of learning support", impactValue: "20", impactDescription: "Each pledge provides 20 hours of educational support" },
  { goalId: 5, categoryId: 1, title: "Gender Equality", description: "Achieve gender equality and empower all women and girls.", color: "#FF3A21", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-05.jpg", featured: false, impactMetric: "women empowered", impactValue: "5", impactDescription: "Each pledge supports empowerment of 5 women" },
  { goalId: 6, categoryId: 1, title: "Clean Water and Sanitation", description: "Ensure availability of water and sanitation for all.", color: "#26BDE2", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-06.jpg", featured: false, impactMetric: "people with water access", impactValue: "25", impactDescription: "Each pledge provides clean water access to 25 people" },
  { goalId: 7, categoryId: 1, title: "Affordable and Clean Energy", description: "Ensure access to affordable, sustainable energy.", color: "#FCC30B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-07.jpg", featured: false, impactMetric: "homes with clean energy", impactValue: "2", impactDescription: "Each pledge converts 2 homes to clean energy" },
  { goalId: 8, categoryId: 1, title: "Decent Work and Economic Growth", description: "Promote sustainable economic growth and decent work.", color: "#A21942", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-08.jpg", featured: false, impactMetric: "jobs created", impactValue: "1", impactDescription: "Each pledge supports creation of 1 sustainable job" },
  { goalId: 9, categoryId: 1, title: "Industry, Innovation and Infrastructure", description: "Build resilient infrastructure and foster innovation.", color: "#FD6925", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-09.jpg", featured: false, impactMetric: "km of infrastructure", impactValue: "0.5", impactDescription: "Each pledge contributes to sustainable infrastructure" },
  { goalId: 10, categoryId: 1, title: "Reduced Inequalities", description: "Reduce inequality within and among countries.", color: "#DD1367", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-10.jpg", featured: false, impactMetric: "disadvantaged people helped", impactValue: "3", impactDescription: "Each pledge helps 3 people overcome barriers" },
  { goalId: 11, categoryId: 1, title: "Sustainable Cities", description: "Make cities inclusive, safe, and sustainable.", color: "#FD9D24", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-11.jpg", featured: false, impactMetric: "community projects supported", impactValue: "1", impactDescription: "Each pledge supports 1 community project" },
  { goalId: 12, categoryId: 1, title: "Responsible Consumption", description: "Ensure sustainable consumption and production.", color: "#BF8B2E", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-12.jpg", featured: false, impactMetric: "kg of waste diverted", impactValue: "100", impactDescription: "Each pledge diverts 100 kg of waste from landfills" },
  { goalId: 13, categoryId: 1, title: "Climate Action", description: "Take urgent action to combat climate change.", color: "#3F7E44", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-13.jpg", featured: true, impactMetric: "trees planted", impactValue: "10", impactDescription: "Each pledge plants 10 trees to combat climate change" },
  { goalId: 14, categoryId: 1, title: "Life Below Water", description: "Conserve and sustainably use the oceans.", color: "#0A97D9", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-14.jpg", featured: false, impactMetric: "sq meters of ocean protected", impactValue: "500", impactDescription: "Each pledge protects 500 sq meters of marine habitat" },
  { goalId: 15, categoryId: 1, title: "Life on Land", description: "Protect and restore terrestrial ecosystems.", color: "#56C02B", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-15.jpg", featured: false, impactMetric: "hectares restored", impactValue: "0.1", impactDescription: "Each pledge helps restore ecosystems" },
  { goalId: 16, categoryId: 1, title: "Peace, Justice and Strong Institutions", description: "Promote peaceful and inclusive societies.", color: "#00689D", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-16.jpg", featured: false, impactMetric: "people with justice access", impactValue: "5", impactDescription: "Each pledge provides justice access for 5 people" },
  { goalId: 17, categoryId: 1, title: "Partnerships for the Goals", description: "Strengthen global partnership for sustainable development.", color: "#19486A", image: "https://sdgs.un.org/sites/default/files/goals/E_SDG_Icons-17.jpg", featured: true, impactMetric: "partnerships enabled", impactValue: "1", impactDescription: "Each pledge strengthens global partnerships" },

  // Personal Habits (Category 2)
  { goalId: 101, categoryId: 2, title: "Stop Using Plastic Earbuds", description: "Switch to reusable or biodegradable alternatives for ear cleaning.", color: "#10B981", image: "", featured: false, impactMetric: "plastic items saved", impactValue: "365", impactDescription: "Each pledge saves 365 plastic items per year" },
  { goalId: 102, categoryId: 2, title: "Reduce Plastic Bags", description: "Commit to using reusable shopping bags for all purchases.", color: "#059669", image: "", featured: true, impactMetric: "plastic bags avoided", impactValue: "500", impactDescription: "Each pledge prevents 500 plastic bags from waste" },
  { goalId: 103, categoryId: 2, title: "Turn Off Lights", description: "Always turn off lights when leaving a room.", color: "#047857", image: "", featured: false, impactMetric: "kWh of energy saved", impactValue: "200", impactDescription: "Each pledge saves 200 kWh of electricity per year" },
  { goalId: 104, categoryId: 2, title: "Use Reusable Water Bottle", description: "Carry a reusable water bottle and avoid single-use plastics.", color: "#0D9488", image: "", featured: false, impactMetric: "plastic bottles avoided", impactValue: "300", impactDescription: "Each pledge prevents 300 bottles from landfills" },
  { goalId: 105, categoryId: 2, title: "Walk or Bike More", description: "Choose walking or cycling for short distance trips.", color: "#14B8A6", image: "", featured: false, impactMetric: "kg CO2 reduced", impactValue: "50", impactDescription: "Each pledge reduces 50 kg of carbon emissions" },
  { goalId: 106, categoryId: 2, title: "Reduce Meat Consumption", description: "Commit to meatless days each week.", color: "#2DD4BF", image: "", featured: false, impactMetric: "kg CO2 saved", impactValue: "200", impactDescription: "Each pledge saves 200 kg of carbon emissions" },

  // Corporate & Workplace (Category 3)
  { goalId: 201, categoryId: 3, title: "Paperless Office", description: "Eliminate unnecessary printing and go fully digital.", color: "#6366F1", image: "", featured: true, impactMetric: "trees saved", impactValue: "5", impactDescription: "Each pledge saves 5 trees per year" },
  { goalId: 202, categoryId: 3, title: "Renewable Energy Supplier", description: "Switch company energy to 100% renewable sources.", color: "#4F46E5", image: "", featured: false, impactMetric: "tons CO2 offset", impactValue: "50", impactDescription: "Each pledge offsets 50 tons of carbon annually" },
  { goalId: 203, categoryId: 3, title: "Remote Work Options", description: "Offer remote work to reduce commuting emissions.", color: "#4338CA", image: "", featured: false, impactMetric: "commute miles saved", impactValue: "5000", impactDescription: "Each pledge saves 5000 miles of commuting" },
  { goalId: 204, categoryId: 3, title: "Sustainable Supply Chain", description: "Audit and improve sustainability of supply chain.", color: "#3730A3", image: "", featured: false, impactMetric: "suppliers audited", impactValue: "10", impactDescription: "Each pledge ensures 10 suppliers meet green standards" },
  { goalId: 205, categoryId: 3, title: "Carbon Neutrality Goal", description: "Set and work toward carbon neutrality by 2030.", color: "#312E81", image: "", featured: false, impactMetric: "% carbon reduced", impactValue: "25", impactDescription: "Each pledge commits to 25% carbon reduction" },

  // Health & Wellbeing (Category 4)
  { goalId: 301, categoryId: 4, title: "Daily Exercise", description: "Commit to 30 minutes of physical activity daily.", color: "#EC4899", image: "", featured: true, impactMetric: "active minutes", impactValue: "10950", impactDescription: "Each pledge adds 10,950 active minutes yearly" },
  { goalId: 302, categoryId: 4, title: "Mental Health Breaks", description: "Take regular breaks for mental wellness during work.", color: "#DB2777", image: "", featured: false, impactMetric: "stress-free hours", impactValue: "250", impactDescription: "Each pledge creates 250 hours of mental wellness" },
  { goalId: 303, categoryId: 4, title: "Digital Detox", description: "Unplug from screens for at least 1 hour daily.", color: "#BE185D", image: "", featured: false, impactMetric: "screen-free hours", impactValue: "365", impactDescription: "Each pledge creates 365 hours of digital wellness" },
  { goalId: 304, categoryId: 4, title: "Sleep Hygiene", description: "Maintain consistent sleep schedule of 7-8 hours.", color: "#9D174D", image: "", featured: false, impactMetric: "quality sleep nights", impactValue: "300", impactDescription: "Each pledge improves 300 nights of sleep quality" },
  { goalId: 305, categoryId: 4, title: "Mindfulness Practice", description: "Practice meditation or mindfulness for 10 minutes daily.", color: "#831843", image: "", featured: false, impactMetric: "mindful minutes", impactValue: "3650", impactDescription: "Each pledge adds 3,650 minutes of mindfulness" },

  // Environmental Conservation (Category 5)
  { goalId: 401, categoryId: 5, title: "Plant Trees Regularly", description: "Commit to planting at least 5 trees per year.", color: "#22C55E", image: "", featured: true, impactMetric: "trees planted", impactValue: "5", impactDescription: "Each pledge plants 5 trees annually" },
  { goalId: 402, categoryId: 5, title: "Beach/Park Cleanups", description: "Participate in monthly cleanup drives.", color: "#16A34A", image: "", featured: false, impactMetric: "kg of waste collected", impactValue: "50", impactDescription: "Each pledge collects 50 kg of waste yearly" },
  { goalId: 403, categoryId: 5, title: "Wildlife Protection", description: "Support and advocate for local wildlife habitats.", color: "#15803D", image: "", featured: false, impactMetric: "species protected", impactValue: "10", impactDescription: "Each pledge helps protect 10 local species" },
  { goalId: 404, categoryId: 5, title: "Composting", description: "Start composting organic waste at home or work.", color: "#166534", image: "", featured: false, impactMetric: "kg of compost created", impactValue: "200", impactDescription: "Each pledge creates 200 kg of nutrient-rich compost" },
  { goalId: 405, categoryId: 5, title: "Water Conservation", description: "Reduce water usage by 20% through mindful consumption.", color: "#14532D", image: "", featured: false, impactMetric: "liters of water saved", impactValue: "10000", impactDescription: "Each pledge saves 10,000 liters of water yearly" },

  // Community & Social (Category 6)
  { goalId: 501, categoryId: 6, title: "Volunteer Hours", description: "Commit to volunteering 4 hours per month.", color: "#F59E0B", image: "", featured: true, impactMetric: "volunteer hours", impactValue: "48", impactDescription: "Each pledge contributes 48 volunteer hours yearly" },
  { goalId: 502, categoryId: 6, title: "Support Local Businesses", description: "Prioritize shopping at local and sustainable businesses.", color: "#D97706", image: "", featured: false, impactMetric: "local purchases", impactValue: "100", impactDescription: "Each pledge supports 100 local business transactions" },
  { goalId: 503, categoryId: 6, title: "Mentor Young People", description: "Dedicate time to mentoring youth in your community.", color: "#B45309", image: "", featured: false, impactMetric: "mentoring hours", impactValue: "24", impactDescription: "Each pledge provides 24 hours of youth mentorship" },
  { goalId: 504, categoryId: 6, title: "Food Donation Drives", description: "Organize or participate in food donation initiatives.", color: "#92400E", image: "", featured: false, impactMetric: "meals donated", impactValue: "100", impactDescription: "Each pledge helps donate 100 meals to those in need" },
  { goalId: 505, categoryId: 6, title: "Inclusive Practices", description: "Promote diversity and inclusion in your community.", color: "#78350F", image: "", featured: false, impactMetric: "people reached", impactValue: "50", impactDescription: "Each pledge promotes inclusion for 50 people" },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed categories and goals on startup
  try {
    await storage.seedCategories(CATEGORIES);
    console.log("✓ Categories seeded successfully");
    await storage.seedGoals(GOALS);
    console.log("✓ Goals seeded successfully");
  } catch (error) {
    console.error("✗ Error seeding data:", error);
  }

  // Category routes
  app.get("/api/categories", async (_req, res) => {
    try {
      const allCategories = await storage.getCategories();
      res.json(allCategories);
    } catch (error) {
      console.error("✗ Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("✗ Error fetching category:", error);
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  app.get("/api/categories/:id/goals", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.id);
      const categoryGoals = await storage.getGoalsByCategory(categoryId);
      res.json(categoryGoals);
    } catch (error) {
      console.error("✗ Error fetching category goals:", error);
      res.status(500).json({ message: "Failed to fetch category goals" });
    }
  });

  // Goal routes
  app.get("/api/goals", async (_req, res) => {
    try {
      const allGoals = await storage.getGoals();
      res.json(allGoals);
    } catch (error) {
      console.error("✗ Error fetching goals:", error);
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
      console.error("✗ Error fetching goal:", error);
      res.status(500).json({ message: "Failed to fetch goal" });
    }
  });

  app.put("/api/goals/:id/impact", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { impactMetric, impactValue, impactDescription } = req.body;

      const impactSchema = z.object({
        impactMetric: z.string().min(1, "Impact metric is required"),
        impactValue: z.string().min(1, "Impact value is required"),
        impactDescription: z.string().min(1, "Impact description is required"),
      });

      impactSchema.parse({ impactMetric, impactValue, impactDescription });

      const goal = await storage.updateGoalImpact(id, impactMetric, impactValue, impactDescription);
      if (!goal) {
        return res.status(404).json({ message: "Goal not found" });
      }
      res.json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid impact data", errors: error.errors });
      }
      console.error("✗ Error updating goal impact:", error);
      res.status(500).json({ message: "Failed to update goal impact" });
    }
  });

  // Pledge routes
  app.post("/api/pledges", async (req, res) => {
    try {
      console.log("📝 Pledge submission received:", JSON.stringify(req.body).substring(0, 200));
      const pledgeData = insertPledgeSchema.parse(req.body);
      const pledge = await storage.createPledge(pledgeData);
      console.log("✓ Pledge created with ID:", pledge.id);
      res.status(201).json(pledge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("✗ Validation error:", error.errors);
        return res.status(400).json({ message: "Invalid pledge data", errors: error.errors });
      }
      console.error("✗ Error creating pledge:", error);
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
      console.error("✗ Error fetching pledge:", error);
      res.status(500).json({ message: "Failed to fetch pledge" });
    }
  });

  return httpServer;
}
