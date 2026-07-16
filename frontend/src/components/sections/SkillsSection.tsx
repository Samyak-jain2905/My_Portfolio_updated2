"use client";

import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";

const marqueeLogos = [
  "Java", "SpringBoot", "MySQL", "JPA", "Hibernate", "GitHub", "DSA"
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function SkillsSection({ skills }: { skills: any[] }) {
  // If no skills are passed from backend, use some defaults for demo purposes
  const displaySkills = skills && skills.length > 0 ? skills : [
    { id: 1, skillName: "Java Core", category: "Backend" },
    { id: 2, skillName: "Spring Boot & Microservices", category: "Backend" },
    { id: 3, skillName: "RESTful APIs", category: "Backend" },
    { id: 4, skillName: "React & Next.js", category: "Frontend" },
    { id: 5, skillName: "MySQL & PostgreSQL", category: "Database" },
    { id: 6, skillName: "Docker & AWS", category: "DevOps" },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Technical</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">Skills</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Tools, technologies, and frameworks I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Marquee Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-12 md:mb-20"
        >
          <div className="relative py-8 md:py-10 bg-[#111827]/40 border-y border-white/5 backdrop-blur-sm shadow-[0_0_40px_rgba(124,58,237,0.05)]">
            <Marquee gradient={true} gradientColor="#09090b" speed={40} autoFill>
              {marqueeLogos.map((logo, index) => (
                <div key={index} className="mx-8 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-slate-300 font-semibold text-lg hover:bg-white/10 hover:text-white hover:border-violet-500/50 transition-all cursor-default">
                  {logo}
                </div>
              ))}
            </Marquee>
          </div>
        </motion.div>

        {/* Animated Skill Bars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Core Competencies</h3>
            {displaySkills.slice(0, Math.ceil(displaySkills.length / 2)).map((skill, index) => (
              <motion.div key={skill.id || index} variants={itemVariants} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-200">{skill.skillName}</span>
                  <span className="text-cyan-400">{skill.category}</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-violet-600 to-cyan-500 rounded-full relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }} // default to 85% for visual effect
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + (index * 0.1), type: "spring", bounce: 0.2 }}
                  >
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px] animate-[shimmer_2s_infinite]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-6"
          >
             <h3 className="text-2xl font-bold text-white mb-6">Additional Skills</h3>
            {displaySkills.slice(Math.ceil(displaySkills.length / 2)).map((skill, index) => (
              <motion.div key={skill.id || index} variants={itemVariants} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-slate-200">{skill.skillName}</span>
                  <span className="text-violet-400">{skill.category}</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }} // default to 75% for visual effect
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + (index * 0.1), type: "spring", bounce: 0.2 }}
                  >
                     <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px] animate-[shimmer_2s_infinite]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
