import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SDGs } from "@/lib/goals";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock Data
const MOCK_PLEDGES = Array.from({ length: 20 }).map((_, i) => ({
  id: `PLG-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
  name: ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Evan Wright"][i % 5],
  country: ["USA", "UK", "Canada", "Germany", "France"][i % 5],
  goalId: (i % 17) + 1,
  date: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString(),
}));

export default function Registry() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mb-2">Public Pledge Registry</h1>
          <p className="text-muted-foreground">Official record of global commitments.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or ID..." className="pl-10" />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Goal Pledged</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_PLEDGES.map((pledge) => {
              const goal = SDGs.find(g => g.id === pledge.goalId);
              return (
                <TableRow key={pledge.id}>
                  <TableCell className="font-mono text-xs text-muted-foreground">{pledge.id}</TableCell>
                  <TableCell className="font-medium">{pledge.name}</TableCell>
                  <TableCell>{pledge.country}</TableCell>
                  <TableCell>
                    {goal && (
                      <Badge variant="outline" className="border-0 text-white" style={{ backgroundColor: goal.color }}>
                        SDG {goal.id}: {goal.title}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{pledge.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
