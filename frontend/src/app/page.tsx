"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio, fetchProjects, fetchResume, fetchSkills, fetchCertificates, getBackendBaseUrl } from "@/lib/api";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ResumeSection } from "@/components/sections/ResumeSection";
import ProjectClient from "@/components/ProjectClient";
import CertificateClient from "@/components/CertificateClient";
import ContactClient from "@/components/ContactClient";
import { motion } from "framer-motion";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [resumeList, setResumeList] = useState<any[]>([]);
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [certificatesList, setCertificatesList] = useState<any[]>([]);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [p, proj, res, skills, certs] = await Promise.all([
          fetchPortfolio(),
          fetchProjects(),
          fetchResume(),
          fetchSkills(),
          fetchCertificates(),
        ]);
        setPortfolio(p);
        setProjects(proj);
        setResumeList(res);
        setSkillsList(skills);
        setCertificatesList(certs);
      } catch (err) {
        console.error("Error loading portfolio data:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-[#09090b]" />;
  }

  const latestResume = resumeList.length > 0 ? resumeList[resumeList.length - 1] : null;
  const backendBaseUrl = getBackendBaseUrl();

  return (
    <>
      {!showContent && <LoadingScreen onComplete={() => setShowContent(true)} />}
      
      <div className={`flex flex-col text-slate-100 overflow-hidden transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <HeroSection portfolio={portfolio} backendBaseUrl={backendBaseUrl} />
        <AboutSection description={portfolio?.description} />
        <SkillsSection skills={skillsList} />
        
        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                <span className="text-white">Featured</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">Projects</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Some of my recent work that I'm proud of.
              </p>
            </motion.div>
            <ProjectClient projects={projects} />
          </div>
        </section>

        <ResumeSection latestResume={latestResume} backendBaseUrl={backendBaseUrl} />

        {/* Certificates Section */}
        <section id="certificates" className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                <span className="text-white">Licenses &</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">Certificates</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Credentials and professional certifications I have earned.
              </p>
            </motion.div>
            <CertificateClient certificates={certificatesList} />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
                 <span className="text-white">Get In</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">Touch</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Have a question or want to work together? Let's connect!
              </p>
            </motion.div>
            <ContactClient portfolio={portfolio} />
          </div>
        </section>
      </div>
    </>
  );
}
