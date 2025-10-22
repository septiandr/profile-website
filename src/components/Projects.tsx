"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsapInit, gsap } from "@/lib/gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Project = {
  title: string;
  desc: string;
  category: string;
  year?: number;
  href?: string;
  thumb?: string;
  points?: string[];
  stack?: string[];
  id?: string;
};

// Export projects data for use in other components
export const projects: Project[] = [
  {
    id: "ecommerce-perf",
    title: "E-Commerce Performance",
    desc: "Rendering optimization, lazy images, caching.",
    category: "Performance",
    year: 2024,
    href: "/projects/ecommerce-perf",
    thumb: "/globe.svg",
    points: ["+18% conversion", "LCP < 2.5s", "Reduced bounce"],
    stack: ["Next.js", "React", "TailwindCSS", "Vercel"],
  },
  {
    id: "design-system",
    title: "Design System",
    desc: "Tokenized UI library for scale.",
    category: "Design System",
    year: 2023,
    href: "/projects/design-system",
    thumb: "/file.svg",
    points: ["Consistent UI", "Faster delivery", "Docs included"],
    stack: ["Storybook", "React", "TypeScript", "Figma"],
  },
  {
    id: "interactive-landing",
    title: "Interactive Landing",
    desc: "GSAP product storytelling.",
    category: "Marketing",
    year: 2024,
    href: "/projects/interactive-landing",
    thumb: "/window.svg",
    points: ["Higher engagement", "Smooth animations", "Brand impact"],
    stack: ["GSAP", "React", "Framer Motion", "Three.js"],
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    desc: "Real-time charts & data viz.",
    category: "Dashboard",
    year: 2023,
    href: "/projects/analytics-dashboard",
    thumb: "/next.svg",
    points: ["Actionable insights", "Live updates", "Scalable modules"],
    stack: ["D3.js", "React", "Redux", "WebSockets"],
  },
  {
    id: "headless-cms",
    title: "Headless CMS Site",
    desc: "Next.js + CMS integration.",
    category: "Web App",
    year: 2023,
    href: "/projects/headless-cms",
    thumb: "/vercel.svg",
    points: ["Easy publishing", "Preview workflows", "SEO friendly"],
    stack: ["Next.js", "Sanity.io", "GraphQL", "Vercel"],
  },
  {
    id: "a11y-overhaul",
    title: "A11y Overhaul",
    desc: "WCAG fixes & audit.",
    category: "Accessibility",
    year: 2022,
    href: "/projects/a11y-overhaul",
    thumb: "/globe.svg",
    points: ["Inclusive UX", "WCAG AA", "Better retention"],
    stack: ["React", "Axe", "ARIA", "Jest"],
  },
  {
    id: "open-source-lib",
    title: "Open Source Lib",
    desc: "UI utilities published.",
    category: "Open Source",
    year: 2022,
    href: "/projects/open-source-lib",
    thumb: "/file.svg",
    points: ["Community backed", "Typed API", "Well-tested"],
    stack: ["TypeScript", "Rollup", "Jest", "GitHub Actions"],
  },
  {
    id: "marketing-microsite",
    title: "Marketing Microsite",
    desc: "Animated microsite launch.",
    category: "Marketing",
    year: 2021,
    href: "/projects/marketing-microsite",
    thumb: "/window.svg",
    points: ["Campaign boost", "Memorable", "Fast build"],
    stack: ["GSAP", "Vue.js", "Netlify", "Figma"],
  },
  {
    id: "realtime-chat",
    title: "Realtime Chat",
    desc: "Socket-powered messaging.",
    category: "Web App",
    year: 2022,
    href: "/projects/realtime-chat",
    thumb: "/globe.svg",
    points: ["Reliable", "Typing indicator", "Presence"],
    stack: ["Socket.io", "React", "Express", "MongoDB"],
  },
  {
    id: "image-pipeline",
    title: "Image Pipeline",
    desc: "Optimization & CDN.",
    category: "Performance",
    year: 2021,
    href: "/projects/image-pipeline",
    thumb: "/next.svg",
    points: ["Smaller payloads", "CDN cache", "Faster loads"],
    stack: ["Cloudinary", "Next.js", "Sharp", "AWS CloudFront"],
  },
  {
    id: "docs-platform",
    title: "Docs Platform",
    desc: "MDX docs with search.",
    category: "Design System",
    year: 2020,
    href: "/projects/docs-platform",
    thumb: "/file.svg",
    points: ["Searchable", "Versioned", "Developer-friendly"],
    stack: ["MDX", "Next.js", "Algolia", "GitHub"],
  },
  {
    id: "portfolio-v3",
    title: "Portfolio v3",
    desc: "Experimental GSAP narrative.",
    category: "Marketing",
    year: 2025,
    href: "/projects/portfolio-v3",
    thumb: "/window.svg",
    points: ["Story-driven", "Delightful", "Modern stack"],
    stack: ["GSAP", "React", "Next.js", "TailwindCSS"],
  },
];

export default function Projects() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return projects;
  }, []);

  const visibleProjects = filtered;

  useEffect(() => {
    if (!root.current) return;

    const g = gsapInit();
    const ctx = gsap.context(() => {
      // Animate project cards
      g.fromTo(
        ".card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );

      // Add ornaments with animation
      const projectsSection = root.current as HTMLDivElement;

      // Create and append ornaments
      const ornament1 = document.createElement("div");
      ornament1.className =
        "absolute top-20 right-10 w-24 h-24 rounded-full bg-[rgba(var(--primary-rgb),0.08)] blur-md z-0";
      projectsSection.appendChild(ornament1);

      const ornament2 = document.createElement("div");
      ornament2.className =
        "absolute bottom-40 left-10 w-32 h-32 rounded-full bg-[rgba(var(--primary-rgb),0.05)] blur-md z-0";
      projectsSection.appendChild(ornament2);

      const ornament3 = document.createElement("div");
      ornament3.className =
        "absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[rgba(var(--primary-rgb),0.07)] blur-md z-0";
      projectsSection.appendChild(ornament3);

      // Animate ornaments
      g.fromTo(
        [ornament1, ornament2, ornament3],
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
      );

      // Floating animation for ornaments
      g.to(ornament1, {
        x: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      g.to(ornament2, {
        x: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      g.to(ornament3, {
        x: 10,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      // Parallax scroll untuk ornamen
      g.to(ornament1, {
        y: -60,
        scrollTrigger: {
          trigger: projectsSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      g.to(ornament2, {
        y: 80,
        scrollTrigger: {
          trigger: projectsSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      g.to(ornament3, {
        y: -120,
        scrollTrigger: {
          trigger: projectsSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Parallax scroll untuk thumbnail kartu
      const thumbs = Array.from(projectsSection.querySelectorAll(".thumb"));
      thumbs.forEach((el, idx) => {
        g.to(el, {
          y: -100 - idx * 12,
          scrollTrigger: {
            trigger: projectsSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Parallax scroll untuk kartu project (menggunakan yPercent agar tidak bentrok dengan hover y)
      const cards = Array.from(projectsSection.querySelectorAll(".card"));
      cards.forEach((el, idx) => {
        const laneAmount = [-8, -14, -20][idx % 3];
        g.to(el, {
          yPercent: laneAmount,
          scrollTrigger: {
            trigger: projectsSection,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Parallax tambahan untuk judul dan grid agar efek makin terasa
      g.to(".projects .section-title", {
        y: -30,
        scrollTrigger: {
          trigger: projectsSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      g.to(".projects .muted-count", {
        y: -15,
        scrollTrigger: {
          trigger: projectsSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      g.to(".projects .cards-grid", {
        y: -20,
        scrollTrigger: {
          trigger: projectsSection,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Simple hover effect for cards
      document.querySelectorAll(".card").forEach((card: Element) => {
        card.addEventListener("mouseenter", () => {
          g.to(card, { y: -5, duration: 0.3, ease: "power2.out" });
        });

        card.addEventListener("mouseleave", () => {
          g.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        });
      });
    }, root.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="section projects relative overflow-hidden"
      id="projects"
    >
      <div className="container relative z-10">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="section-title">Portfolio</h2>
          <div className="muted-count text-[var(--muted)]">{filtered.length} works</div>
        </div>
        
        <div className=" flex flex-wrap gap-4">
          {visibleProjects.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className="cursor-pointer rounded-lg bg-[rgba(255,255,255,.03)] hover:bg-[rgba(255,255,255,.05)] transition-all duration-300 overflow-hidden shrink-0 w-[220px] sm:w-[260px] md:w-[300px] mx-1 my-1"
              onClick={() => router.push(p.href ?? "#contact")}
            >
              {p.thumb && (
                <div className="thumb relative overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <Image src={p.thumb} alt="Thumbnail" fill className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60"></div>
                  </div>
                </div>
              )}

              <div className="p-2">
                <h3 className="card-title text-[12px] font-medium text-white leading-tight line-clamp-1">{p.title}</h3>
                {p.year && (
                  <span className="text-[10px] text-white/60">{p.year}</span>
                )}
                {p.stack && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {p.stack.map((tech, idx) => (
                      <span key={`${p.title}-tech-${idx}`} className="text-[10px] text-white/80 bg-white/5 px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[var(--primary)] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Enhance filter handler to animate out cards before switching

// Replace filter button onClick: from setFilter(cat) to changeFilter(cat)
