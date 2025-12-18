import { Link } from "wouter";
import { Globe, Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100 font-sans text-slate-900">
      {/* Top Bar for Official Look */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-2.5 px-4 text-xs font-medium tracking-widest backdrop-blur-sm">
        <div className="container flex justify-between items-center">
          <span className="text-white/90">An Official Initiative for Sustainable Development</span>
          <div className="hidden sm:flex gap-6">
            <a href="#" className="text-white/70 hover:text-emerald-300 transition-all duration-300 hover:underline decoration-emerald-300 underline-offset-2">Press</a>
            <a href="#" className="text-white/70 hover:text-emerald-300 transition-all duration-300 hover:underline decoration-emerald-300 underline-offset-2">Partners</a>
            <a href="#" className="text-white/70 hover:text-emerald-300 transition-all duration-300 hover:underline decoration-emerald-300 underline-offset-2">Global Impact</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/40 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 shadow-lg shadow-black/5">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-500 via-green-600 to-teal-700 flex items-center justify-center text-white shadow-xl shadow-green-500/20 group-hover:scale-110 group-hover:shadow-green-500/40 transition-all duration-300">
              <Globe className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl tracking-tight leading-none text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-green-700 transition-all duration-300">Global Pledge</span>
              <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase">Initiative</span>
            </div>
          </Link>

          {/* Mobile Pledge Button */}
          <Link href="/pledge" className="md:hidden px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 font-bold text-sm transition-all duration-300">
            Pledge
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
            <Link href="/" className="text-slate-700 hover:text-emerald-600 transition-colors duration-200 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <a href="#about" className="text-slate-700 hover:text-emerald-600 transition-colors duration-200 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#impact" className="text-slate-700 hover:text-emerald-600 transition-colors duration-200 relative group">
              Impact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
            </a>
            <Link href="/pledge" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 font-bold tracking-wider transition-all duration-300">
              Take the Pledge
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Professional Footer */}
      <footer className="bg-gradient-to-b from-slate-900 via-slate-900 to-black text-slate-300 border-t border-white/10 backdrop-blur-xl">
        <div className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1 space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="font-serif font-bold text-lg text-white">Global Pledge</span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400">
                Empowering individuals worldwide to commit to sustainable action. Join the movement for a better tomorrow.
              </p>
              <div className="flex space-x-4 pt-4">
                <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-emerald-500/50">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/50">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-600/50">
                  <Facebook className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <h3 className="font-serif font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3 text-sm">
                <li><Link href="/" className="hover:text-green-400 transition-colors">Home</Link></li>
                <li><Link href="/pledge" className="hover:text-green-400 transition-colors">Take the Pledge</Link></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Our Impact</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Latest News</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-serif font-bold text-white mb-6">Resources</h3>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-green-400 transition-colors">UN SDG Goals</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Download Assets</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Partner with Us</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Support</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h3 className="font-serif font-bold text-white mb-6">Contact Us</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-500 shrink-0" />
                  <span>123 Sustainability Ave,<br/>New York, NY 10001</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-500 shrink-0" />
                  <span>contact@globalpledge.org</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} Global Pledge Initiative. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
