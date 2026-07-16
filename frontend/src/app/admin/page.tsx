"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPortfolio, fetchProjects, uploadFile, updatePortfolio, createProject, updateProject, deleteProject, createResume, fetchResume, deleteResume, fetchSkills, createSkill, deleteSkill, fetchCertificates, createCertificate, deleteCertificate, changePassword, fetchContactMessages, deleteContactMessage, getBackendBaseUrl } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Upload, Plus, Save, Trash2, Award, Pencil, X, Mail } from "lucide-react";

export default function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const backendBaseUrl = getBackendBaseUrl();

  // Portfolio State
  const [info, setInfo] = useState<any>({ name: "", title: "", shortIntro: "", description: "", email: "", linkedinUrl: "", githubUrl: "", photoUrl: "" });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Project State
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [project, setProject] = useState({ projectName: "", description: "", technologiesUsed: "", githubLink: "", liveDemoLink: "", thumbnailImageUrl: "" });
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);

  // Resume State
  const [resume, setResume] = useState({ resumeName: "", resumeFileUrl: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [existingResume, setExistingResume] = useState<any>(null);

  // Skills State
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [newSkill, setNewSkill] = useState({ skillName: "", category: "Frontend" });

  // Certificates State
  const [certificatesList, setCertificatesList] = useState<any[]>([]);
  const [newCertificate, setNewCertificate] = useState({ title: "" });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);

  // Messages State
  const [messagesList, setMessagesList] = useState<any[]>([]);

  // Change Password State
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");
    if (role !== "ADMIN" || !storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      loadData(storedToken);
    }
  }, []);

  const loadData = async (activeToken?: string) => {
    const currentToken = activeToken || token || localStorage.getItem("token") || "";
    try {
      const data = await fetchPortfolio();
      if (data) setInfo(data);
      
      const resumes = await fetchResume();
      if (resumes && resumes.length > 0) {
        setExistingResume(resumes[resumes.length - 1]);
      } else {
        setExistingResume(null);
      }

      const skills = await fetchSkills();
      setSkillsList(skills);

      const projects = await fetchProjects();
      setProjectsList(projects);

      const certs = await fetchCertificates();
      setCertificatesList(certs);

      if (currentToken) {
        const messages = await fetchContactMessages(currentToken);
        setMessagesList(messages);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContactMessage(id, token);
      alert("Message deleted!");
      setMessagesList(messagesList.filter(m => m.id !== id));
    } catch (e: any) {
      console.error("Message delete error:", e);
      alert("Failed to delete message: " + e.message);
    }
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let finalPhotoUrl = info.photoUrl;
      if (photoFile) {
        const uploadRes = await uploadFile(photoFile, token);
        finalPhotoUrl = uploadRes.url;
      }
      await updatePortfolio({ ...info, photoUrl: finalPhotoUrl }, token);
      alert("Portfolio info updated!");
    } catch (e) {
      alert("Failed to update portfolio");
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.id) {
      alert("Portfolio ID is not loaded yet.");
      return;
    }
    try {
      if (editingProjectId) {
        const updated = await updateProject(editingProjectId, {
          projectName: project.projectName,
          description: project.description,
          technologiesUsed: project.technologiesUsed,
          githubLink: project.githubLink,
          liveDemoLink: project.liveDemoLink,
          thumbnailImageUrl: project.thumbnailImageUrl,
          portfolioId: info.id
        }, token);
        alert("Project updated!");
        setProjectsList(projectsList.map(p => p.id === editingProjectId ? updated : p));
        setEditingProjectId(null);
      } else {
        const created = await createProject({ 
          projectName: project.projectName, 
          description: project.description,
          technologiesUsed: project.technologiesUsed,
          githubLink: project.githubLink,
          liveDemoLink: project.liveDemoLink,
          thumbnailImageUrl: project.thumbnailImageUrl,
          portfolioId: info.id
        }, token);
        alert("Project added!");
        setProjectsList([...projectsList, created]);
      }
      setProject({ projectName: "", description: "", technologiesUsed: "", githubLink: "", liveDemoLink: "", thumbnailImageUrl: "" });
    } catch (e: any) {
      console.error("Project submit error:", e);
      alert("Failed to submit project: " + e.message);
    }
  };

  const handleEditProjectClick = (proj: any) => {
    setEditingProjectId(proj.id);
    setProject({
      projectName: proj.projectName || "",
      description: proj.description || "",
      technologiesUsed: proj.technologiesUsed || "",
      githubLink: proj.githubLink || "",
      liveDemoLink: proj.liveDemoLink || "",
      thumbnailImageUrl: proj.thumbnailImageUrl || ""
    });
  };

  const handleCancelEdit = () => {
    setEditingProjectId(null);
    setProject({ projectName: "", description: "", technologiesUsed: "", githubLink: "", liveDemoLink: "", thumbnailImageUrl: "" });
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id, token);
      alert("Project deleted!");
      setProjectsList(projectsList.filter(p => p.id !== id));
      if (editingProjectId === id) {
        handleCancelEdit();
      }
    } catch (e: any) {
      console.error("Project delete error:", e);
      alert("Failed to delete project: " + e.message);
    }
  };


  const handleResumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (existingResume) {
      alert("Please delete the existing resume first.");
      return;
    }
    try {
      if (!resumeFile) return alert("Please select a resume file");
      
      if (resumeFile.size > 500 * 1024) {
        return alert("Resume file size must be less than 500 KB");
      }

      const uploadRes = await uploadFile(resumeFile, token);
      const newResume = await createResume({ ...resume, resumeFileUrl: uploadRes.url }, token);
      alert("Resume uploaded!");
      setExistingResume(newResume);
      setResume({ resumeName: "", resumeFileUrl: "" });
      setResumeFile(null);
      const fileInput = document.getElementById('resumeFileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (e: any) {
      console.error("Resume upload error:", e);
      alert("Failed to upload resume: " + e.message);
    }
  };

  const handleDeleteResume = async () => {
    if (!existingResume || !existingResume.id) return;
    if (!confirm("Are you sure you want to delete the current resume?")) return;
    
    try {
      await deleteResume(existingResume.id, token);
      alert("Resume deleted successfully!");
      setExistingResume(null);
    } catch (e: any) {
      console.error("Resume delete error:", e);
      alert("Failed to delete resume: " + e.message);
    }
  };

  const handleSkillSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.id) {
      alert("Portfolio ID is not loaded yet.");
      return;
    }
    try {
      const created = await createSkill({
        skillName: newSkill.skillName,
        category: newSkill.category,
        portfolioId: info.id
      }, token);
      alert("Skill added!");
      setSkillsList([...skillsList, created]);
      setNewSkill({ skillName: "", category: "Frontend" });
    } catch (e: any) {
      console.error("Skill create error:", e);
      alert("Failed to add skill: " + e.message);
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      await deleteSkill(id, token);
      alert("Skill deleted!");
      setSkillsList(skillsList.filter(s => s.id !== id));
    } catch (e: any) {
      console.error("Skill delete error:", e);
      alert("Failed to delete skill: " + e.message);
    }
  };

  const handleCertificateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.id) {
      alert("Portfolio ID is not loaded yet.");
      return;
    }
    if (!certificateFile) {
      alert("Please select a certificate file (PDF or photo).");
      return;
    }
    try {
      if (certificateFile.size > 10 * 1024 * 1024) {
        return alert("Certificate file size must be less than 10 MB");
      }

      const uploadRes = await uploadFile(certificateFile, token);
      const created = await createCertificate({
        title: newCertificate.title,
        fileUrl: uploadRes.url,
        portfolioId: info.id
      }, token);
      alert("Certificate added!");
      setCertificatesList([...certificatesList, created]);
      setNewCertificate({ title: "" });
      setCertificateFile(null);
      const fileInput = document.getElementById('certFileInput') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (e: any) {
      console.error("Certificate upload error:", e);
      alert("Failed to upload certificate: " + e.message);
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return;
    try {
      await deleteCertificate(id, token);
      alert("Certificate deleted!");
      setCertificatesList(certificatesList.filter(c => c.id !== id));
    } catch (e: any) {
      console.error("Certificate delete error:", e);
      alert("Failed to delete certificate: " + e.message);
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("New password must be at least 6 characters long!");
      return;
    }
    
    setPasswordChangeLoading(true);
    try {
      await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword
      }, token);
      alert("Password changed successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      console.error(err);
      alert("Failed to change password: " + err.message);
    } finally {
      setPasswordChangeLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Admin...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-8 text-slate-800 dark:text-slate-100">Admin Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Update Portfolio Info */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Save size={20}/> Update Basic Info & About Me</h2>
          <form onSubmit={handleInfoSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input type="text" value={info.name || ""} onChange={e => setInfo({...info, name: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input type="text" value={info.title || ""} onChange={e => setInfo({...info, title: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Short Intro</label>
              <input type="text" value={info.shortIntro || ""} onChange={e => setInfo({...info, shortIntro: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">About Me / Description</label>
              <textarea value={info.description || ""} onChange={e => setInfo({...info, description: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input type="email" value={info.email || ""} onChange={e => setInfo({...info, email: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
              <input type="url" value={info.linkedinUrl || ""} onChange={e => setInfo({...info, linkedinUrl: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub URL</label>
              <input type="url" value={info.githubUrl || ""} onChange={e => setInfo({...info, githubUrl: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Profile Photo</label>
              <div className="flex items-center gap-4">
                <input type="file" accept="image/*" onChange={e => setPhotoFile(e.target.files?.[0] || null)} className="text-sm" />
              </div>
              {info.photoUrl && <p className="text-xs mt-2 text-blue-500">Current: {info.photoUrl}</p>}
            </div>
            <Button type="submit" className="w-full">Save Info & Photo</Button>
          </form>
        </section>

        {/* Add / Edit Project */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            {editingProjectId ? <Pencil size={20}/> : <Plus size={20}/>} 
            {editingProjectId ? "Edit Project" : "Add Project"}
          </h2>
          <form onSubmit={handleProjectSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project Title</label>
              <input type="text" value={project.projectName} onChange={e => setProject({...project, projectName: e.target.value})} required className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Project Details</label>
              <textarea value={project.description} onChange={e => setProject({...project, description: e.target.value})} required className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" rows={4} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Technologies Used (comma separated)</label>
              <input type="text" placeholder="React, Node.js, CSS" value={project.technologiesUsed} onChange={e => setProject({...project, technologiesUsed: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Project URL (Demo)</label>
              <input type="url" value={project.liveDemoLink} onChange={e => setProject({...project, liveDemoLink: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">GitHub Link (Source Code)</label>
              <input type="url" placeholder="https://github.com/..." value={project.githubLink} onChange={e => setProject({...project, githubLink: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1" variant={editingProjectId ? "primary" : "outline"}>
                {editingProjectId ? "Update Project" : "Create Project"}
              </Button>
              {editingProjectId && (
                <Button type="button" onClick={handleCancelEdit} variant="outline" className="gap-2">
                  <X size={16}/> Cancel
                </Button>
              )}
            </div>
          </form>
        </section>


        {/* Manage Resume */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Upload size={20}/> Manage Resume</h2>
          
          {existingResume ? (
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">Existing Resume: {existingResume.resumeName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">You must delete the existing resume before uploading a new one.</p>
              </div>
              <Button onClick={handleDeleteResume} variant="destructive" className="mt-4 sm:mt-0 gap-2">
                <Trash2 size={16}/> Delete Resume
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResumeSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-1">Resume Name (e.g. 2024 Tech)</label>
                <input type="text" value={resume.resumeName} onChange={e => setResume({...resume, resumeName: e.target.value})} required className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-medium mb-1">PDF File</label>
                <input id="resumeFileInput" type="file" accept=".pdf,.doc,.docx" onChange={e => setResumeFile(e.target.files?.[0] || null)} required className="text-sm w-full p-2" />
              </div>
              <div className="md:col-span-1">
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Upload Resume</Button>
              </div>
            </form>
          )}
        </section>

        {/* Manage Technical Skills */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Award size={20}/> Manage Technical Skills</h2>
          
          {/* Add Skill Form */}
          <form onSubmit={handleSkillSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Skill Name (e.g. React, Java)</label>
              <input type="text" value={newSkill.skillName} onChange={e => setNewSkill({...newSkill, skillName: e.target.value})} required className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select value={newSkill.category} onChange={e => setNewSkill({...newSkill, category: e.target.value})} className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700">
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Languages">Languages</option>
                <option value="Database">Database</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Add Skill</Button>
            </div>
          </form>

          {/* Skills List */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">Current Skills</h3>
            {skillsList.length === 0 ? (
              <p className="text-slate-500 text-sm">No skills added yet.</p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {skillsList.map((skill: any) => (
                  <span key={skill.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium border border-slate-200 dark:border-slate-700">
                    {skill.skillName} <span className="text-xs text-slate-500">({skill.category})</span>
                    <button type="button" onClick={() => handleDeleteSkill(skill.id)} className="text-red-500 hover:text-red-700 focus:outline-none ml-1" title="Delete Skill">
                      <Trash2 size={14}/>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Manage Projects */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Award size={20}/> Manage Projects</h2>
          {projectsList.length === 0 ? (
            <p className="text-slate-500 text-sm">No projects added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
                    <th className="py-3 px-4 font-semibold">Title</th>
                    <th className="py-3 px-4 font-semibold">Technologies</th>
                    <th className="py-3 px-4 font-semibold">Links</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {projectsList.map((p: any) => (
                    <tr key={p.id} className="text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-4 px-4 font-medium">{p.projectName}</td>
                      <td className="py-4 px-4">
                        <div className="flex flex-wrap gap-1">
                          {p.technologiesUsed ? p.technologiesUsed.split(",").map((tech: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded border border-slate-200 dark:border-slate-700">
                              {tech.trim()}
                            </span>
                          )) : <span className="text-slate-400 text-xs">-</span>}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-3 text-xs text-blue-500">
                          {p.liveDemoLink && <a href={p.liveDemoLink} target="_blank" rel="noreferrer" className="hover:underline">Demo</a>}
                          {p.githubLink && <a href={p.githubLink} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button type="button" onClick={() => handleEditProjectClick(p)} className="p-1 text-blue-500 hover:text-blue-700" title="Edit Project">
                            <Pencil size={16}/>
                          </button>
                          <button type="button" onClick={() => handleDeleteProject(p.id)} className="p-1 text-red-500 hover:text-red-700" title="Delete Project">
                            <Trash2 size={16}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Manage Certificates */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Award size={20}/> Manage Certificates</h2>
          
          {/* Add Certificate Form */}
          <form onSubmit={handleCertificateSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Certificate Title (e.g. AWS Solutions Architect)</label>
              <input type="text" value={newCertificate.title} onChange={e => setNewCertificate({...newCertificate, title: e.target.value})} required className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">File (PDF or Image)</label>
              <input id="certFileInput" type="file" accept=".pdf,image/*" onChange={e => setCertificateFile(e.target.files?.[0] || null)} required className="text-sm w-full p-2" />
            </div>
            <div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Add Certificate</Button>
            </div>
          </form>

          {/* Certificates List */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-slate-700 dark:text-slate-300">Current Certificates</h3>
            {certificatesList.length === 0 ? (
              <p className="text-slate-500 text-sm">No certificates added yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
                      <th className="py-3 px-4 font-semibold">Title</th>
                      <th className="py-3 px-4 font-semibold">File Type</th>
                      <th className="py-3 px-4 font-semibold">Link</th>
                      <th className="py-3 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {certificatesList.map((c: any) => (
                      <tr key={c.id} className="text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="py-4 px-4 font-medium">{c.title}</td>
                        <td className="py-4 px-4">
                          {c.fileUrl.endsWith('.pdf') ? (
                            <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded border border-red-200 dark:border-red-800">
                              PDF
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded border border-green-200 dark:border-green-800">
                              Image
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <a href={c.fileUrl.startsWith('http') ? c.fileUrl : `${backendBaseUrl}${c.fileUrl}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                            View File
                          </a>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button type="button" onClick={() => handleDeleteCertificate(c.id)} className="p-1 text-red-500 hover:text-red-700" title="Delete Certificate">
                            <Trash2 size={16}/>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>

        {/* Contact Messages */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2"><Mail size={20}/> Received Messages</h2>
          {messagesList.length === 0 ? (
            <p className="text-slate-500 text-sm">No messages received yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400 text-sm">
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold">Sender</th>
                    <th className="py-3 px-4 font-semibold">Subject</th>
                    <th className="py-3 px-4 font-semibold">Message</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {messagesList.map((m: any) => (
                    <tr key={m.id} className="text-sm text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-4 px-4 whitespace-nowrap">
                        {m.createdAt ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(m.createdAt)) : '-'}
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium">{m.name}</div>
                        <a href={`mailto:${m.email}`} className="text-xs text-blue-500 hover:underline">{m.email}</a>
                      </td>
                      <td className="py-4 px-4 font-medium">{m.subject}</td>
                      <td className="py-4 px-4 max-w-xs whitespace-pre-wrap break-words">{m.message}</td>
                      <td className="py-4 px-4 text-right">
                        <button type="button" onClick={() => handleDeleteMessage(m.id)} className="p-1 text-red-500 hover:text-red-700" title="Delete Message">
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Change Password / Security Settings */}
        <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">🔐 Security Settings</h2>
          
          <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 max-w-xl">
            <div>
              <label className="block text-sm font-medium mb-1">Current Password</label>
              <input 
                type="password" 
                value={passwordForm.currentPassword} 
                onChange={e => setPasswordForm({...passwordForm, currentPassword: e.target.value})} 
                required 
                className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">New Password</label>
              <input 
                type="password" 
                value={passwordForm.newPassword} 
                onChange={e => setPasswordForm({...passwordForm, newPassword: e.target.value})} 
                required 
                className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm New Password</label>
              <input 
                type="password" 
                value={passwordForm.confirmPassword} 
                onChange={e => setPasswordForm({...passwordForm, confirmPassword: e.target.value})} 
                required 
                className="w-full p-2 rounded border dark:bg-slate-800 dark:border-slate-700" 
              />
            </div>
            <Button 
              type="submit" 
              disabled={passwordChangeLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl pr-6 pl-6"
            >
              {passwordChangeLoading ? "Changing..." : "Change Password"}
            </Button>
          </form>
        </section>

      </div>
    </div>
  );
}
