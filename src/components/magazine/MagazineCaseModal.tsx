"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, CheckCircle2 } from "lucide-react";
import { ExperienceWaypoint } from "@/journey/types";
import PlateBlueprintGraphic from "./PlateBlueprintGraphic";

interface CaseModalProps {
  waypoint: ExperienceWaypoint | null;
  onClose: () => void;
}

export default function MagazineCaseModal({ waypoint, onClose }: CaseModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (waypoint) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [waypoint, onClose]);

  if (!waypoint) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
      {/* Editorial Backdrop with Blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/75 backdrop-blur-md transition-opacity"
      />

      {/* Main Magazine Dossier Paper Frame */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#faf9f6] text-zinc-950 border-2 border-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.4)] overflow-y-auto z-10 flex flex-col justify-between font-sans">
        
        {/* Modal Masthead Bar */}
        <div className="sticky top-0 bg-[#faf9f6] border-b border-zinc-950/20 px-6 sm:px-8 py-4 flex items-center justify-between font-sans text-xs z-20">
          <div className="flex items-center gap-3">
            <span className="font-extrabold uppercase tracking-wider text-zinc-950 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span>ARCHITECTURAL DOSSIER</span>
            </span>
            <span className="text-zinc-300">/</span>
            <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-bold text-[10px] uppercase">
              {waypoint.year}
            </span>
          </div>

          <button
            onClick={onClose}
            data-cursor-text="CLOSE"
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-950 text-white hover:bg-black rounded transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            <span>CLOSE</span>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-10 space-y-8">
          {/* Header Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 font-sans text-xs text-zinc-600 uppercase tracking-wider font-bold">
              <span className="text-zinc-950">{waypoint.company}</span>
              <span>·</span>
              <span className="text-blue-600">{waypoint.role}</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-zinc-950 uppercase tracking-tight leading-[0.95]">
              {waypoint.domain}
            </h2>
          </div>

          {/* Visual Presentation Plate */}
          <div className="relative w-full overflow-hidden rounded-xs border border-zinc-950/20 shadow-sm">
            {waypoint.image && !waypoint.image.endsWith(".svg") ? (
              <div className="relative w-full h-64 sm:h-80 md:h-[400px]">
                <Image
                  src={waypoint.image}
                  alt={waypoint.domain}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md border border-zinc-200 font-sans text-[11px] font-bold uppercase tracking-wider text-zinc-800 rounded-xs shadow-xs">
                  CASE ARCHIVE // {waypoint.domain}
                </div>
              </div>
            ) : (
              <PlateBlueprintGraphic waypoint={waypoint} />
            )}
          </div>

          {/* Editorial Executive Summary */}
          <div className="space-y-3">
            <div className="font-sans text-xs uppercase font-extrabold tracking-wider text-blue-600">
              EXECUTIVE SPECIFICATION
            </div>
            <p className="font-serif text-lg sm:text-2xl text-zinc-800 italic font-normal leading-relaxed border-l-4 border-blue-600 pl-4 sm:pl-5">
              “{waypoint.description}”
            </p>
          </div>

          {/* Key Deliverables & Systems Engineering */}
          {waypoint.deliverables && waypoint.deliverables.length > 0 && (
            <div className="space-y-4 pt-2">
              <div className="font-sans text-xs uppercase font-extrabold tracking-wider text-emerald-600">
                PRODUCTION DELIVERABLES & SYSTEM HIGHLIGHTS
              </div>
              <div className="space-y-3 bg-white p-5 border border-zinc-200 shadow-2xs rounded-xs">
                {waypoint.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-sm text-zinc-800 leading-relaxed font-normal"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Production Tech Stack */}
          <div className="space-y-3 pt-2">
            <div className="font-sans text-xs uppercase font-extrabold tracking-wider text-purple-600">
              VERIFIED PRODUCTION STACK
            </div>
            <div className="flex flex-wrap gap-2">
              {waypoint.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="font-sans text-xs px-3 py-1.5 bg-purple-50 border border-purple-200 text-purple-950 font-bold uppercase tracking-wider rounded-sm shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footnote Folio */}
        <div className="border-t border-zinc-950/20 px-6 sm:px-8 py-4 bg-zinc-50 flex items-center justify-between font-sans text-xs text-zinc-600 uppercase tracking-wider font-semibold">
          <span>MONOGRAPH ARCHIVE // PT. {waypoint.year}</span>
          <button
            onClick={onClose}
            className="font-extrabold text-blue-600 hover:text-blue-800 uppercase flex items-center gap-1 cursor-pointer"
          >
            <span>RETURN TO PUBLICATION ↑</span>
          </button>
        </div>
      </div>
    </div>
  );
}
