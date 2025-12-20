import { Link, useLocation } from "wouter";
import { Globe, Mail, MapPin, Phone, Instagram, Twitter, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const handleScroll = (id: string) => (e: React.MouseEvent) => {
    if (location === "/") {
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        window.scrollTo({
          top: element.offsetTop - 120,
          behavior: "smooth"
        });
      }
    }
  };

  return (

    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-slate-50 to-slate-100 font-sans text-slate-900 pt-[80px]">
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <header className="w-full border-b border-white/20 bg-white/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60 shadow-lg shadow-black/5">

          <div className="w-full px-8 flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group" onClick={handleScroll("hero")}>
              <img src="/communitree_logo.png" alt="Communitree" className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            </Link>

            {/* Mobile Pledge Button */}
            <Link href="/pledge" className="md:hidden px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 font-bold text-sm transition-all duration-300">
              Pledge
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
              <Link href="/" className="text-slate-700 hover:text-emerald-600 transition-colors duration-200 relative group" onClick={handleScroll("hero")}>
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-green-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/pledge" className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 font-bold tracking-wider transition-all duration-300">
                Take the Pledge
              </Link>
            </nav>
          </div>
        </header>
      </div>


      <main className="flex-1">
        {children}
      </main>


    </div>
  );
}
