import { SDGs } from "@/lib/goals";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
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
  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section - MyGov Style */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-green-700 to-green-600 text-white">
        <div className="absolute inset-0">
          <img src={forestImage} alt="Hero" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-green-700 via-green-700/80 to-green-600/60"></div>
        </div>
        
        <div className="container relative z-10 mx-auto text-center max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/15 border border-white/30 text-sm backdrop-blur-md shadow-lg">
              <CheckCircle className="w-4 h-4 text-yellow-300" />
              <span className="font-semibold tracking-wide">1.24M+ Pledges Made Worldwide</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight drop-shadow-xl">
              Make Your Pledge<br />
              <span className="text-yellow-300">For a Better Tomorrow</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light">
              Join millions of people worldwide committing to the UN Sustainable Development Goals. Take the pledge, get your certificate, and inspire others.
            </p>
            
            <Button asChild size="lg" className="text-lg px-12 h-14 rounded-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold shadow-2xl hover:shadow-yellow-400/50 transition-all hover:scale-105">
              <Link href="/pledge">Take the Pledge</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Pledges Section */}
      <section className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Featured Pledge Categories</h2>
          <p className="text-lg text-slate-600 max-w-2xl">Choose a cause that matters to you and join thousands making a real difference</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {featuredPledges.map((pledge, i) => (
            <motion.div
              key={pledge.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/pledge?goal=${pledge.goalId}`}>
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer h-full">
                  <div className="relative h-56 overflow-hidden bg-slate-200">
                    <img src={pledge.image} alt={pledge.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent`}></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{pledge.title}</h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">{pledge.description}</p>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">
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
      <section className="bg-slate-50 py-16 rounded-2xl">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Users, label: "Global Citizens", value: "1.2M+", color: "text-green-600", bg: "bg-green-100" },
              { icon: Globe, label: "Countries Represented", value: "193", color: "text-blue-600", bg: "bg-blue-100" },
              { icon: Award, label: "Sustainable Goals", value: "17", color: "text-yellow-600", bg: "bg-yellow-100" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-20 h-20 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md`}>
                  <stat.icon className="w-10 h-10" />
                </div>
                <h3 className="text-5xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                <p className="text-slate-600 font-semibold uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Goals Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">All 17 Sustainable Goals</h2>
            <p className="text-lg text-slate-600 max-w-2xl">Select any goal to start your official pledge and join the global movement</p>
          </div>
          <Button className="gap-2 rounded-full px-8 bg-green-600 hover:bg-green-700" asChild>
            <Link href="/pledge">View All <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {SDGs.slice(0, 12).map((goal, i) => {
            const Icon = GoalIcons[goal.id] || Globe;
            return (
              <Link key={goal.id} href={`/pledge?goal=${goal.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="cursor-pointer group relative aspect-square rounded-2xl p-4 flex flex-col justify-between transition-all shadow-lg hover:shadow-xl overflow-hidden border border-white/20"
                  style={{ backgroundColor: goal.color }}
                >
                  <div className="absolute -right-6 -bottom-6 opacity-5 transform rotate-12 scale-150 transition-transform group-hover:scale-125 group-hover:rotate-0">
                     <Icon className="w-40 h-40 text-white" />
                  </div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-white font-bold text-3xl drop-shadow-sm">{goal.id}</span>
                    <Icon className="text-white/70 w-7 h-7 group-hover:text-white/90 transition-colors" />
                  </div>
                  
                  <span className="text-white font-bold text-sm leading-tight relative z-10 group-hover:underline decoration-2 underline-offset-3">{goal.title}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
