"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { projects } from "@/constant/portolio";

export default function ProjectDetail() {
  const { id } = useParams();
  const root = useRef<HTMLElement>(null);

  const project = projects.find((p) => p?.id === id);

  if (!project) {
    return (
      <section className="section min-h-screen flex items-center justify-center">
        <div className="container text-center">
          <h1 className="section-title">GAME NOT FOUND</h1>
          <p className="muted mb-6">The cartridge you&apos;re looking for doesn’t exist.</p>
          <Link href="/#projects" className="btn btn-blue">
            ◀ BACK TO GAMES
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={root} className="section project-detail min-h-screen pt-32">
      <div className="container">
        {/* Back button */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 mb-8 pixel"
          style={{ fontSize: 11, color: "var(--text)", background: "var(--cream)", border: "3px solid var(--dark)", boxShadow: "4px 4px 0 rgba(28,28,60,.6)", padding: "10px 14px" }}
        >
          ◀ BACK TO GAME SELECT
        </Link>

        <motion.div className="project-header mb-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
            <h1 className="pixel" style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: "#fff", textShadow: "4px 4px 0 var(--dark)", margin: 0 }}>
              {project.title}
            </h1>
            {project.year && (
              <span className="chip">{project.year}</span>
            )}
          </div>

          <motion.div className="flex flex-wrap gap-2 mb-8" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } } }}>
            {project.stack?.map((tech: string, idx: number) => (
              <motion.span key={idx} className="chip tech-tag" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {project.thumb && (
            <motion.div className="nes-frame mb-8" style={{ padding: 12 }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.45 }}>
              <div className="aspect-[16/9] relative overflow-hidden" style={{ border: "3px solid var(--dark)" }}>
                <Image
                  src={`/porto/${project.thumb}`}
                  alt={project.title}
                  fill
                  className="object-contain"
                  style={{ imageRendering: "pixelated", padding: 8 }}
                />
              </div>
            </motion.div>
          )}
        </motion.div>

        <motion.div className="project-content grid grid-cols-1 md:grid-cols-3 gap-8" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <div className="md:col-span-2" style={{ display: "grid", gap: 20 }}>
            <div className="pixel-card">
              <h2 className="pixel" style={{ fontSize: 13, margin: "0 0 10px", color: "var(--red)" }}>
                ▶ PROJECT OVERVIEW
              </h2>
              <p style={{ margin: 0 }}>{project.desc}</p>
            </div>

            <div className="pixel-card">
              <h2 className="pixel" style={{ fontSize: 13, margin: "0 0 10px", color: "var(--blue)" }}>
                ▶ CHALLENGE &amp; SOLUTION
              </h2>
              <p style={{ margin: 0 }}>
                The mission: ship a {project.category.toLowerCase()} solution that stands out
                in a competitive market. Using {project.stack?.slice(0, 4).join(", ")} and
                best practices, the client got a product that exceeded expectations.
              </p>
            </div>

            <div className="pixel-card">
              <h2 className="pixel" style={{ fontSize: 13, margin: "0 0 10px", color: "var(--green)" }}>
                ▶ KEY RESULTS
              </h2>
              {project.points && (
                <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
                  {project.points.map((point: string, idx: number) => (
                    <li key={idx} style={{ display: "flex", gap: 8 }}>
                      <span style={{ color: "var(--green)" }}>►</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="pixel-card" style={{ position: "sticky", top: 84 }}>
              <h3 className="pixel" style={{ fontSize: 12, margin: "0 0 14px" }}>
                PROJECT DATA
              </h3>

              <div className="mb-4">
                <h4 className="pixel" style={{ fontSize: 9, color: "var(--muted)", margin: "0 0 4px" }}>
                  CATEGORY
                </h4>
                <p style={{ margin: 0 }}>{project.category}</p>
              </div>

              <div className="mb-4">
                <h4 className="pixel" style={{ fontSize: 9, color: "var(--muted)", margin: "0 0 4px" }}>
                  YEAR
                </h4>
                <p style={{ margin: 0 }}>{project.year}</p>
              </div>

              <div className="mb-6">
                <h4 className="pixel" style={{ fontSize: 9, color: "var(--muted)", margin: "0 0 8px" }}>
                  TECHNOLOGIES
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {project.stack?.map((tech: string, idx: number) => (
                    <span key={idx} className="chip" style={{ fontSize: 7 }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/#contact"
                className="btn btn-yellow"
                style={{ display: "block", textAlign: "center" }}
              >
                HIRE ME FOR THIS QUEST
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
