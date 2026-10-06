"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const METRICS = [
  {
    target: 4,
    decimals: 0,
    prefix: "",
    suffix: "+ YEARS",
    display: "4+ YEARS",
    label: "ENGINEERING LEADERSHIP",
    detail: "Leading frontend delivery across enterprise flagships",
    color: "border-blue-500",
    textGradient: "text-blue-600",
    bgTint: "bg-blue-50/50",
    badge: "bg-blue-100 text-blue-950",
  },
  {
    target: 10,
    decimals: 0,
    prefix: "",
    suffix: "+ SYSTEMS",
    display: "10+ SYSTEMS",
    label: "ENTERPRISE PLATFORMS",
    detail: "Fintech, live IoT telemetry, loyalty & POS runtimes",
    color: "border-emerald-500",
    textGradient: "text-emerald-600",
    bgTint: "bg-emerald-50/50",
    badge: "bg-emerald-100 text-emerald-950",
  },
  {
    target: 99.8,
    decimals: 1,
    prefix: "",
    suffix: "% SLA",
    display: "99.8% SLA",
    label: "CRASH-FREE STABILITY",
    detail: "Nationwide Casion EV charging & bank debit security",
    color: "border-orange-500",
    textGradient: "text-orange-600",
    bgTint: "bg-orange-50/50",
    badge: "bg-orange-100 text-orange-950",
  },
  {
    target: 100,
    decimals: 0,
    prefix: "",
    suffix: "%",
    display: "100%",
    label: "BINUS CS GRADUATE",
    detail: "Bachelor of Computer Science in Software Architecture",
    color: "border-purple-500",
    textGradient: "text-purple-600",
    bgTint: "bg-purple-50/50",
    badge: "bg-purple-100 text-purple-950",
  },
];

export default function MagazineMetricsStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const metricBlocks = gsap.utils.toArray<HTMLElement>(".mag-metric-block");
      metricBlocks.forEach((block, idx) => {
        const metric = METRICS[idx];
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        // Block entrance
        tl.fromTo(
          block,
          { y: 60, opacity: 0.15, scale: 0.94 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: idx * 0.08,
            ease: "power3.out",
          }
        );

        // Counter number count-up animation
        const numEl = block.querySelector<HTMLElement>(".mag-metric-num");
        if (numEl && metric) {
          const counterObj = { val: 0 };
          tl.fromTo(
            numEl,
            { scale: 0.75, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)" },
            "-=0.4"
          ).to(
            counterObj,
            {
              val: metric.target,
              duration: 1.2,
              ease: "power2.out",
              onUpdate: () => {
                const formatted = metric.decimals > 0
                  ? counterObj.val.toFixed(metric.decimals)
                  : Math.round(counterObj.val).toString();
                numEl.innerText = `${metric.prefix}${formatted}${metric.suffix}`;
              },
            },
            "-=0.3"
          );
        }

        // Label and detail text reveals
        const labelEl = block.querySelector(".mag-metric-label");
        if (labelEl) {
          tl.fromTo(
            labelEl,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.8"
          );
        }

        const detailEl = block.querySelector(".mag-metric-detail");
        if (detailEl) {
          tl.fromTo(
            detailEl,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
            "-=0.7"
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#faf9f6] border-b border-zinc-950/15 py-12 sm:py-16 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        
        {/* Eyebrow Label */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-zinc-950/15 font-sans text-xs tracking-wider uppercase text-zinc-600 font-bold">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            <span>AGENCY BENCHMARKS & VERIFIED PRODUCTION IMPACT</span>
          </span>
          <span className="hidden sm:inline px-2.5 py-0.5 bg-zinc-200 text-zinc-900 rounded font-extrabold text-[10px]">
            AUDITED 2022 — 2026
          </span>
        </div>

        {/* 4 Metric Counter Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className={`mag-metric-block border border-zinc-950/15 bg-white p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 rounded-sm flex flex-col justify-between border-t-4 will-change-transform ${metric.color} ${metric.bgTint}`}
            >
              <div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider inline-block mb-3 ${metric.badge}`}>
                  INDEX 0{idx + 1}
                </span>

                <div className={`mag-metric-num font-display font-black text-3xl sm:text-4xl uppercase tracking-tight will-change-transform ${metric.textGradient}`}>
                  {metric.display}
                </div>

                <div className="mag-metric-label font-sans text-xs font-extrabold text-zinc-950 uppercase tracking-wider mt-2 mb-1">
                  {metric.label}
                </div>
              </div>

              <p className="mag-metric-detail font-sans text-xs text-zinc-600 font-medium leading-relaxed pt-3 border-t border-zinc-200/80 mt-3">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
