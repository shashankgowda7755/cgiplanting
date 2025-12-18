import { Link } from "wouter";
import { Globe, Menu, Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Top Bar for Official Look */}
      <div className="bg-slate-900 text-white py-2 px-4 text-xs font-medium tracking-wide">
        <div className="container flex justify-between items-center">
          <span>An Official Initiative for Sustainable Development</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-400 transition-colors">Press</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Partners</a>
            <a href="#" className="hover:text-yellow-400 transition-colors">Global Impact</a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Globe className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-xl tracking-tight leading-none text-slate-900 group-hover:text-green-700 transition-colors">Global Pledge</span>
              <span className="text-xs font-medium tracking-widest text-slate-500 uppercase">Initiative</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="text-slate-600 hover:text-green-700 transition-colors font-medium">Home</Link>
            <a href="#about" className="text-slate-600 hover:text-green-700 transition-colors font-medium">About</a>
            <a href="#impact" className="text-slate-600 hover:text-green-700 transition-colors font-medium">Impact</a>
            <Link href="/pledge" className="transition-all px-6 py-2.5 rounded-full bg-green-700 text-white shadow-lg hover:bg-green-800 hover:shadow-green-700/30 hover:-translate-y-0.5 font-bold tracking-wide">
              Take the Pledge
            </Link>
          </nav>

          {/* Mobile Nav */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-slate-700">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-6 mt-10">
                <Link href="/" className="text-xl font-serif font-bold text-slate-900">Home</Link>
                <a href="#about" className="text-lg font-medium text-slate-600">About</a>
                <a href="#impact" className="text-lg font-medium text-slate-600">Impact</a>
                <Link href="/pledge" className="text-lg font-bold text-green-700">Take the Pledge</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      {/* Professional Footer */}
      <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
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
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-green-600 hover:text-white transition-colors">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                  <Linkedin className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">
                  <Instagram className="h-4 w-4" />
                </a>
                <a href="#" className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-800 hover:text-white transition-colors">
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

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
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
