"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsapInit, gsap } from "@/lib/gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projects } from "@/constant/portolio";

export default function Projects() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return projects;
  }, []);

  const visibleProjects = filtered;

  useEffect(() => {
    if (!root.current) return;

    // Safeguard: remove any previously appended ornaments (StrictMode/HMR re-runs)
    const projectsSection = root.current as HTMLDivElement;
    projectsSection.querySelectorAll(".project-orn").forEach((el) => {
      if (el.parentNode === projectsSection) projectsSection.removeChild(el);
    });

    const g = gsapInit();
    const isMobile = () => window.matchMedia("(max-width: 768px)").matches;
    const ctx = gsap.context(() => {
      // Animate project cards (tetap untuk semua layar)
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

      // Ornaments & parallax hanya di desktop untuk performa mobile
      if (!isMobile()) {
        // Create and append ornaments
        const ornament1 = document.createElement("div");
        ornament1.className =
          "project-orn absolute top-20 right-10 w-24 h-24 rounded-full bg-[rgba(var(--primary-rgb),0.08)] blur-md z-0";
        projectsSection.appendChild(ornament1);

        const ornament2 = document.createElement("div");
        ornament2.className =
          "project-orn absolute bottom-40 left-10 w-32 h-32 rounded-full bg-[rgba(var(--primary-rgb),0.05)] blur-md z-0";
        projectsSection.appendChild(ornament2);

        const ornament3 = document.createElement("div");
        ornament3.className =
          "project-orn absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-[rgba(var(--primary-rgb),0.07)] blur-md z-0";
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

        // Float Y
        g.to(ornament1, {
          y: 14,
          duration: 3.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        g.to(ornament2, {
          y: -18,
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        g.to(ornament3, {
          y: 22,
          duration: 4.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Parallax scroll untuk kartu project (desktop saja)
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
      }

      // Reveal per baris seperti di Experience (tetap)
      const cards = Array.from(projectsSection.querySelectorAll(".card"));
      const rowMap = new Map<number, HTMLElement[]>();
      cards.forEach((el) => {
        const top = Math.round((el as HTMLElement).offsetTop);
        const group = rowMap.get(top);
        if (group) group.push(el as HTMLElement);
        else rowMap.set(top, [el as HTMLElement]);
      });

      rowMap.forEach((group) => {
        g.set(group, { autoAlpha: 0, y: 24 });
        g.fromTo(
          group,
          { autoAlpha: 0, y: 24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: {
              trigger: group[0],
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
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

    return () => {
      ctx.revert();
      if (projectsSection) {
        projectsSection.querySelectorAll(".project-orn").forEach((el) => {
          if (el.parentNode === projectsSection)
            projectsSection.removeChild(el);
        });
      }
    };
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
          <div className="muted-count text-[var(--muted)]">
            {filtered.length} works
          </div>
        </div>

        <div className="cards">
          {visibleProjects.map((p, i) => (
            <div
              key={`${p.title}-${i}`}
              className="card glass group cursor-pointer rounded-lg transition-all duration-300 overflow-hidden min-h-[420px]"
            >
              {p.thumb && (
                <div className="thumb relative overflow-hidden">
                  <div className="aspect-[16/9] relative">
                    <Image
                      src={`/porto/${p.thumb}`}
                      alt="Thumbnail"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-60"></div>
                  </div>
                </div>
              )}

              <div className="p-3">
                <div className="flex items-center justify-between">
                  <h3 className="card-title text-[12px] font-medium text-white leading-tight line-clamp-1">
                    {p.title}
                  </h3>
                  {p.year && (
                    <span className="text-[10px] text-white/60">{p.year}</span>
                  )}
                </div>

                {p.category && (
                  <span className="mt-1 inline-block text-[10px] text-white/90 bg-white/5 px-1.5 py-0.5 rounded">
                    {p.category}
                  </span>
                )}

                {p.desc && (
                  <p className="mt-2 text-[11px] text-white/80 leading-snug line-clamp-3">
                    {p.desc}
                  </p>
                )}

                {p.points && (
                  <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-1">
                    {p.points.map((point, idx) => (
                      <li
                        key={`${p.title}-pt-${idx}`}
                        className="flex items-start gap-1.5 text-[11px] text-white/80"
                      >
                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/10 text-white/80 text-[10px] shrink-0">
                          ✓
                        </span>
                        <span className="line-clamp-1">{point}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {p.stack && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.stack.map((tech, idx) => (
                      <span
                        key={`${p.title}-tech-${idx}`}
                        className="text-[10px] text-white/80 bg-white/5 px-1.5 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {p.id && (
                  <div className="mt-2 text-[10px] text-white/50">
                    ID: {p.id}
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
