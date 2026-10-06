"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);

  const badgeRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only display on pointer devices (disable on mobile/touch screens)
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const mouse = { x: -200, y: -200 };
    const ringPos = { x: -200, y: -200 };
    let hasMoved = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        setIsVisible(true);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const ticker = () => {
      if (!hasMoved) return;

      // Smooth lag for badge & ring
      ringPos.x += (mouse.x - ringPos.x) * 0.32;
      ringPos.y += (mouse.y - ringPos.y) * 0.32;

      if (ringRef.current) {
        gsap.set(ringRef.current, { x: ringPos.x - 16, y: ringPos.y - 16 });
      }

      if (badgeRef.current) {
        gsap.set(badgeRef.current, { x: mouse.x + 14, y: mouse.y + 14 });
      }
    };

    gsap.ticker.add(ticker);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const textEl = target.closest("[data-cursor-text]") as HTMLElement;
      if (textEl) {
        setCursorText(textEl.getAttribute("data-cursor-text"));
      } else {
        setCursorText(null);
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Subtle Fluid Magnetic Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none w-8 h-8 border border-zinc-950/20 will-change-transform"
      />

      {/* Dynamic Action Text Badge that floats alongside cursor */}
      {cursorText && (
        <div
          ref={badgeRef}
          className="fixed top-0 left-0 pointer-events-none z-50 bg-zinc-950 text-white px-2.5 py-1 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.25)] border border-zinc-800 text-[10px] font-sans font-black tracking-widest uppercase flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>{cursorText}</span>
        </div>
      )}
    </div>
  );
}
