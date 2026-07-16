"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Code2, Users, Mail, Download } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

export function HeroSection({ portfolio, backendBaseUrl }: { portfolio: any, backendBaseUrl: string }) {
  const [init, setInit] = useState(false);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  return (
    <section id="home" className="relative container mx-auto px-4 min-h-[100svh] flex items-center justify-center pt-24 pb-12 text-center overflow-hidden">
      
      {/* Animated Aurora Background */}
      <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-violet-600/30 blur-[120px] animate-pulse mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/30 blur-[120px] animate-pulse mix-blend-screen" style={{ animationDelay: "2s" }} />
      </div>

      {/* Floating Particles */}
      {init && (
        /* Particle Engine */
        <div className="absolute inset-0 z-0">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
              background: {
                color: { value: "transparent" },
              },
              fpsLimit: 120,
              interactivity: {
                events: {
                  onClick: { enable: true, mode: "push" },
                  onHover: { enable: true, mode: "repulse" },
                  resize: { enable: true, delay: 0.5 },
                },
                modes: {
                  push: { quantity: 2 },
                  repulse: { distance: 100, duration: 0.4 },
                },
              },
              particles: {
                color: { value: ["#7c3aed", "#06b6d4", "#a855f7"] },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: { default: "bounce" },
                  random: false,
                  speed: 1,
                  straight: false,
                },
                number: {
                  density: { enable: true, width: 800, height: 800 },
                  value: 40,
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
              },
              detectRetina: true,
            }}
            className="absolute inset-0"
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-10 w-full max-w-5xl z-10">
        
        {/* Animated Profile Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mt-10"
        >
          {/* Rotating Gradient Border */}
          <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-violet-600 via-cyan-500 to-violet-600 animate-[spin_4s_linear_infinite]" />
          
          <motion.div
            animate={{ translateY: [-8, 8, -8] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full overflow-hidden border-4 border-[#09090b] bg-[#111827]"
          >
            {portfolio?.photoUrl ? (
              <img 
                src={portfolio.photoUrl.startsWith('http') ? portfolio.photoUrl : `${backendBaseUrl}${portfolio.photoUrl}`} 
                alt="Profile" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Users size={64} className="text-slate-500" />
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <div className="w-full space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 leading-tight text-white">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">{portfolio?.name || "Samyak Jain"}</span>
            </h1>
            
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-300 h-12 flex items-center justify-center">
              <Typewriter
                options={{
                  strings: [
                    'Java Backend Engineer',
                    'Spring Boot Developer',
                    'Problem Solver'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 50,
                  delay: 80,
                  wrapperClassName: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400"
                }}
              />
            </div>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mt-6">
              {portfolio?.shortIntro || "Building robust, scalable, and secure backend systems."}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto px-4"
          >
            <Link href="#resume" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto rounded-full gap-2 bg-violet-600 hover:bg-violet-500 text-white border-none shadow-[0_0_20px_rgba(124,58,237,0.4)] px-8 py-6 text-lg font-semibold transition-all hover:scale-105 hover:-translate-y-1">
                Resume <Download size={20} className="ml-1" />
              </Button>
            </Link>
            <Link href="#contact" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md px-8 py-6 text-lg font-semibold transition-all hover:scale-105 hover:-translate-y-1">
                Contact Me
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-center gap-8 pt-10"
          >
            {portfolio?.githubUrl && (
              <a href={portfolio.githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-all hover:scale-110 hover:-translate-y-1">
                <Code2 size={28} />
              </a>
            )}
            {portfolio?.linkedinUrl && (
              <a href={portfolio.linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-violet-400 transition-all hover:scale-110 hover:-translate-y-1">
                <Users size={28} />
              </a>
            )}
            {portfolio?.email && (
              <a href={`mailto:${portfolio.email}`} className="text-slate-400 hover:text-cyan-400 transition-all hover:scale-110 hover:-translate-y-1">
                <Mail size={28} />
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
