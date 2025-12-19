import { useGoals } from "@/lib/goals";
import { motion } from "framer-motion";
import { Globe, Wallet, Utensils, Heart, GraduationCap, Users, Droplets, Zap, Briefcase, Factory, Equal, Building2, Recycle, ThermometerSun, Fish, TreePine, Shield, Handshake } from "lucide-react";

const GoalIcons: Record<number, React.ElementType> = {
  1: Wallet, 2: Utensils, 3: Heart, 4: GraduationCap, 5: Users, 6: Droplets,
  7: Zap, 8: Briefcase, 9: Factory, 10: Equal, 11: Building2, 12: Recycle,
  13: ThermometerSun, 14: Fish, 15: TreePine, 16: Shield, 17: Handshake,
  101: Recycle, 102: Recycle, 103: Zap, 104: Droplets, 105: Users, 106: Utensils,
  201: TreePine, 202: Zap, 203: Building2, 204: Factory, 205: ThermometerSun,
  301: Heart, 302: Heart, 303: Users, 304: Heart, 305: Heart,
  401: TreePine, 402: Heart, 403: Fish, 404: Heart, 405: Droplets,
  501: Users, 502: Building2, 503: GraduationCap, 504: Utensils, 505: Users
};

export default function Impact() {
  const { data: goals, isLoading } = useGoals();
  const SDGs = goals || [];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="space-y-20 pb-16">
      <section className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-6 font-serif">Impact Per Pledge</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">See the measurable impact of every single pledge made toward the Sustainable Development Goals worldwide</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SDGs.map((goal, i) => {
            const Icon = GoalIcons[goal.goalId] || Globe;
            if (!goal.impactMetric) return null;
            return (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl p-8 backdrop-blur-xl border border-white/50 shadow-lg hover:shadow-2xl transition-all"
                style={{ backgroundColor: goal.color + "15" }}
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className="rounded-xl p-4 flex-shrink-0" style={{ backgroundColor: goal.color }}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-slate-900 text-2xl font-serif mb-2">{goal.title}</h3>
                    <p className="text-lg font-bold" style={{ color: goal.color }}>{goal.impactValue} {goal.impactMetric}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed text-base">{goal.impactDescription}</p>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
