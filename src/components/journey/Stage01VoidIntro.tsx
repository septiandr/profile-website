"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, Compass } from "lucide-react";

interface Stage01Props {
  onEngineHover?: (hovered: boolean) => void;
  onEnterJourney?: () => void;
}

export default function Stage01VoidIntro({
  onEngineHover,
  onEnterJourney,
}: Stage01Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeTextRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic slow entrance
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(welcomeTextRef.current, {
        opacity: 0,
        y: 15,
        duration: 1.8,
        delay: 0.5,
      })
        .from(
          titleRef.current?.querySelectorAll(".title-part") || [],
          {
            opacity: 0,
            y: 35,
            stagger: 0.3,
            duration: 1.6,
          },
          "-=1.0"
        )
        .from(
          subtextRef.current,
          {
            opacity: 0,
            y: 15,
            duration: 1.4,
          },
          "-=0.8"
        )
        .from(
          ctaRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 1.2,
          },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnter = () => {
    onEnterJourney?.();
    const nextSection = document.getElementById("zone-experience");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="zone-void"
      ref={containerRef}
      className="relative min-h-[140vh] w-full flex flex-col justify-between items-center px-6 pt-36 pb-20 select-none pointer-events-none"
    >
      {/* Editorial Cinematic Headline */}
      <div className="text-center max-w-4xl mx-auto z-10 pointer-events-auto">
        <div
          ref={welcomeTextRef}
          className="font-mono text-[11px] tracking-[0.35em] text-zinc-400 uppercase mb-6"
        >
          WELCOME TO
        </div>

        <h1
          ref={titleRef}
          className="font-sans font-light tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-zinc-100 uppercase leading-[0.98] mb-6"
        >
          <span className="title-part block font-bold tracking-tighter text-white">
            RISANGGALIH
          </span>
          <span className="title-part block text-zinc-400 font-extralight tracking-widest text-3xl sm:text-5xl md:text-6xl mt-1">
            PORTFOLIO
          </span>
        </h1>

        <p
          ref={subtextRef}
          className="font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.25em] uppercase"
        >
          Software Engineer
        </p>
      </div>

      {/* Center Interactive prompt */}
      <div className="font-mono text-[11px] text-zinc-500 tracking-widest uppercase my-auto hidden sm:block">
        [ MOVE CURSOR TO INSPECT VESSEL ]
      </div>

      {/* Primary Takeoff Action */}
      <div className="z-10 pointer-events-auto flex flex-col items-center gap-4">
        <button
          ref={ctaRef}
          onClick={handleEnter}
          onMouseEnter={() => onEngineHover?.(true)}
          onMouseLeave={() => onEngineHover?.(false)}
          className="group relative flex items-center gap-3 border border-zinc-700 bg-zinc-950/80 px-8 py-4 font-mono text-xs tracking-[0.25em] text-zinc-200 transition-all duration-500 hover:border-cyan-400 hover:text-cyan-300 hover:bg-zinc-900"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 group-hover:animate-ping" />
          <span>ENTER JOURNEY</span>
          <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
        </button>

        <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
          OR SCROLL TO INITIATE TAKEOFF
        </span>
      </div>
    </section>
  );
}
