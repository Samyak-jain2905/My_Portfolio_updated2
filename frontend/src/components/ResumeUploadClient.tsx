"use client";

import { useState, useEffect } from "react";
import { uploadFile, createResume, deleteResume } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Upload, Trash2 } from "lucide-react";

export default function ResumeUploadClient({ existingResume }: { existingResume?: any }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    if (role === "ADMIN" && storedToken) {
      setIsAdmin(true);
      setToken(storedToken);
    }
  }, []);

  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (existingResume) {
      alert("Please delete the existing resume before uploading a new one.");
      return;
    }
    setStatus("loading");
    try {
      if (!resumeFile) throw new Error("Please select a resume file");
      
      if (resumeFile.size > 500 * 1024) {
        throw new Error("Resume file size must be less than 500 KB");
      }

      const uploadRes = await uploadFile(resumeFile, token);
      await createResume({ resumeName: resumeName || "Updated Resume", resumeFileUrl: uploadRes.url }, token);
      setStatus("success");
      setResumeName("");
      setResumeFile(null);
      // Reload page to show new resume
      window.location.reload();
    } catch (e: any) {
      console.error(e);
      setStatus("error");
      alert(e.message || "Failed to upload resume");
    }
  };

  const handleDeleteResume = async () => {
    if (!existingResume || !existingResume.id) return;
    if (!confirm("Are you sure you want to delete the current resume?")) return;
    
    setStatus("loading");
    try {
      await deleteResume(existingResume.id, token);
      setStatus("success");
      window.location.reload();
    } catch (e: any) {
      console.error(e);
      setStatus("error");
      alert(e.message || "Failed to delete resume");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="mt-8 p-6 bg-white/70 dark:bg-white/10 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-white/20 shadow-xl max-w-2xl mx-auto md:mx-0">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white"><Upload size={20}/> Admin: Manage Resume</h3>
      
      {existingResume ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700/50">
          <div>
            <p className="text-slate-900 dark:text-white font-medium">Existing Resume: {existingResume.resumeName}</p>
            <p className="text-sm text-slate-550 dark:text-slate-400 mt-1">You can only have one resume. Delete this one to upload a new one.</p>
          </div>
          <Button 
            onClick={handleDeleteResume} 
            disabled={status === "loading"}
            variant="destructive"
            className="flex items-center gap-2 bg-red-500/20 text-red-650 dark:text-red-400 hover:bg-red-500 hover:text-white transition-colors"
          >
            <Trash2 size={16} /> Delete Resume
          </Button>
        </div>
      ) : (
        <form onSubmit={handleResumeSubmit} className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-auto flex-1">
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Name (e.g. 2024 Tech)</label>
            <input type="text" value={resumeName} onChange={e => setResumeName(e.target.value)} required suppressHydrationWarning className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-white/20 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-600" />
          </div>
          <div className="w-full sm:w-auto flex-1">
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">PDF File</label>
            <input type="file" accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files?.[0] || null)} required suppressHydrationWarning className="w-full p-2 text-sm text-slate-650 dark:text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-600 file:text-white hover:file:bg-violet-700 transition-colors cursor-pointer" />
          </div>
          <div className="w-full sm:w-auto">
            <Button disabled={status === "loading"} type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white py-2.5">
              {status === "loading" ? "Processing..." : "Upload"}
            </Button>
          </div>
        </form>
      )}

      {status === "success" && <p className="text-violet-600 dark:text-violet-400 text-sm mt-3 font-medium">Operation completed successfully!</p>}
      {status === "error" && <p className="text-red-650 dark:text-red-400 text-sm mt-3 font-medium">Operation failed. Please try again.</p>}
    </div>
  );
}
