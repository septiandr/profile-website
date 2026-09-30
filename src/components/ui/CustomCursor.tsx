"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface TrailPoint {
  x: number;
  y: number;
}

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // References for heatmap layers
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const trail0Ref = useRef<HTMLDivElement>(null);
  const trail1Ref = useRef<HTMLDivElement>(null);
  const trail2Ref = useRef<HTMLDivElement>(null);
  const trail3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only display on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const mouse = { x: -200, y: -200 };
    // Multi-stage thermal heat nodes
    const trails: TrailPoint[] = [
      { x: -200, y: -200 }, // Node 0: Solar amber plasma
      { x: -200, y: -200 }, // Node 1: Fiery orange flame
      { x: -200, y: -200 }, // Node 2: Cyan thermal edge
      { x: -200, y: -200 }, // Node 3: Deep indigo dissipation
    ];
    const lerpSpeeds = [0.35, 0.22, 0.14, 0.08];

    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        trails.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
        setIsVisible(true);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Continuous dynamic ticker for fluid chromatic heatmap physics
    const ticker = () => {
      if (!hasMoved) return;

      // Update lead thermal halo & precision core
      if (haloRef.current) {
        gsap.set(haloRef.current, { x: mouse.x, y: mouse.y });
      }
      if (coreRef.current) {
        gsap.set(coreRef.current, { x: mouse.x, y: mouse.y });
      }

      // Update trailing thermal nodes
      const nodeRefs = [trail0Ref.current, trail1Ref.current, trail2Ref.current, trail3Ref.current];
      for (let i = 0; i < trails.length; i++) {
        const targetX = i === 0 ? mouse.x : trails[i - 1].x;
        const targetY = i === 0 ? mouse.y : trails[i - 1].y;
        const speed = lerpSpeeds[i];

        trails[i].x += (targetX - trails[i].x) * speed;
        trails[i].y += (targetY - trails[i].y) * speed;

        const node = nodeRefs[i];
        if (node) {
          gsap.set(node, { x: trails[i].x, y: trails[i].y });
        }
      }
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]") ||
        target.closest("[role='button']") ||
        target.closest(".exp-card") ||
        target.closest(".tech-card") ||
        target.closest(".project-card") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Thermal Heatmap Trail Node 3: Deep Indigo Dissipation Aura */}
      <div
        ref={trail3Ref}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-28 h-28 bg-[#4f46e5]/25 blur-2xl mix-blend-screen transition-transform duration-300"
      />

      {/* Thermal Heatmap Trail Node 2: Celestial Cyan Heat Edge */}
      <div
        ref={trail2Ref}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-20 h-20 bg-[#06b6d4]/35 blur-xl mix-blend-screen transition-transform duration-200"
      />

      {/* Thermal Heatmap Trail Node 1: Fiery Thermal Orange */}
      <div
        ref={trail1Ref}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-14 h-14 bg-[#f97316]/50 blur-lg mix-blend-screen transition-transform duration-150"
      />

      {/* Thermal Heatmap Trail Node 0: Solar Amber Plasma */}
      <div
        ref={trail0Ref}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-9 h-9 bg-[#f59e0b]/75 blur-md mix-blend-screen transition-transform duration-100"
      />

      {/* Lead Thermal Halo Ring & Reactive Reticle */}
      <div
        ref={haloRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-all duration-300 ease-out border ${
          isHovered
            ? "h-14 w-14 border-amber-300/90 bg-gradient-to-tr from-amber-400/25 via-orange-500/20 to-cyan-400/25 scale-110 shadow-[0_0_25px_rgba(245,158,11,0.6),0_0_40px_rgba(6,182,212,0.35)] backdrop-blur-[1px]"
            : isClicked
            ? "h-8 w-8 border-white bg-amber-400/40 scale-90 shadow-[0_0_25px_#ffffff]"
            : "h-9 w-9 border-amber-400/70 bg-gradient-to-tr from-amber-400/15 via-orange-500/10 to-cyan-400/15 scale-100 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
        }`}
      >
        {/* Subtle center reticle ping when hovering over interactive elements */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-300 animate-ping" />
          </div>
        )}
      </div>

      {/* Center White-Hot Thermal Precision Point */}
      <div
        ref={coreRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-150 ${
          isClicked
            ? "h-2 w-2 bg-white scale-125 shadow-[0_0_12px_#ffffff,0_0_25px_#f59e0b]"
            : isHovered
            ? "h-2.5 w-2.5 bg-white scale-110 shadow-[0_0_10px_#ffffff,0_0_20px_#f59e0b]"
            : "h-2 w-2 bg-amber-100 shadow-[0_0_8px_#ffffff,0_0_16px_#f59e0b]"
        }`}
      />
    </div>
  );
}
