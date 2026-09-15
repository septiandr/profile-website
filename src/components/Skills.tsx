"use client";
import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

type Kind = "front" | "back" | "mobile" | "tool";

const KIND_COLORS: Record<Kind, string> = {
  front: "#e52521",
  back: "#2456d0",
  mobile: "#3aa43a",
  tool: "#b8860b",
};

const KIND_LABEL: Record<Kind, string> = {
  front: "FRONTEND",
  back: "BACKEND",
  mobile: "MOBILE",
  tool: "TOOLS",
};

const skills: { name: string; icon: string; kind: Kind }[] = [
  { name: "Next.js", icon: "🚀", kind: "front" },
  { name: "React", icon: "⚛️", kind: "front" },
  { name: "TypeScript", icon: "🟦", kind: "front" },
  { name: "Framer Motion", icon: "✨", kind: "front" },
  { name: "CSS", icon: "🎨", kind: "front" },
  { name: "JavaScript", icon: "🟨", kind: "front" },
  { name: "Tailwind CSS", icon: "🌊", kind: "front" },
  { name: "HTML", icon: "📄", kind: "front" },
  { name: "Bootstrap", icon: "🅱️", kind: "front" },
  { name: "Node.js", icon: "🟢", kind: "back" },
  { name: "Express.js", icon: "🚂", kind: "back" },
  { name: "PostgreSQL", icon: "🐘", kind: "back" },
  { name: "MySQL", icon: "🗄️", kind: "back" },
  { name: "Firebase", icon: "🔥", kind: "back" },
  { name: "GraphQL", icon: "🕸️", kind: "back" },
  { name: "Socket.io", icon: "🔌", kind: "back" },
  { name: "Python", icon: "🐍", kind: "back" },
  { name: "RESTful API", icon: "🔗", kind: "back" },
  { name: "React Native", icon: "📱", kind: "mobile" },
  { name: "Flutter", icon: "🦋", kind: "mobile" },
  { name: "Dart", icon: "🎯", kind: "mobile" },
  { name: "Git", icon: "🐙", kind: "tool" },
  { name: "Jest", icon: "🧪", kind: "tool" },
  { name: "RTL", icon: "🧩", kind: "tool" },
  { name: "Performance", icon: "⚡", kind: "tool" },
  { name: "JSON", icon: "📦", kind: "tool" },
];

export default function Skills() {
  const root = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: root, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.2 });

  return (
    <section ref={root} className="section skills" id="skills">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">SKILLS</h2>
          <div className="section-progress">
            <motion.div className="bar" style={{ scaleX: progress, transformOrigin: "left" }} />
          </div>
        </div>
        <p className="muted" style={{ marginTop: -18 }}>
          OPEN INVENTORY — every item is a tool in the quest to ship great software.
        </p>

        <div className="inventory" style={{ marginTop: 22 }}>
          {skills.map((s, i) => (
            <motion.div key={`${s.name}-${i}`} className="item-box" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.35, delay: i * 0.03 }} whileHover={{ y: -5, scale: 1.04 }}>
              <span
                className="item-icon"
                style={{ background: KIND_COLORS[s.kind] }}
              >
                {s.icon}
              </span>
              <span className="item-name">{s.name}</span>
              <span className="item-kind">{KIND_LABEL[s.kind]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
