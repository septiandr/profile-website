"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { experience } from "@/constant/experience";

export default function Experience() {
  const root = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: root, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 });

  return (
    <section ref={root} className="section experience" id="experience">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">QUESTS</h2>
          <div className="section-progress">
            <motion.div className="bar" style={{ scaleX: progress, transformOrigin: "left" }} />
          </div>
        </div>
        <p className="muted" style={{ marginTop: -18 }}>
          QUEST LOG — completed missions from my career journey.
        </p>

        <ul className="quests" style={{ marginTop: 22 }}>
          {experience.map((s, i) => (
            <motion.li key={i} className="quest" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: i * 0.06 }}>
              <div className="quest-head">
                <span className="quest-icon">⭐</span>
                <div style={{ minWidth: 0 }}>
                  <h3 className="quest-role">
                    {s.role} <span style={{ color: "var(--muted)" }}>@ {s.company}</span>
                  </h3>
                  {s.title && <p className="quest-company">{s.title}</p>}
                </div>
                <span className="quest-no">QUEST {String(i + 1).padStart(2, "0")}</span>
              </div>

              <div className="quest-meta">
                <span>📅 {s.period}</span>
                {s.location && <span>📍 {s.location}</span>}
              </div>

              {s.desc && <p className="quest-desc">{s.desc}</p>}

              {s.highlights && (
                <motion.div className="quest-rewards" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                  <span className="reward-label pixel">REWARDS</span>
                  <ul>
                    {s.highlights.map((point, idx) => (
                      <motion.li key={`hl-${i}-${idx}`} variants={{ hidden: { opacity: 0, x: -12 }, visible: { opacity: 1, x: 0 } }} transition={{ delay: idx * 0.05 }}>{point}</motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {s.tech && (
                <motion.div className="quest-stack" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}>
                  {s.tech.map((t, idx) => (
                    <motion.span key={`tech-${i}-${idx}`} className="chip" variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}>
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
