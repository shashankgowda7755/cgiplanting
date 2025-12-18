import { useQuery } from "@tanstack/react-query";

export interface Goal {
  id: number;
  goalId: number;
  title: string;
  description: string;
  color: string;
  image: string;
  featured?: boolean;
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
