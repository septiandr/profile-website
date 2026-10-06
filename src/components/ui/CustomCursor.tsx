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
  const [cursorText, setCursorText] = useState<string | null>(null);

  // References for cursor layers
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const textLabelRef = useRef<HTMLSpanElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only display on desktop pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const mouse = { x: -200, y: -200 };
    const trailPoint = { x: -200, y: -200 };
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        trailPoint.x = e.clientX;
        trailPoint.y = e.clientY;
        setIsVisible(true);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const ticker = () => {
      if (!hasMoved) return;

      if (haloRef.current) {
        gsap.set(haloRef.current, { x: mouse.x, y: mouse.y });
      }
      if (coreRef.current) {
        gsap.set(coreRef.current, { x: mouse.x, y: mouse.y });
      }

      // Smooth lerp for trailing ring
      trailPoint.x += (mouse.x - trailPoint.x) * 0.25;
      trailPoint.y += (mouse.y - trailPoint.y) * 0.25;

      if (trailRef.current) {
        gsap.set(trailRef.current, { x: trailPoint.x, y: trailPoint.y });
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
      const textEl = target.closest("[data-cursor-text]") as HTMLElement;
      if (textEl) {
        setCursorText(textEl.getAttribute("data-cursor-text"));
        setIsHovered(true);
        return;
      } else {
        setCursorText(null);
      }

      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]") ||
        target.closest("[role='button']") ||
        target.closest("article") ||
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
      {/* Editorial Soft Fluid Lag Ring */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none w-10 h-10 border border-zinc-950/20 transition-transform duration-200"
      />

      {/* Main Magazine Action Reticle */}
      <div
        ref={haloRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none flex items-center justify-center transition-all duration-300 ease-out ${
          cursorText
            ? "h-20 w-20 bg-zinc-950 text-white border-2 border-zinc-900 shadow-[0_15px_35px_rgba(0,0,0,0.3)] scale-100"
            : isHovered
            ? "h-12 w-12 border border-zinc-950 bg-zinc-950/10 scale-110 backdrop-blur-[1px]"
            : isClicked
            ? "h-6 w-6 border border-zinc-950 bg-zinc-950/40 scale-90"
            : "h-8 w-8 border border-zinc-950/60 scale-100"
        }`}
      >
        {cursorText ? (
          <span
            ref={textLabelRef}
            className="font-sans text-[10px] font-extrabold uppercase tracking-[0.2em] text-white select-none pointer-events-none"
          >
            {cursorText}
          </span>
        ) : isHovered ? (
          <span className="h-1 w-1 rounded-full bg-zinc-950" />
        ) : null}
      </div>

      {/* Center Precision Point (Hidden when text is active) */}
      {!cursorText && (
        <div
          ref={coreRef}
          className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none transition-transform duration-150 ${
            isClicked
              ? "h-2 w-2 bg-zinc-950 scale-125"
              : isHovered
              ? "h-1.5 w-1.5 bg-zinc-950 scale-110"
              : "h-1.5 w-1.5 bg-zinc-950"
          }`}
        />
      )}
    </div>
  );
}
