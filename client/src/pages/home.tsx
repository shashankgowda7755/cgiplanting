import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TreePine, CheckCircle } from "lucide-react";

const featuredPledges = [
  {
    id: 1,
    title: "CGI Plantation Initiative",
    description: "Join CGI in making a positive environmental impact. Plant trees and receive your official plantation certificate.",
    color: "from-green-700 to-emerald-700",
    category: "cgi-plantation"
  },
];

export default function Home() {


  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);



  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section - Modern & Premium */}
      <section id="hero" className="relative h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 text-white">

        <div className="absolute inset-0">
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
              <span className="font-bold tracking-wide text-white">
                Start Your Plantation Today
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-7xl md:text-8xl font-black tracking-tighter leading-tight drop-shadow-2xl font-serif"
            >
              Start Your<br />
              <span className="bg-gradient-to-r from-amber-200 via-yellow-200 to-amber-100 bg-clip-text text-transparent">Plantation Journey</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Join the movement to create a greener future. Plant trees, receive your certificate, and make a lasting environmental impact.
            </motion.p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Button asChild size="lg" className="text-lg px-10 h-16 rounded-full bg-gradient-to-r from-amber-300 to-yellow-300 hover:from-amber-400 hover:to-yellow-400 text-emerald-900 font-black shadow-2xl shadow-yellow-400/40 hover:shadow-yellow-400/60 transition-all hover:scale-110 hover:-translate-y-1">
                <Link href="/pledge" data-testid="button-take-pledge">Start Your Plantation</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section >

      {/* CGI Plantation Feature Section */}
      < section className="container mx-auto px-6 py-20" >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 font-serif">CGI Plantation Initiative</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">Join CGI in creating a greener future. Plant trees and receive your official certification.</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className="group"
          >
            <Link href="/pledge">
              <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all cursor-pointer h-full bg-white backdrop-blur-xl">
                <div className="relative h-80 overflow-hidden bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <TreePine className="w-32 h-32 text-white/30 group-hover:scale-125 transition-transform duration-500" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-4xl font-black text-white mb-2 font-serif drop-shadow-lg">Plant for the Planet</h3>
                    <p className="text-white/90 text-lg font-medium">Make a lasting environmental impact</p>
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700 leading-relaxed">Plant trees as part of CGI's initiative</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700 leading-relaxed">Receive an official plantation certificate with your name</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-slate-700 leading-relaxed">Share your contribution and inspire others</p>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold rounded-lg h-14 text-lg shadow-lg hover:shadow-xl transition-all group-hover:scale-105" data-testid="button-start-plantation">
                    Start Your Plantation Journey →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </section >


    </div >
  );
}
