import { SDGs } from "@/lib/goals";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="container relative z-10 mx-auto text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-sm mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              1,240,592 pledges made globally
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-6 leading-tight">
              Commit to a Better Future.<br/>
              <span className="text-primary">Make It Official.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              The Global Pledge Initiative is the official platform for individuals to register their commitment to the UN Sustainable Development Goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 h-14">
                <Link href="/pledge">Make a Pledge</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 h-14 bg-transparent border-white text-white hover:bg-white/10 hover:text-white">
                <Link href="/registry">View Registry</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-slate-50 border-none shadow-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">1.2M+</h3>
              <p className="text-muted-foreground">Global Citizens</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 border-none shadow-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">193</h3>
              <p className="text-muted-foreground">Countries Represented</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-50 border-none shadow-sm">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900">17</h3>
              <p className="text-muted-foreground">Sustainable Goals</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Choose Your Cause</h2>
            <p className="text-muted-foreground">Select a goal to start your pledge journey.</p>
          </div>
          <Button variant="ghost" className="gap-2" asChild>
            <Link href="/pledge">View All <ArrowRight className="w-4 h-4" /></Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {SDGs.slice(0, 12).map((goal) => (
            <Link key={goal.id} href={`/pledge?goal=${goal.id}`}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer group relative aspect-square rounded-lg p-4 flex flex-col justify-between transition-all"
                style={{ backgroundColor: goal.color }}
              >
                <span className="text-white/80 font-bold text-xl">{goal.id}</span>
                <span className="text-white font-bold text-sm leading-tight">{goal.title}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
