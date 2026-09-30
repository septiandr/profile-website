"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";

interface TiltSpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string; // e.g. "rgba(245, 158, 11, 0.25)"
  borderColor?: string; // e.g. "rgba(245, 158, 11, 0.4)"
  accentGlow?: string; // ambient glow color e.g. "rgba(245, 158, 11, 0.15)"
  onClick?: () => void;
  interactive?: boolean;
}

export default function TiltSpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(245, 158, 11, 0.22)",
  borderColor = "rgba(245, 158, 11, 0.45)",
  accentGlow,
  onClick,
  interactive = true,
}: TiltSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState(
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !interactive) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });

    // Calculate rotation (-6 to +6 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTransform(
      `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(
        2
      )}deg) scale3d(1.018, 1.018, 1.018)`
    );
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: isHovered
          ? "transform 0.12s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease"
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s ease",
        transformStyle: "preserve-3d",
      }}
      className={`relative rounded-2xl will-change-transform ${
        interactive ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Ambient Behind-the-Card Color Aura */}
      {accentGlow && (
        <div
          aria-hidden="true"
          className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
          style={{ background: accentGlow }}
        />
      )}

      {/* Dynamic Cursor Spotlight Radial Mask (Reveals radiant glow where cursor hovers) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 75%)`
            : "none",
        }}
      />

      {/* Dynamic Cursor Border Glow (Lights up the border perimeter near the cursor) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20"
        style={{
          border: isHovered ? `1px solid ${borderColor}` : "1px solid transparent",
          maskImage: isHovered
            ? `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, black, transparent 75%)`
            : "none",
          WebkitMaskImage: isHovered
            ? `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, black, transparent 75%)`
            : "none",
        }}
      />

      {/* Card Inner Content */}
      <div className="relative z-0 h-full w-full">{children}</div>
    </div>
  );
}
