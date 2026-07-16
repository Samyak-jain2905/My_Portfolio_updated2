"use client";

import Link from "next/link";
import { Code2, Users, Mail, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchPortfolio } from "@/lib/api";

export function Footer() {
  const [portfolio, setPortfolio] = useState<any>(null);

  useEffect(() => {
    fetchPortfolio().then((data) => setPortfolio(data)).catch(console.error);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#09090b] pt-16 pb-8 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px]" />

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <Link href="/#home" className="text-2xl font-extrabold tracking-tighter flex items-center gap-2">
              <span className="text-white">My</span><span className="text-violet-500">Portfolio</span>
            </Link>
            <p className="text-slate-400 max-w-sm">
              Building robust, scalable, and premium backend systems. Let's create something amazing together.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href={portfolio?.githubUrl || "#"} target={portfolio?.githubUrl ? "_blank" : undefined} rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-400/50 transition-all">
                <Code2 size={18} />
              </a>
              <a href={portfolio?.linkedinUrl || "#"} target={portfolio?.linkedinUrl ? "_blank" : undefined} rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-violet-400 hover:border-violet-400/50 transition-all">
                <Users size={18} />
              </a>
              <a href={portfolio?.email ? `mailto:${portfolio.email}` : "#"} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:text-cyan-400 hover:border-cyan-400/50 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/#home" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">Home</Link></li>
              <li><Link href="/#about" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">About</Link></li>
              <li><Link href="/#projects" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">Projects</Link></li>
              <li><Link href="/#resume" className="text-slate-400 hover:text-violet-400 transition-colors text-sm">Resume</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/#certificates" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Certificates</Link></li>
              <li><Link href="/#contact" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Contact Me</Link></li>
              <li><Link href="/#resume" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Download CV</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
          >
            Back to Top 
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition-all">
              <ArrowUp size={16} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
