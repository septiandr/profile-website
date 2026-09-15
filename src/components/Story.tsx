"use client";
import { motion } from "framer-motion";

export default function Story() {
  return (
    <motion.section className="section story" id="story" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="container">
        <motion.h2 className="section-title" variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}>STORY</motion.h2>
        <motion.div className="pixel-card story-content" style={{ display: "grid", gap: 10 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}>
          {["It began with curiosity — tinkering with the DOM and CSS.", "When performance mattered, I embraced profiling and optimization.", "As products scaled, I learned architecture, DX, and automation.", "Ultimately, small details create big experiences."].map((text) => (
            <motion.p key={text} style={{ margin: 0 }} variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}>{text}</motion.p>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
