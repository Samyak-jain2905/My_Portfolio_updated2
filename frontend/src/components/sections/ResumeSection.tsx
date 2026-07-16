"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, FileText, CheckCircle2, Briefcase, Code2, GraduationCap, Terminal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import ResumeUploadClient from "@/components/ResumeUploadClient";

export function ResumeSection({ latestResume, backendBaseUrl }: { latestResume: any, backendBaseUrl: string }) {
  const resumeUrl = latestResume ? (latestResume.resumeFileUrl.startsWith('http') ? latestResume.resumeFileUrl : `${backendBaseUrl}${latestResume.resumeFileUrl}`) : null;

  const highlights = [
    { title: "Experience", desc: "1+ Years Backend Dev", icon: <Briefcase size={20} className="text-violet-400" /> },
    { title: "Projects", desc: "5+ full stack projects", icon: <Code2 size={20} className="text-cyan-400" /> },
    { title: "Education", desc: "B.Tech in CS (7.91 CGPA)", icon: <GraduationCap size={20} className="text-violet-400" /> },
    { title: "Skills", desc: "java springboot mysql", icon: <Terminal size={20} className="text-cyan-400" /> },
  ];

  return (
    <section id="resume" className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            <span className="text-white">Resume &</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">Highlights</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            My professional journey and qualifications at a glance.
          </p>
        </motion.div>

        <div className="mb-8">
          <ResumeUploadClient existingResume={latestResume} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Preview & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="premium-card p-2 rounded-3xl h-[400px] md:h-[500px] overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-cyan-600/5 pointer-events-none" />
              {resumeUrl ? (
                <iframe 
                  src={resumeUrl} 
                  className="w-full h-full border-0 bg-white rounded-2xl relative z-10"
                  title="Resume Viewer"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 bg-[#09090b]/50 rounded-2xl relative z-10">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <p>No resume uploaded yet.</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="premium-card p-6 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400 mb-1">ATS Compatibility</p>
                  <p className="text-2xl font-bold text-white flex items-center gap-2">
                    92% <CheckCircle2 size={24} className="text-green-500" />
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-500 font-bold">A+</span>
                </div>
              </div>
              
              {resumeUrl && (
                <a href={resumeUrl} download className="block h-full">
                  <Button className="w-full h-full gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl text-lg transition-all hover:border-violet-500/50 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]">
                    <Download size={24} className="text-violet-400" /> Download PDF
                  </Button>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: Highlights Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.02, x: 5 }}
                className="premium-card p-6 rounded-2xl flex items-center gap-4 group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-violet-500/30 transition-all">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all">
                    {item.title}
                  </h4>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              </motion.div>
            ))}
            
            <div className="premium-card p-6 rounded-2xl mt-auto border-violet-500/20 bg-violet-900/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/20 rounded-full blur-3xl" />
              <h4 className="text-lg font-bold text-white mb-2 relative z-10">Looking for new opportunities</h4>
              <p className="text-slate-300 text-sm relative z-10">Available for full-time backend and full-stack engineering roles.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
