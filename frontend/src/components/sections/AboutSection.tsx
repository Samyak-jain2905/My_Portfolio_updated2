"use client";

import React from "react";
import { motion } from "framer-motion";

export function AboutSection({ description }: { description?: string }) {
  const defaultText = `Final-year Computer Engineering student passionate about building secure, scalable backend systems using Java and Spring Boot. I enjoy solving real-world problems by designing and developing RESTful APIs and backend services with a strong focus on performance, security, and clean architecture. I have hands-on experience with Java, Spring Boot, SQL, and foundational AWS services, and I actively practice Data Structures & Algorithms to sharpen my problem-solving abilities. I have worked on implementing authentication and authorization using Spring Security, JWT-based authentication, and OAuth2, ensuring secure access control and role-based authorization in backend applications. What I bring to the table: • Java backend development using Spring Boot • RESTful APIs, MVC architecture, and clean code practices • Spring Security, JWT, and OAuth2 authentication • Strong foundation in Data Structures & Algorithms and OOP • Database design and queries using SQL • AWS Cloud Foundations Certified • Familiarity with version control (Git) and collaborative development`;

  return (
    <section id="about" className="py-16 md:py-24 relative z-10">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            <span className="text-white">About</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-400">Me</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed md:leading-loose text-center">
            {description || defaultText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
