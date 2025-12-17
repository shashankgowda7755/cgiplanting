import { SDGs } from "@/lib/goals";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Award, Wallet, Utensils, Heart, GraduationCap, Droplets, Zap, Briefcase, Factory, Equal, Building2, Recycle, ThermometerSun, Fish, TreePine, Shield, Handshake } from "lucide-react";

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

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-32 px-6 md:px-12 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-30 scale-105 animate-slow-zoom"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
        
        <div className="container relative z-10 mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm mb-8 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="font-mono tracking-wide">1,240,592 pledges verified</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight mb-8 leading-[1.1] drop-shadow-2xl">
              Commit to a <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">Better Future</span>.<br/>
              Make It Official.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              The Global Pledge Initiative is the official platform for individuals to register their commitment to the UN Sustainable Development Goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button asChild size="lg" className="text-lg px-10 h-16 rounded-full shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
                <Link href="/pledge">Make a Pledge</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Users, label: "Global Citizens", value: "1.2M+", color: "text-blue-600", bg: "bg-blue-50" },
            { icon: Globe, label: "Countries Represented", value: "193", color: "text-green-600", bg: "bg-green-50" },
            { icon: Award, label: "Sustainable Goals", value: "17", color: "text-purple-600", bg: "bg-purple-50" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border-none shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="flex flex-col items-center p-8 text-center">
                  <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Goals Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Choose Your Cause</h2>
            <p className="text-xl text-muted-foreground max-w-2xl">Select a goal to start your pledge journey and join thousands of others making a difference.</p>
          </div>
          <Button variant="outline" className="gap-2 rounded-full px-6" asChild>
            <Link href="/pledge">View All Goals <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {SDGs.slice(0, 12).map((goal, i) => {
            const Icon = GoalIcons[goal.id] || Globe;
            return (
              <Link key={goal.id} href={`/pledge?goal=${goal.id}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="cursor-pointer group relative aspect-square rounded-2xl p-5 flex flex-col justify-between transition-all shadow-md hover:shadow-2xl overflow-hidden"
                  style={{ backgroundColor: goal.color }}
                >
                  <div className="absolute -right-4 -bottom-4 opacity-10 transform rotate-12 scale-150 transition-transform group-hover:scale-125 group-hover:rotate-0">
                     <Icon className="w-32 h-32 text-white" />
                  </div>
                  
                  <div className="flex justify-between items-start relative z-10">
                    <span className="text-white/90 font-bold text-3xl font-serif">{goal.id}</span>
                    <Icon className="text-white/60 w-8 h-8 group-hover:text-white transition-colors" />
                  </div>
                  
                  <span className="text-white font-bold text-sm leading-tight relative z-10 group-hover:underline decoration-2 underline-offset-4">{goal.title}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
