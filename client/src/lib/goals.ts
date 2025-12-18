import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  order: number;
}

export interface Goal {
  id: number;
  goalId: number;
  title: string;
  description: string;
  color: string;
  image: string;
  featured?: boolean;
  impactMetric?: string | null;
  impactValue?: string | null;
  impactDescription?: string | null;
  categoryId?: number | null;
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("/api/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });
}

export function useGoals() {
  return useQuery<Goal[]>({
    queryKey: ["goals"],
    queryFn: async () => {
      const res = await fetch("/api/goals");
      if (!res.ok) throw new Error("Failed to fetch goals");
      return res.json();
    },
  });
}

export function useGoalsByCategory(categoryId: number | null) {
  return useQuery<Goal[]>({
    queryKey: ["goals", "category", categoryId],
    queryFn: async () => {
      if (!categoryId) return [];
      const res = await fetch(`/api/categories/${categoryId}/goals`);
      if (!res.ok) throw new Error("Failed to fetch category goals");
      return res.json();
    },
    enabled: !!categoryId,
  });
}
