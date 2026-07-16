"use client";

import React, { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Award, FileText, Image as ImageIcon, ExternalLink, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getBackendBaseUrl } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface Certificate {
  id: number;
  title: string;
  fileUrl: string;
}

export default function CertificateClient({ certificates }: { certificates: Certificate[] }) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const backendBaseUrl = getBackendBaseUrl();

  if (!certificates || certificates.length === 0) {
    return (
      <div className="text-center py-12">
        <ScrollReveal>
          <div className="group hover:-translate-y-2 transition-all duration-300 bg-slate-800/50 p-10 rounded-[2rem] border border-slate-700/50 backdrop-blur-sm max-w-lg mx-auto">
            <Award className="mx-auto text-slate-500 mb-4" size={48} />
            <p className="text-slate-400 text-lg">No certificates added yet. Check back soon!</p>
          </div>
        </ScrollReveal>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {certificates.map((cert, index) => {
            const isPdf = cert.fileUrl.toLowerCase().endsWith(".pdf");
            const displayUrl = cert.fileUrl.startsWith("http")
              ? cert.fileUrl
              : `${backendBaseUrl}${cert.fileUrl}`;

            return (
              <ScrollReveal key={cert.id} delay={index * 0.1} className="flex-shrink-0 w-[85vw] sm:w-[400px] snap-center">
                <motion.div 
                  whileHover={{ scale: 1.03, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group relative flex flex-col h-full bg-white/5 hover:bg-white/10 rounded-[2rem] p-6 border border-white/10 hover:border-violet-500/30 transition-colors duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),_0_0_20px_rgba(124,58,237,0.3)] overflow-hidden backdrop-blur-md"
                >
                
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-3xl group-hover:bg-violet-600/20 transition-all duration-300 -z-10"></div>
                
                {/* Icon & File Type indicator */}
                <div className="flex justify-between items-start mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-violet-400 group-hover:text-cyan-400 group-hover:bg-white/20 transition-all border border-white/5">
                    <Award size={28} />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-slate-300 border border-white/10">
                    {isPdf ? (
                      <>
                        <FileText size={12} className="text-red-400" />
                        PDF Document
                      </>
                    ) : (
                      <>
                        <ImageIcon size={12} className="text-green-400" />
                        Image / Photo
                      </>
                    )}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between space-y-4 relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-all">
                      {cert.title}
                    </h3>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    <Button
                      variant="outline"
                      onClick={() => setSelectedCert(cert)}
                      className="flex-1 gap-2 rounded-full border-white/20 bg-transparent hover:bg-white/10 text-white font-medium transition-colors"
                    >
                      <Eye size={16} /> View
                    </Button>
                    <a
                      href={displayUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <Button className="w-full gap-2 bg-violet-600 hover:bg-violet-500 text-white rounded-full shadow-[0_0_15px_rgba(124,58,237,0.4)] border-none font-medium transition-colors">
                        Open <ExternalLink size={16} />
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          );
        })}
        </div>
      </div>

      {/* Premium Lightbox Modal Viewer */}
      <AnimatePresence>
      {selectedCert && (
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
            className="relative w-full max-w-4xl h-[85vh] bg-[#111827] border border-white/10 rounded-2xl sm:rounded-[2rem] overflow-hidden shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-white truncate pr-4">
                {selectedCert.title}
              </h3>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Viewer Body */}
            <div className="flex-1 bg-[#09090b]/50 overflow-hidden relative flex items-center justify-center p-4">
              {selectedCert.fileUrl.toLowerCase().endsWith(".pdf") ? (
                <iframe
                  src={
                    selectedCert.fileUrl.startsWith("http")
                      ? selectedCert.fileUrl
                      : `${backendBaseUrl}${selectedCert.fileUrl}`
                  }
                  className="w-full h-full border-0 bg-white rounded-xl"
                  title={selectedCert.title}
                />
              ) : (
                <img
                  src={
                    selectedCert.fileUrl.startsWith("http")
                      ? selectedCert.fileUrl
                      : `${backendBaseUrl}${selectedCert.fileUrl}`
                  }
                  alt={selectedCert.title}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                />
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-white/10 flex flex-col sm:flex-row justify-end gap-3 bg-black/20">
              <a
                href={
                  selectedCert.fileUrl.startsWith("http")
                    ? selectedCert.fileUrl
                    : `${backendBaseUrl}${selectedCert.fileUrl}`
                }
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white rounded-full px-6 shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                  Open in New Tab
                </Button>
              </a>
              <Button
                variant="outline"
                onClick={() => setSelectedCert(null)}
                className="w-full sm:w-auto rounded-full px-6 border-white/20 hover:bg-white/10 bg-transparent text-white"
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
