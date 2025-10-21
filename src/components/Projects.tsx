"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsapInit, gsap } from "@/lib/gsap";
import Image from "next/image";

type Project = {
  title: string;
  desc: string;
  category: string;
  year?: number;
  href?: string;
  thumb?: string;
  points?: string[];
};

const projects: Project[] = [
  {
    title: "E-Commerce Performance",
    desc: "Rendering optimization, lazy images, caching.",
    category: "Performance",
    year: 2024,
    href: "#contact",
    thumb: "/globe.svg",
    points: ["+18% conversion", "LCP < 2.5s", "Reduced bounce"]
  },
  {
    title: "Design System",
    desc: "Tokenized UI library for scale.",
    category: "Design System",
    year: 2023,
    href: "#contact",
    thumb: "/file.svg",
    points: ["Consistent UI", "Faster delivery", "Docs included"]
  },
  {
    title: "Interactive Landing",
    desc: "GSAP product storytelling.",
    category: "Marketing",
    year: 2024,
    href: "#contact",
    thumb: "/window.svg",
    points: ["Higher engagement", "Smooth animations", "Brand impact"]
  },
  {
    title: "Analytics Dashboard",
    desc: "Real-time charts & data viz.",
    category: "Dashboard",
    year: 2023,
    href: "#contact",
    thumb: "/next.svg",
    points: ["Actionable insights", "Live updates", "Scalable modules"]
  },
  {
    title: "Headless CMS Site",
    desc: "Next.js + CMS integration.",
    category: "Web App",
    year: 2023,
    href: "#contact",
    thumb: "/vercel.svg",
    points: ["Easy publishing", "Preview workflows", "SEO friendly"]
  },
  {
    title: "A11y Overhaul",
    desc: "WCAG fixes & audit.",
    category: "Accessibility",
    year: 2022,
    href: "#contact",
    thumb: "/globe.svg",
    points: ["Inclusive UX", "WCAG AA", "Better retention"]
  },
  {
    title: "Open Source Lib",
    desc: "UI utilities published.",
    category: "Open Source",
    year: 2022,
    href: "#contact",
    thumb: "/file.svg",
    points: ["Community backed", "Typed API", "Well-tested"]
  },
  {
    title: "Marketing Microsite",
    desc: "Animated microsite launch.",
    category: "Marketing",
    year: 2021,
    href: "#contact",
    thumb: "/window.svg",
    points: ["Campaign boost", "Memorable", "Fast build"]
  },
  {
    title: "Realtime Chat",
    desc: "Socket-powered messaging.",
    category: "Web App",
    year: 2022,
    href: "#contact",
    thumb: "/globe.svg",
    points: ["Reliable", "Typing indicator", "Presence"]
  },
  {
    title: "Image Pipeline",
    desc: "Optimization & CDN.",
    category: "Performance",
    year: 2021,
    href: "#contact",
    thumb: "/next.svg",
    points: ["Smaller payloads", "CDN cache", "Faster loads"]
  },
  {
    title: "Docs Platform",
    desc: "MDX docs with search.",
    category: "Design System",
    year: 2020,
    href: "#contact",
    thumb: "/file.svg",
    points: ["Searchable", "Versioned", "Developer-friendly"]
  },
  {
    title: "Portfolio v3",
    desc: "Experimental GSAP narrative.",
    category: "Marketing",
    year: 2025,
    href: "#contact",
    thumb: "/window.svg",
    points: ["Story-driven", "Delightful", "Modern stack"]
  },
];

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

export default function Projects() {
  const root = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const [filter, setFilter] = useState<string>("All");
  const [visible, setVisible] = useState<number>(6);

  const filtered = useMemo(() => {
    return filter === "All" ? projects : projects.filter((p) => p.category === filter);
  }, [filter]);

  const visibleProjects = filtered.slice(0, visible);
  const canLoadMore = visible < filtered.length;

  useEffect(() => {
    const g = gsapInit();
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".projects .card");
      g.from(cards, {
        y: 24,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
        },
      });

      // Hover parallax for cards
      cards.forEach((card) => {
        const onMove = (e: PointerEvent) => {
          const rect = card.getBoundingClientRect();
          const mx = e.clientX - rect.left - rect.width / 2;
          const my = e.clientY - rect.top - rect.height / 2;
          gsap.to(card, { duration: 0.3, x: mx * 0.04, y: my * 0.04, scale: 1.02, ease: "power2.out" });
          const thumb = card.querySelector<HTMLElement>(".thumb");
          if (thumb) gsap.to(thumb, { duration: 0.3, x: mx * 0.06, y: my * 0.06, ease: "power2.out" });
        };
        const onLeave = () => {
          gsap.to(card, { duration: 0.4, x: 0, y: 0, scale: 1, ease: "power3.out" });
          const thumb = card.querySelector<HTMLElement>(".thumb");
          if (thumb) gsap.to(thumb, { duration: 0.4, x: 0, y: 0, ease: "power3.out" });
        };
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
      });

      // Animated filter underline
      const moveUnderline = () => {
        const container = filtersRef.current;
        const underline = underlineRef.current;
        if (!container || !underline) return;
        const activeBtn = container.querySelector<HTMLButtonElement>(`button[data-cat='${filter}']`);
        if (!activeBtn) return;
        const cRect = container.getBoundingClientRect();
        const rect = activeBtn.getBoundingClientRect();
        const x = rect.left - cRect.left;
        g.to(underline, { x, width: rect.width, duration: 0.3, ease: "power3.out" });
      };
      moveUnderline();
      window.addEventListener("resize", moveUnderline);

    }, root);
    return () => ctx.revert();
  }, [filter, visible]);

  return (
    <section ref={root} className="section projects" id="projects">
      <div className="container">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="section-title">Portfolio</h2>
          <div className="text-[var(--muted)]">{filtered.length} works</div>
        </div>

        <div className="mb-6" ref={filtersRef}>
          <div className="flex flex-wrap gap-2 relative">
            {categories.map((c) => (
              <button
                key={c}
                data-cat={c}
                onClick={() => { setFilter(c); setVisible(6); }}
                className={`px-3 py-2 rounded-md border transition-colors ${
                  filter === c
                    ? "text-[var(--text)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                } border-[var(--border)] bg-[rgba(255,255,255,.03)] hover:bg-[rgba(255,255,255,.06)]`}
              >
                {c}
              </button>
            ))}
            <span ref={underlineRef} className="absolute bottom-[-2px] left-0 h-[2px] bg-[var(--primary)] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleProjects.map((p, i) => (
            <article
              key={`${p.title}-${i}`}
              className="card group cursor-pointer border border-[var(--border)] rounded-xl bg-gradient-to-b from-[rgba(255,255,255,.03)] to-[rgba(255,255,255,.01)] p-4 hover:shadow-glow hover:translate-y-[-2px] transition will-change-transform"
            >
              {p.thumb && (
                <div className="thumb mb-3 rounded-lg overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,.02)]">
                  <div className="aspect-[16/9] relative">
                    <Image src={p.thumb} alt="Thumbnail" fill className="object-contain p-3" />
                  </div>
                </div>
              )}

              <div className="flex items-start justify-between">
                <h3 className="card-title text-lg font-semibold">{p.title}</h3>
                {p.year && (
                  <span className="text-sm text-[var(--muted)]">{p.year}</span>
                )}
              </div>
              <p className="card-desc text-[var(--muted)]">{p.desc}</p>

              {p.points && (
                <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
                  {p.points.map((pt, idx) => (
                    <li key={idx} className="before:content-['•'] before:mr-1 before:text-[var(--primary)]">{pt}</li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex gap-2">
                <a href={p.href ?? "#contact"} className="btn">View case study</a>
                <a href="#contact" className="btn">Hire me</a>
              </div>

              <div className="mt-3 text-xs text-[var(--muted)]">{p.category}</div>
            </article>
          ))}
        </div>

        {canLoadMore && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setVisible((v) => Math.min(v + 6, filtered.length))}
              className="btn"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}