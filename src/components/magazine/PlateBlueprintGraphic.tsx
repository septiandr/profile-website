"use client";

import { useId } from "react";
import { 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  Layers, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Radio, 
  Terminal,
  Server
} from "lucide-react";
import { ExperienceWaypoint } from "@/journey/types";

interface PlateBlueprintProps {
  waypoint: ExperienceWaypoint;
  className?: string;
}

export default function PlateBlueprintGraphic({ waypoint, className = "" }: PlateBlueprintProps) {
  const id = useId();
  const domain = (waypoint.domain || "").toUpperCase();
  const company = (waypoint.company || "").toUpperCase();

  // Determine schematic personality based on project domain
  const isEV = domain.includes("EV") || domain.includes("CASION");
  const isBanking = domain.includes("BANKING") || domain.includes("OCTO") || domain.includes("FINANCE") || company.includes("INFOSYS");
  const isFood = domain.includes("FOOD") || domain.includes("SHIHLIN") || domain.includes("STEAK");
  const isLoyalty = domain.includes("BEHAVE") || domain.includes("LOYALTY") || domain.includes("REWARDS");
  const isEdtech = domain.includes("EDUCATION") || domain.includes("LUNA") || company.includes("NATIEVA");

  // Accent Colors & Branding Themes
  let theme = {
    accent: "#2563eb",
    accentLight: "rgba(37, 99, 235, 0.12)",
    accentBorder: "rgba(37, 99, 235, 0.3)",
    badgeBg: "bg-blue-600 text-white",
    badgeSubtle: "bg-blue-100 text-blue-900 border-blue-200",
    pillBorder: "border-blue-300",
    glowColor: "rgba(37, 99, 235, 0.2)",
    categoryLabel: "SYSTEM ARCHITECTURE",
    icon: Server,
  };

  if (isEV) {
    theme = {
      accent: "#10b981",
      accentLight: "rgba(16, 185, 129, 0.12)",
      accentBorder: "rgba(16, 185, 129, 0.3)",
      badgeBg: "bg-emerald-600 text-white",
      badgeSubtle: "bg-emerald-100 text-emerald-900 border-emerald-200",
      pillBorder: "border-emerald-300",
      glowColor: "rgba(16, 185, 129, 0.25)",
      categoryLabel: "IOT TELEMETRY & APP",
      icon: Zap,
    };
  } else if (isBanking) {
    theme = {
      accent: "#2563eb",
      accentLight: "rgba(37, 99, 235, 0.12)",
      accentBorder: "rgba(37, 99, 235, 0.3)",
      badgeBg: "bg-blue-600 text-white",
      badgeSubtle: "bg-blue-100 text-blue-900 border-blue-200",
      pillBorder: "border-blue-300",
      glowColor: "rgba(37, 99, 235, 0.25)",
      categoryLabel: "FINTECH & PCI-DSS SYSTEM",
      icon: ShieldCheck,
    };
  } else if (isFood) {
    theme = {
      accent: "#f97316",
      accentLight: "rgba(249, 115, 22, 0.12)",
      accentBorder: "rgba(249, 115, 22, 0.3)",
      badgeBg: "bg-orange-600 text-white",
      badgeSubtle: "bg-orange-100 text-orange-900 border-orange-200",
      pillBorder: "border-orange-300",
      glowColor: "rgba(249, 115, 22, 0.25)",
      categoryLabel: "OMNICHANNEL POS & APP",
      icon: Smartphone,
    };
  } else if (isLoyalty) {
    theme = {
      accent: "#7c3aed",
      accentLight: "rgba(124, 58, 237, 0.12)",
      accentBorder: "rgba(124, 58, 237, 0.3)",
      badgeBg: "bg-purple-600 text-white",
      badgeSubtle: "bg-purple-100 text-purple-900 border-purple-200",
      pillBorder: "border-purple-300",
      glowColor: "rgba(124, 58, 237, 0.25)",
      categoryLabel: "ENTERPRISE SAAS SYSTEM",
      icon: Layers,
    };
  } else if (isEdtech) {
    theme = {
      accent: "#e11d48",
      accentLight: "rgba(225, 29, 72, 0.12)",
      accentBorder: "rgba(225, 29, 72, 0.3)",
      badgeBg: "bg-rose-600 text-white",
      badgeSubtle: "bg-rose-100 text-rose-900 border-rose-200",
      pillBorder: "border-rose-300",
      glowColor: "rgba(225, 29, 72, 0.25)",
      categoryLabel: "EDTECH LMS & VIDEO WEB",
      icon: Cpu,
    };
  }

  const IconComponent = theme.icon;

  return (
    <div
      className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] bg-[#f7f5ee] border border-zinc-950/15 overflow-hidden select-none flex flex-col justify-between p-3.5 sm:p-5 md:p-6 ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, ${theme.glowColor} 0%, transparent 45%),
          radial-gradient(circle at 90% 80%, ${theme.accentLight} 0%, transparent 40%)
        `,
      }}
    >
      {/* 1. Technical Drafting Millimeter Grid Pattern */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`blueprint-grid-${id}`} width="36" height="36" patternUnits="userSpaceOnUse">
            <path
              d="M 36 0 L 0 0 0 36"
              fill="none"
              stroke="rgba(9, 9, 11, 0.12)"
              strokeWidth="0.8"
            />
            <circle cx="0" cy="0" r="1.2" fill="rgba(9, 9, 11, 0.25)" />
            <path
              d="M 18 16 L 18 20 M 16 18 L 20 18"
              stroke="rgba(9, 9, 11, 0.12)"
              strokeWidth="0.6"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#blueprint-grid-${id})`} />
      </svg>

      {/* 2. Top Header Technical Stamp */}
      <div className="relative z-10 flex items-center justify-between border-b border-zinc-950/15 pb-3">
        <div className="flex items-center gap-2.5">
          <span className={`px-2.5 py-1 rounded-xs font-sans text-[10px] font-extrabold uppercase tracking-wider ${theme.badgeBg} shadow-xs flex items-center gap-1.5`}>
            <IconComponent className="h-3 w-3" />
            <span>{theme.categoryLabel}</span>
          </span>
          <span className="font-sans text-[11px] font-extrabold text-zinc-900 tracking-wider">
            PLATE SCHEMATIC // {waypoint.year}
          </span>
        </div>

        <div className="flex items-center gap-2 font-sans text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="hidden sm:inline">60FPS CERTIFIED</span>
        </div>
      </div>

      {/* 3. Center Schematic Wireframe (Tailored by Domain) */}
      <div className="relative z-10 my-auto py-2 sm:py-3 flex flex-col items-center justify-center w-full">
        
        {/* CASE A: EV & IOT TELEMETRY */}
        {isEV && (
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-emerald-500/30 rounded-lg p-3.5 sm:p-4.5 shadow-[0_10px_25px_rgba(16,185,129,0.12)] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-display font-black text-xs sm:text-sm text-zinc-950 uppercase tracking-tight">
                  CASION EV · IOT CHARGER NETWORK
                </span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 font-sans text-[10px] font-bold rounded">
                TELEMETRY ACTIVE
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 sm:p-2.5 bg-emerald-50/80 border border-emerald-200/80 rounded">
                <div className="font-sans text-[9px] font-bold text-zinc-500 uppercase">SPEED</div>
                <div className="font-display font-black text-sm sm:text-base text-emerald-700">60 kW/h</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-zinc-600">DC Fast Charge</div>
              </div>
              <div className="p-2 sm:p-2.5 bg-emerald-50/80 border border-emerald-200/80 rounded">
                <div className="font-sans text-[9px] font-bold text-zinc-500 uppercase">STABILITY</div>
                <div className="font-display font-black text-sm sm:text-base text-emerald-700">99.8%</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-zinc-600">Crash-Free SLA</div>
              </div>
              <div className="p-2 sm:p-2.5 bg-emerald-50/80 border border-emerald-200/80 rounded">
                <div className="font-sans text-[9px] font-bold text-zinc-500 uppercase">PROTOCOL</div>
                <div className="font-display font-black text-sm sm:text-base text-emerald-700">WSS://</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-zinc-600">Live Hardware Sync</div>
              </div>
            </div>

            <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] text-zinc-600 pt-0.5">
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Radio className="h-3 w-3 text-emerald-600 animate-pulse" />
                <span>NATIONWIDE GEO-FENCE & CHARGER RESERVATION</span>
              </span>
              <span className="font-extrabold text-zinc-950">REACT NATIVE</span>
            </div>
          </div>
        )}

        {/* CASE B: BANKING & OCTO CLICKS */}
        {isBanking && (
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-blue-500/30 rounded-lg p-3.5 sm:p-4.5 shadow-[0_10px_25px_rgba(37,99,235,0.12)] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-blue-600" />
                <span className="font-display font-black text-xs sm:text-sm text-zinc-950 uppercase tracking-tight">
                  CIMB NIAGA · OCTO CLICKS BANKING
                </span>
              </div>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-900 font-sans text-[10px] font-bold rounded">
                PCI-DSS VERIFIED
              </span>
            </div>

            <div className="space-y-2 font-sans text-xs">
              <div className="p-2.5 bg-blue-50/70 border border-blue-200/80 rounded flex items-center justify-between">
                <span className="font-bold text-zinc-800">E-Debit & OTP Cryptographic Pipeline</span>
                <span className="font-extrabold text-blue-700">AES-256</span>
              </div>
              <div className="p-2.5 bg-blue-50/70 border border-blue-200/80 rounded flex items-center justify-between">
                <span className="font-bold text-zinc-800">Mission-Critical Audit Log Compliance</span>
                <span className="font-extrabold text-emerald-600">PASS (100%)</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-sans text-[10px] text-zinc-600 pt-1">
              <span className="font-bold text-blue-900">ENTERPRISE INTERNET BANKING PORTAL</span>
              <span className="font-extrabold text-zinc-950">REACT · TYPESCRIPT</span>
            </div>
          </div>
        )}

        {/* CASE C: SHIHLIN & POS */}
        {isFood && (
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-orange-500/30 rounded-lg p-3.5 sm:p-4.5 shadow-[0_10px_25px_rgba(249,115,22,0.12)] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-orange-600" />
                <span className="font-display font-black text-xs sm:text-sm text-zinc-950 uppercase tracking-tight">
                  SHIHLIN · OMNICHANNEL MOBILE ORDERING
                </span>
              </div>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-900 font-sans text-[10px] font-bold rounded">
                LIVE KDS QUEUE
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-orange-50/80 border border-orange-200 rounded">
                <div className="font-sans text-[9px] font-bold text-zinc-500 uppercase">ORDER DISPATCH</div>
                <div className="font-display font-black text-sm sm:text-base text-orange-700">SUB-SECOND</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-zinc-600">Socket.IO Event Stream</div>
              </div>
              <div className="p-2.5 bg-orange-50/80 border border-orange-200 rounded">
                <div className="font-sans text-[9px] font-bold text-zinc-500 uppercase">OFFLINE RECOVERY</div>
                <div className="font-display font-black text-sm sm:text-base text-orange-700">AUTO-SYNC</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-zinc-600">Zero Cart Drop Rates</div>
              </div>
            </div>

            <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] text-zinc-600 pt-0.5">
              <span className="font-bold text-orange-950">HIGH-CONCURRENCY FOOD ORDERING APP</span>
              <span className="font-extrabold text-zinc-950">REACT NATIVE · NODE</span>
            </div>
          </div>
        )}

        {/* CASE D: BEHAVE.ID & LOYALTY */}
        {isLoyalty && (
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-purple-500/30 rounded-lg p-3.5 sm:p-4.5 shadow-[0_10px_25px_rgba(124,58,237,0.12)] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-purple-600" />
                <span className="font-display font-black text-xs sm:text-sm text-zinc-950 uppercase tracking-tight">
                  BEHAVE.ID · MULTI-TIER REWARDS PLATFORM
                </span>
              </div>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-900 font-sans text-[10px] font-bold rounded">
                SAAS LEDGER
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2 bg-purple-50/70 border border-purple-200 rounded text-xs font-sans">
                <span className="font-bold text-zinc-800 text-[11px]">Atomic Point Redemption Ledger</span>
                <span className="font-extrabold text-purple-700 text-[11px]">GOLANG API</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50/70 border border-purple-200 rounded text-xs font-sans">
                <span className="font-bold text-zinc-800 text-[11px]">Merchant Analytics & Voucher Engine</span>
                <span className="font-extrabold text-emerald-600 text-[11px]">REAL-TIME</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] text-zinc-600 pt-0.5">
              <span className="font-bold text-purple-950">ENTERPRISE SAAS SYSTEM</span>
              <span className="font-extrabold text-zinc-950">REACT · GO · POSTGRES</span>
            </div>
          </div>
        )}

        {/* CASE E: LUNA & EDTECH */}
        {isEdtech && (
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-rose-500/30 rounded-lg p-3.5 sm:p-4.5 shadow-[0_10px_25px_rgba(225,29,72,0.12)] space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-rose-600" />
                <span className="font-display font-black text-xs sm:text-sm text-zinc-950 uppercase tracking-tight">
                  LUNA BY MSIG LIFE · CERTIFICATION HUB
                </span>
              </div>
              <span className="px-2 py-0.5 bg-rose-100 text-rose-900 font-sans text-[10px] font-bold rounded">
                ENTERPRISE LMS
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-rose-50/80 border border-rose-200 rounded">
                <div className="font-sans text-[9px] font-bold text-zinc-500 uppercase">BUNDLE REDUCTION</div>
                <div className="font-display font-black text-sm sm:text-base text-rose-700">-42% PAYLOAD</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-zinc-600">Module Federation</div>
              </div>
              <div className="p-2.5 bg-rose-50/80 border border-rose-200 rounded">
                <div className="font-sans text-[9px] font-bold text-zinc-500 uppercase">VIDEO CLASSROOM</div>
                <div className="font-display font-black text-sm sm:text-base text-rose-700">ZUSTAND SYNC</div>
                <div className="font-sans text-[8px] sm:text-[9px] text-zinc-600">Live Scheduling State</div>
              </div>
            </div>

            <div className="flex items-center justify-between font-sans text-[9px] sm:text-[10px] text-zinc-600 pt-0.5">
              <span className="font-bold text-rose-950">HIGH-PERFORMANCE LEARNING SUITE</span>
              <span className="font-extrabold text-zinc-950">NEXT.JS · ZUSTAND</span>
            </div>
          </div>
        )}

        {/* CASE DEFAULT: GENERIC ARCHITECTURAL SCHEMATIC */}
        {!isEV && !isBanking && !isFood && !isLoyalty && !isEdtech && (
          <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-zinc-300 rounded-lg p-3.5 sm:p-4.5 shadow-lg space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-blue-600" />
                <span className="font-display font-black text-xs sm:text-sm text-zinc-950 uppercase tracking-tight">
                  {waypoint.company} · {waypoint.domain}
                </span>
              </div>
              <span className="px-2 py-0.5 bg-zinc-200 text-zinc-900 font-sans text-[10px] font-bold rounded">
                PRODUCTION PLATE
              </span>
            </div>

            <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded font-sans text-xs space-y-1.5">
              <div className="font-bold text-zinc-900 text-[11px]">{waypoint.role}</div>
              <div className="text-zinc-600 leading-relaxed text-[10px] sm:text-[11px]">{waypoint.description}</div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {waypoint.tech.map((t, i) => (
                <span key={i} className="px-2 py-0.5 bg-zinc-100 border border-zinc-300 rounded text-[9px] sm:text-[10px] font-bold text-zinc-800">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. Bottom Engineering Specification Ribbon */}
      <div className="relative z-10 border-t border-zinc-950/15 pt-2.5 flex flex-wrap items-center justify-between gap-1.5 font-sans text-[10px] sm:text-[11px] text-zinc-700">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-extrabold text-zinc-950 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
            <span>ARCHITECTURAL DOSSIER PLATE</span>
          </span>
          <span className="text-zinc-300">/</span>
          <span className="font-semibold">{waypoint.company}</span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          <span>LATENCY &lt; 50MS</span>
          <span>·</span>
          <span>ENTERPRISE GRADE</span>
        </div>
      </div>

      {/* Four Precision Corner Crosshairs */}
      <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 border-t border-l border-zinc-950/40 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 border-t border-r border-zinc-950/40 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 border-b border-l border-zinc-950/40 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 border-b border-r border-zinc-950/40 pointer-events-none" />
    </div>
  );
}
