"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/#home", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#projects", label: "Projects" },
  { href: "/#resume", label: "Resume" },
  { href: "/#certificates", label: "Certificates" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("#home");

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      if (pathname === "/") {
        const sections = links.map(link => link.href.substring(2)); // remove '/#'
        let currentSection = "home";
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // If the top of the section is near the top of the viewport
            if (rect.top <= 100 && rect.bottom >= 100) {
              currentSection = section;
            }
          }
        }
        setActiveSection(`/#${currentSection}`);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Check auth status
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
    } else {
      setIsLoggedIn(false);
      setRole(null);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
    window.location.href = "/";
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <header
        className={cn(
          "w-full transition-all duration-300 flex items-center border-b border-transparent",
          isScrolled
            ? "h-[60px] bg-[#09090B]/60 backdrop-blur-[20px] border-white/5 shadow-xl shadow-black/20"
            : "h-[80px] bg-transparent"
        )}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/#home" className="text-xl font-extrabold tracking-tighter flex items-center gap-2" onClick={() => setActiveSection("/#home")}>
            <span className="text-white">My</span><span className="text-violet-500">Portfolio</span>
          </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-white",
                  isActive ? "text-white" : "text-slate-400"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <ThemeToggle />
          
          <div className="flex items-center gap-2 border-l border-slate-700 dark:border-slate-700 pl-6 ml-2">
            {isLoggedIn ? (
              <>
                {role === "ADMIN" && (
                  <Link href="/admin" className="text-sm font-medium text-violet-400 hover:text-violet-300 dark:text-violet-400 dark:hover:text-violet-300 transition-colors">
                    Dashboard
                  </Link>
                )}
                <button onClick={handleLogout} className="text-sm font-medium text-red-400 hover:text-red-300 dark:text-red-400 dark:hover:text-red-300 transition-colors ml-4">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-violet-400 dark:text-slate-300 dark:hover:text-violet-400 transition-colors">
                  Log in
                </Link>
                <Link href="/register" className="text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-full transition-colors">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-100 dark:text-gray-100"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden glass-panel border-b border-white/5 dark:border-white/5"
          >
            <nav className="flex flex-col px-4 py-4 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setActiveSection(link.href);
                  }}
                  className={cn(
                    "block text-base font-medium",
                    activeSection === link.href
                      ? "text-violet-400 dark:text-violet-400"
                      : "text-slate-300 dark:text-slate-300"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="border-t border-slate-700 dark:border-slate-700 pt-4 mt-2 flex flex-col gap-4">
                {isLoggedIn ? (
                  <>
                    {role === "ADMIN" && (
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-violet-400 dark:text-violet-400">
                        Dashboard
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="block text-left text-base font-medium text-red-400 dark:text-red-400">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-slate-300 dark:text-slate-300">
                      Log in
                    </Link>
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block text-center text-base font-medium bg-violet-600 text-white py-2 rounded-lg mt-2">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </div>
  );
}
