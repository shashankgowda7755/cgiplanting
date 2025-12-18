import { useGoals } from "@/lib/goals";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Globe, Users, Award, Wallet, Utensils, Heart, GraduationCap, Droplets, Zap, Briefcase, Factory, Equal, Building2, Recycle, ThermometerSun, Fish, TreePine, Shield, Handshake, CheckCircle } from "lucide-react";
import handsImage from '@assets/generated_images/hands_together_community_unity.png';
import forestImage from '@assets/generated_images/lush_green_forest_canopy.png';

// Icon mapping (simplified for Home)
const GoalIcons: Record<number, React.ElementType> = {
  1: Wallet,
  2: Utensils,
  3: Heart,
  4: GraduationCap,
  5: Users,
  6: Droplets,
  7: Zap,
  8: Briefcase,
  9: Factory,
  10: Equal,
  11: Building2,
  12: Recycle,
  13: ThermometerSun,
  14: Fish,
  15: TreePine,
  16: Shield,
  17: Handshake
};

const featuredPledges = [
  {
    id: 1,
    title: "Climate Action",
    description: "Join the movement to combat climate change and protect our environment",
    image: forestImage,
    color: "from-green-600 to-emerald-600",
    goalId: 13
  },
  {
    id: 2,
    title: "Community Unity",
    description: "Stand together for equality, justice, and shared prosperity",
    image: handsImage,
    color: "from-blue-600 to-cyan-600",
    goalId: 17
  },
];

export default function Home() {
  const { data: goals, isLoading } = useGoals();
  const SDGs = goals || [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section - Modern & Premium */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">
        <div className="absolute inset-0">
          <img src={forestImage} alt="Hero" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-700/70 to-transparent"></div>
          <div className="absolute inset-0 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container relative z-10 mx-auto text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-white/20 border border-white/40 text-sm backdrop-blur-xl shadow-2xl hover:bg-white/25 transition-all"
            >
              <CheckCircle className="w-5 h-5 text-amber-300 animate-pulse" />
              <span className="font-bold tracking-wide text-white">1.24M+ Pledges Made Worldwide</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-7xl md:text-8xl font-black tracking-tighter leading-tight drop-shadow-2xl font-serif"
            >
              Make Your<br />
              <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent">Pledge Today</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Join millions committing to the UN Sustainable Development Goals. Get your certificate, inspire others, and drive real change.
            </motion.p>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild size="lg" className="text-lg px-10 h-16 rounded-full bg-gradient-to-r from-amber-300 to-yellow-300 hover:from-amber-400 hover:to-yellow-400 text-emerald-900 font-black shadow-2xl shadow-yellow-400/40 hover:shadow-yellow-400/60 transition-all hover:scale-110 hover:-translate-y-1">
                <Link href="/pledge" data-testid="button-take-pledge">Take the Pledge Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Pledges Section */}
      <section className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 font-serif">Featured Causes</h2>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">Choose a cause that matters to you and join thousands making a measurable, real difference in the world</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredPledges.map((pledge, i) => (
            <motion.div
              key={pledge.id}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: 12 }}
              className="group"
            >
              <Link href={`/pledge?goal=${pledge.goalId}`}>
                <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all cursor-pointer h-full bg-white backdrop-blur-xl">
                  <div className="relative h-72 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                    <img src={pledge.image} alt={pledge.title} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500 blur-sm" />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 group-hover:from-black/70 transition-all`}></div>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <h3 className="text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors font-serif">{pledge.title}</h3>
                    <p className="text-slate-700 leading-relaxed text-lg">{pledge.description}</p>
                    <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-lg h-12 shadow-lg hover:shadow-xl transition-all">
                      Start Pledge
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-white via-emerald-50/30 to-white py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Users, label: "Global Citizens", value: "1.2M+", color: "text-emerald-600", bg: "bg-gradient-to-br from-emerald-100 to-green-100", glow: "shadow-emerald-500/20" },
              { icon: Globe, label: "Countries Represented", value: "193", color: "text-blue-600", bg: "bg-gradient-to-br from-blue-100 to-cyan-100", glow: "shadow-blue-500/20" },
              { icon: Award, label: "Sustainable Goals", value: "17", color: "text-amber-600", bg: "bg-gradient-to-br from-amber-100 to-yellow-100", glow: "shadow-amber-500/20" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -20, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className={`w-28 h-28 ${stat.bg} ${stat.color} rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl ${stat.glow} backdrop-blur-xl border border-white/50`}>
                  <stat.icon className="w-14 h-14" />
                </div>
                <h3 className="text-6xl font-black text-slate-900 mb-3 font-serif">{stat.value}</h3>
                <p className="text-slate-600 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Goals Grid */}
      <section className="container mx-auto px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 font-serif">All 17 Goals</h2>
            <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">Pick a Sustainable Development Goal and join the global movement for positive change</p>
          </div>
          <Button className="gap-2 rounded-full px-8 h-12 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold shadow-lg hover:shadow-xl transition-all" asChild>
            <Link href="/pledge">View All <ArrowRight className="w-5 h-5" /></Link>
          </Button>
        </motion.div>

        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-teal-50 rounded-3xl p-12 mb-12 border border-emerald-200/50">
          <h3 className="text-3xl font-black text-slate-900 mb-8 font-serif">Global Pledge Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { goal: "Climate Action", count: "245,127", color: "from-green-500 to-emerald-600" },
              { goal: "Gender Equality", count: "189,543", color: "from-pink-500 to-rose-600" },
              { goal: "Quality Education", count: "156,892", color: "from-red-500 to-orange-600" },
              { goal: "Good Health & Well-being", count: "143,256", color: "from-green-600 to-teal-600" },
              { goal: "Clean Water & Sanitation", count: "112,847", color: "from-blue-500 to-cyan-600" },
              { goal: "Decent Work & Economic Growth", count: "98,734", color: "from-purple-500 to-indigo-600" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all`}
              >
                <h4 className="text-lg font-bold mb-2">{stat.goal}</h4>
                <p className="text-4xl font-black font-serif">{stat.count}</p>
                <p className="text-white/70 text-sm mt-2">pledges made</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SDGs.slice(0, 12).map((goal, i) => {
            const Icon = GoalIcons[goal.goalId] || Globe;
            return (
              <Link key={goal.goalId} href={`/pledge?goal=${goal.goalId}`} data-testid={`link-goal-${goal.goalId}`}>
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 150 }}
                  whileHover={{ y: 12, scale: 1.08 }}
                  className="cursor-pointer group relative aspect-square rounded-3xl p-5 flex flex-col justify-between transition-all shadow-xl hover:shadow-2xl overflow-hidden border border-white/40 backdrop-blur-sm"
                  style={{ backgroundColor: goal.color }}
                >
                  <div className="absolute -right-8 -bottom-8 opacity-10 transform rotate-12 scale-150 transition-all group-hover:scale-140 group-hover:rotate-3">
                     <Icon className="w-44 h-44 text-white" />
                  </div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-white font-black text-4xl drop-shadow-lg">{goal.goalId}</span>
                    <Icon className="text-white/80 w-8 h-8 group-hover:text-white/100 transition-all group-hover:scale-125" />
                  </div>
                  
                  <span className="text-white font-bold text-sm leading-tight relative z-10 group-hover:underline decoration-white decoration-2 underline-offset-4 transition-all">{goal.title}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
