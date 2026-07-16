"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Code2, ExternalLink, Search, X } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectClient({ projects }: { projects: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const allTechs = Array.from(new Set(
    projects.flatMap((p) => p.technologiesUsed && p.technologiesUsed.trim() !== "" ? p.technologiesUsed.split(",").map((t: string) => t.trim()) : [])
  ));

  const filteredProjects = projects.filter((p) => {
    const matchSearch = p.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const projectTechs = p.technologiesUsed && p.technologiesUsed.trim() !== "" ? p.technologiesUsed.split(",").map((t: string) => t.trim()) : [];
    const matchTech = filterTech === "All" || projectTechs.includes(filterTech);

    return matchSearch && matchTech;
  });

  return (
    <div className="space-y-12">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            aria-label="Search projects"
            suppressHydrationWarning
            className="w-full pl-12 pr-4 py-3 border rounded-full bg-white/85 dark:bg-slate-800/80 text-slate-900 dark:text-white shadow-sm border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-violet-600 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 backdrop-blur-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full sm:w-auto">
          <select
            aria-label="Filter by technology"
            suppressHydrationWarning
            className="w-full sm:w-auto border rounded-full bg-white/5 text-white shadow-sm border-white/10 px-6 py-3 pr-10 focus:ring-2 focus:ring-violet-500 outline-none transition-all appearance-none cursor-pointer backdrop-blur-sm"
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
          >
            <option value="All" className="bg-slate-900">All Technologies</option>
            {allTechs.map((tech) => (
              <option key={tech as string} value={tech as string} className="bg-slate-900">{tech as string}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            ▼
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white/5 rounded-3xl border border-white/10 shadow-sm backdrop-blur-sm">No projects found matching your criteria.</div>
      ) : (
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filteredProjects.map((project: any, index: number) => {
              return (
                <ScrollReveal key={project.id || index} delay={index * 0.1} className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center">
                  <motion.div 
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.03, rotateX: 2, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="cursor-pointer group h-full flex flex-col rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),_0_0_20px_rgba(124,58,237,0.3)] hover:border-violet-500/30 transition-colors"
                  >
                    <div className="flex-1 flex flex-col p-6 pt-5">
                      <h3 className="text-xl font-bold transition-colors text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400">
                        {project.projectName}
                      </h3>
                      
                      <p className="text-slate-300 mb-6 line-clamp-3 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {(project.technologiesUsed && project.technologiesUsed.trim() !== "" ? project.technologiesUsed.split(",") : []).map((tech: string) => (
                          <Badge key={tech.trim()} variant="secondary" className="bg-violet-900/30 text-violet-300 border border-violet-500/20">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                        {project.liveDemoLink && (
                          <a 
                            href={project.liveDemoLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Project URL" 
                            className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2"
                          >
                            <ExternalLink size={20} /> <span className="text-sm font-medium">Live Demo</span>
                          </a>
                        )}
                        {project.githubLink && (
                          <a 
                            href={project.githubLink} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Source Code" 
                            className="text-slate-400 hover:text-violet-400 transition-colors flex items-center gap-2"
                          >
                            <Code2 size={20} /> <span className="text-sm font-medium">GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      )}

      {/* Premium Lightbox Modal Viewer for Project Details */}
      <AnimatePresence>
      {selectedProject && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#09090b]/80 backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-2xl bg-[#111827] border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white truncate pr-4">
                Project Details
              </h3>
              <button
                onClick={() => setSelectedProject(null)}
                suppressHydrationWarning
                className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              <div>
                <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  {selectedProject.projectName}
                </h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(selectedProject.technologiesUsed && selectedProject.technologiesUsed.trim() !== "" ? selectedProject.technologiesUsed.split(",") : []).map((tech: string) => (
                    <Badge key={tech.trim()} variant="secondary" className="bg-violet-50 dark:bg-slate-900/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/20">
                      {tech.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <h5 className="text-sm font-semibold text-slate-400 dark:text-slate-450 uppercase tracking-wider mb-2">Description</h5>
                <p className="text-slate-900 dark:text-white text-base leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-white/10 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-end bg-black/20">
              {selectedProject.githubLink && (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" className="w-full gap-2 rounded-full border-white/20 hover:bg-white/10 text-white bg-transparent">
                    <Code2 size={16} /> Source Code
                  </Button>
                </a>
              )}
              {selectedProject.liveDemoLink && (
                <a
                  href={selectedProject.liveDemoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                    View Project <ExternalLink size={16} />
                  </Button>
                </a>
              )}
              <Button
                variant="outline"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto rounded-full border-white/20 hover:bg-white/10 text-white pr-6 pl-6 bg-transparent"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
