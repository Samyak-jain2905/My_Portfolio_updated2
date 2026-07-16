"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { API_URL } from "@/lib/api";
import { MapPin, Mail, Phone, Users, Code2, Clock, Send } from "lucide-react";

export default function ContactClient({ portfolio }: { portfolio?: any }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Failed to send");
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const contactInfo = [
    { icon: <Mail className="text-cyan-400" size={20} />, label: "Email", value: portfolio?.email || "hello@example.com" },
    { icon: <Phone className="text-violet-400" size={20} />, label: "Phone", value: "+91 7489470244" },
    { icon: <MapPin className="text-cyan-400" size={20} />, label: "Location", value: "Indore, India" },
    { icon: <Clock className="text-violet-400" size={20} />, label: "Availability", value: "Open to Work" },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="premium-card p-8 rounded-[2rem] relative flex flex-col gap-6">
        <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
        
        {status === "success" && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-500/90 text-white border border-green-400 px-4 py-2 rounded-full text-sm font-semibold shadow-md whitespace-nowrap">
            Message sent successfully!
          </div>
        )}
        {status === "error" && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500/90 text-white border border-red-400 px-4 py-2 rounded-full text-sm font-semibold shadow-md whitespace-nowrap">
            Failed to send message. Please try again.
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-slate-300">Name</label>
            <input id="name" required name="name" value={formData.name} onChange={handleChange} type="text" suppressHydrationWarning className="w-full px-4 py-3 border rounded-xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-slate-500 backdrop-blur-sm" placeholder="John Doe" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-slate-300">Email</label>
            <input id="email" required name="email" value={formData.email} onChange={handleChange} type="email" suppressHydrationWarning className="w-full px-4 py-3 border rounded-xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-slate-500 backdrop-blur-sm" placeholder="john@example.com" />
          </div>
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-2 text-slate-300">Subject</label>
          <input id="subject" required name="subject" value={formData.subject} onChange={handleChange} type="text" suppressHydrationWarning className="w-full px-4 py-3 border rounded-xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-slate-500 backdrop-blur-sm" placeholder="Project Inquiry" />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2 text-slate-300">Message</label>
          <textarea id="message" required name="message" value={formData.message} onChange={handleChange} rows={5} suppressHydrationWarning className="w-full px-4 py-3 border rounded-xl bg-white/5 border-white/10 text-white focus:ring-2 focus:ring-violet-500 outline-none transition-all placeholder:text-slate-500 backdrop-blur-sm resize-none" placeholder="Your message here..." />
        </div>
        
        <Button type="submit" disabled={status === "loading"} className="w-full bg-violet-600 hover:bg-violet-500 text-white rounded-xl py-6 shadow-[0_0_15px_rgba(124,58,237,0.4)] text-lg transition-all group mt-2">
          {status === "loading" ? "Sending..." : (
            <span className="flex items-center gap-2">
              Send Message <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          )}
        </Button>
      </form>

      {/* Contact Info */}
      <div className="flex flex-col gap-6 justify-center">
        <div className="premium-card p-8 rounded-[2rem]">
          <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={idx} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-violet-500/30 transition-all">
                  {info.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-400">{info.label}</p>
                  <p className="text-white font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <a href={portfolio?.linkedinUrl || "#"} target={portfolio?.linkedinUrl ? "_blank" : undefined} rel="noreferrer" className="premium-card p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#0077b5]/20 group-hover:text-[#0077b5] group-hover:border-[#0077b5]/50 transition-all text-slate-300">
              <Users size={24} />
            </div>
            <span className="text-white font-medium">LinkedIn</span>
          </a>
          <a href={portfolio?.githubUrl || "#"} target={portfolio?.githubUrl ? "_blank" : undefined} rel="noreferrer" className="premium-card p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white group-hover:border-white/50 transition-all text-slate-300">
              <Code2 size={24} />
            </div>
            <span className="text-white font-medium">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
