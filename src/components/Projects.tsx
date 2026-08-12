"use client";
import React, { useEffect, useRef } from "react";
import { gsapInit, gsap } from "@/lib/gsap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { projects } from "@/constant/portolio";

const RIBBON_COLORS = ["#e52521", "#2456d0", "#3aa43a", "#b8860b", "#8e44ad", "#1d8a99"];

export default function Projects() {
  const router = useRouter();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const g = gsapInit();
    const ctx = gsap.context(() => {
      g.fromTo(
        ".cartridge",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        }
      );
    }, root.current!);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="section projects" id="projects">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title">SELECT A GAME</h2>
          <div className="muted pixel" style={{ fontSize: 10 }}>
            {projects.length} TITLES
          </div>
        </div>
        <p className="muted" style={{ marginTop: -18 }}>
          GAME LIBRARY — pick a cartridge to view its playthrough.
        </p>

        <div className="cards" style={{ marginTop: 24 }}>
          {projects.map((p, i) => (
            <article
              key={`${p.title}-${i}`}
              className="cartridge"
              role="link"
              tabIndex={0}
              aria-label={`Open project ${p.title}`}
              onClick={() => router.push(p.href || `/projects/${p.id ?? ""}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push(p.href || `/projects/${p.id ?? ""}`);
                }
              }}
            >
              <div className="cart-ribbon" style={{ background: RIBBON_COLORS[i % RIBBON_COLORS.length] }}>
                <h3 className="cart-title">{p.title}</h3>
                {p.year && <span className="cart-year">{p.year}</span>}
              </div>

              {p.thumb && (
                <div className="cart-thumb">
                  <Image
                    src={`/porto/${p.thumb}`}
                    alt={`Thumbnail of ${p.title}`}
                    fill
                    sizes="(max-width: 620px) 100vw, (max-width: 900px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="cart-body">
                {p.category && <span className="chip cart-cat">{p.category}</span>}
                <p className="cart-desc">{p.desc}</p>
                {p.stack && (
                  <div className="cart-stack">
                    {p.stack.slice(0, 4).map((tech, idx) => (
                      <span key={`${p.title}-tech-${idx}`} className="chip">
                        {tech}
                      </span>
                    ))}
                    {p.stack.length > 4 && (
                      <span className="chip">+{p.stack.length - 4}</span>
                    )}
                  </div>
                )}
                <span className="cart-play pixel">▶ PLAY</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
