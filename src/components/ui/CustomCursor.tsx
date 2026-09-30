"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on desktop pointers
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = cursorRingRef.current;
    const dot = cursorDotRef.current;
    if (!ring || !dot) return;

    // Use fast refs for coordinate calculations
    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        gsap.set([ring, dot], { x: e.clientX, y: e.clientY });
        setIsVisible(true);
      }

      // Fast immediate update for center precision dot
      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.04,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth fluid trailing physics for outer targeting ring
    const ticker = () => {
      if (!hasMoved) return;
      ringPos.x += (mouse.x - ringPos.x) * 0.22;
      ringPos.y += (mouse.y - ringPos.y) * 0.22;
      gsap.set(ring, { x: ringPos.x, y: ringPos.y });
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Interactive element hover listeners
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]") ||
        target.closest("[role='button']") ||
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
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Outer fluid targeting ring (Solar Amber) */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border pointer-events-none transition-all duration-300 ease-out ${
          isHovered
            ? "h-14 w-14 border-solar-400 bg-solar-500/20 scale-110 shadow-[0_0_25px_rgba(245,158,11,0.6)] backdrop-blur-[1px]"
            : isClicked
            ? "h-8 w-8 border-solar-300 bg-solar-500/30 scale-90 shadow-[0_0_15px_rgba(245,158,11,0.5)]"
            : "h-9 w-9 border-solar-400/80 bg-solar-500/10 scale-100 shadow-[0_0_15px_rgba(245,158,11,0.35)]"
        }`}
      >
        {/* Subtle reticle / corner crosshair accents for premium agency look */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="h-1 w-1 rounded-full bg-solar-300 animate-ping" />
          </div>
        )}
      </div>

      {/* Center sharp precision dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-150 ${
          isClicked
            ? "h-1.5 w-1.5 bg-amber-200 scale-75 shadow-[0_0_6px_#fef3c7]"
            : isHovered
            ? "h-2 w-2 bg-solar-300 scale-125 shadow-[0_0_12px_#f59e0b]"
            : "h-2 w-2 bg-solar-400 shadow-[0_0_10px_#f59e0b]"
        }`}
      />
    </div>
  );
}
