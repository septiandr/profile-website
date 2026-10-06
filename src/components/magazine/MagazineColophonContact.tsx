"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mail, Globe, Code, Copy, Check } from "lucide-react";
import { profileData } from "@/data/profile";

export default function MagazineColophonContact() {
  const [copied, setCopied] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Kinetic Scrub on Closing Monograph Headline
      if (titleRef.current && footerRef.current) {
        gsap.fromTo(
          titleRef.current,
          { x: -35 },
          {
            x: 35,
            ease: "none",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      // 2. Individual Contact Card onScroll Entrance & Elements
      const contactCards = gsap.utils.toArray<HTMLElement>(".mag-contact-card");
      contactCards.forEach((card, idx) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          card,
          { y: 65, opacity: 0.15, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.75,
            delay: idx * 0.1,
            ease: "power3.out",
          }
        );

        const bar = card.querySelector(".mag-contact-bar");
        if (bar) {
          tl.fromTo(
            bar,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: "power3.inOut" },
            "-=0.5"
          );
        }

        const title = card.querySelector(".mag-contact-title");
        if (title) {
          tl.fromTo(
            title,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: "power2.out" },
            "-=0.3"
          );
        }

        const btn = card.querySelector(".mag-contact-btn");
        if (btn) {
          tl.fromTo(
            btn,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
            "-=0.2"
          );
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const [selectedService, setSelectedService] = useState<"system" | "website" | "app" | "bot" | "all">("all");

  const getWaMessage = () => {
    switch (selectedService) {
      case "system":
        return "Hello Septian, I would like to consult and commission an ENTERPRISE SYSTEM (Dashboard / Backend / Microservices) project.";
      case "website":
        return "Hello Septian, I would like to consult and commission a modern WEBSITE (Landing Page / WebGL / 3D App) project.";
      case "app":
        return "Hello Septian, I would like to consult and commission a MOBILE APPLICATION (Android / iOS) project.";
      case "bot":
        return "Hello Septian, I would like to consult and commission an AUTOMATION BOT (Telegram / WhatsApp / AI) project.";
      default:
        return "Hello Septian, I would like to discuss a digital engineering project (System / Website / App / Bot).";
    }
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(profileData.personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <footer
      id="mag-colophon"
      ref={footerRef}
      className="relative min-h-[85vh] w-full bg-[#faf9f6] text-zinc-950 font-sans py-20 sm:py-28 select-none flex flex-col justify-between overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full my-auto">
        
        {/* Top Folio Rule */}
        <div className="border-b border-zinc-950/20 pb-4 mb-12 sm:mb-16 flex items-center justify-between font-sans text-xs tracking-wider uppercase text-zinc-600 font-semibold">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>SECTION 06 · STUDIO INQUIRIES & COMMISSIONS</span>
          </span>
          <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-full font-bold text-[10px]">
            ONLINE · ACCEPTING NEW PROJECTS 2026
          </span>
        </div>

        {/* Massive Closing Monograph Headline */}
        <div className="max-w-5xl space-y-8 mb-12">
          <h2
            ref={titleRef}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] xl:text-[5.8rem] font-black text-zinc-950 uppercase tracking-tight leading-[0.98] will-change-transform"
          >
            AVAILABLE FOR COMMISSIONS: <br />
            <span className="font-serif italic font-normal text-zinc-800 underline decoration-blue-600 decoration-4 underline-offset-8">
              SYSTEM · WEBSITE · APP · BOT.
            </span>
          </h2>

          <p className="font-serif text-xl sm:text-2xl lg:text-3xl text-zinc-800 italic font-normal leading-relaxed max-w-3xl border-l-4 border-blue-600 pl-5">
            “Send over your project requirements and vision. Let us architect high-throughput systems, aesthetic 60fps websites, battle-tested mobile apps, or intelligent automation bots.”
          </p>
        </div>

        {/* Interactive Service Filter Pill Selector */}
        <div className="mb-12 p-5 bg-white border border-zinc-300 rounded-sm shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-xs font-black uppercase tracking-wider text-zinc-800">
              SELECT SERVICE OF INTEREST:
            </span>
            <span className="font-sans text-[11px] text-zinc-500 font-semibold hidden sm:inline">
              (WhatsApp & Email message pre-filled automatically)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: "all", label: "ALL SERVICES" },
              { id: "system", label: "🖥️ SYSTEM & BACKEND" },
              { id: "website", label: "🌐 WEBSITE & 3D WEB" },
              { id: "app", label: "📱 MOBILE APP (IOS/ANDROID)" },
              { id: "bot", label: "🤖 BOTS & AI AUTOMATION" },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSelectedService(btn.id as "system" | "website" | "app" | "bot" | "all")}
                className={`px-3.5 py-1.5 rounded-xs font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedService === btn.id
                    ? "bg-blue-600 text-white shadow-xs scale-105"
                    : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Links & Commission Triggers with Chromatic Identity */}
        <div className="mag-contact-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-zinc-950/20 mb-16">
          
          {/* Card 01: WhatsApp Direct Order (Emerald Accent) */}
          <div className="mag-contact-card group border border-emerald-500/30 bg-emerald-50/40 hover:bg-emerald-50/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between rounded-xs overflow-hidden will-change-transform">
            <div className="mag-contact-bar h-2 w-full bg-emerald-600 origin-left" />
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between font-sans text-xs text-zinc-500 mb-5 uppercase tracking-wider font-bold">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-950 rounded text-[10px]">01 / DIRECT CHAT</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
                <div className="mag-contact-title font-display font-black text-2xl uppercase tracking-tight text-zinc-950">
                  WhatsApp
                </div>
                <div className="font-sans text-xs text-zinc-700 font-semibold mt-2">
                  +62 856-4644-4805
                </div>
                <div className="font-sans text-[11px] text-emerald-800 font-medium mt-1">
                  Rapid response & direct consultation
                </div>
              </div>

              <div className="mag-contact-btn pt-6">
                <a
                  href={`https://wa.me/6285646444805?text=${encodeURIComponent(getWaMessage())}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="WHATSAPP"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 02: Electronic Mail (Rose Accent) */}
          <div className="mag-contact-card group border border-zinc-950/15 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between rounded-xs overflow-hidden will-change-transform">
            <div className="mag-contact-bar h-2 w-full bg-rose-500 origin-left" />
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between font-sans text-xs text-zinc-500 mb-5 uppercase tracking-wider font-bold">
                  <span className="px-2 py-0.5 bg-rose-100 text-rose-950 rounded text-[10px]">02 / FORMAL INQUIRY</span>
                  <Mail className="h-4 w-4 text-rose-600" />
                </div>
                <div className="mag-contact-title font-display font-black text-2xl uppercase tracking-tight text-zinc-950">
                  Studio Email
                </div>
                <div className="font-sans text-xs text-zinc-700 font-semibold mt-2 truncate">
                  {profileData.personalInfo.email}
                </div>
                <div className="font-sans text-[11px] text-zinc-500 mt-1">
                  For formal project briefs & NDA documents
                </div>
              </div>

              <div className="mag-contact-btn pt-6 flex items-center gap-2">
                <a
                  href={`mailto:${profileData.personalInfo.email}?subject=${encodeURIComponent(`[Project Inquiry] Commissioning ${selectedService.toUpperCase()}`)}&body=${encodeURIComponent(getWaMessage())}`}
                  data-cursor-text="EMAIL"
                  className="flex-1 py-3 px-3 bg-rose-600 hover:bg-rose-700 text-white font-sans text-xs font-bold uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <span>Send Email</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={copyEmail}
                  className="p-3 border border-zinc-300 hover:border-zinc-950 rounded transition-all cursor-pointer text-zinc-700 hover:text-zinc-950"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Card 03: GitHub (Blue Accent) */}
          <div className="mag-contact-card group border border-zinc-950/15 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between rounded-xs overflow-hidden will-change-transform">
            <div className="mag-contact-bar h-2 w-full bg-blue-600 origin-left" />
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between font-sans text-xs text-zinc-500 mb-5 uppercase tracking-wider font-bold">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-950 rounded text-[10px]">03 / OPEN SOURCE</span>
                  <Code className="h-4 w-4 text-blue-600" />
                </div>
                <div className="mag-contact-title font-display font-black text-2xl uppercase tracking-tight text-zinc-950">
                  GitHub
                </div>
                <div className="font-sans text-xs text-zinc-700 font-semibold mt-2">
                  @sdwirisanggalih
                </div>
                <div className="font-sans text-[11px] text-zinc-500 mt-1">
                  Code repositories & open-source contributions
                </div>
              </div>

              <div className="mag-contact-btn pt-6">
                <a
                  href="https://github.com/sdwirisanggalih"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="GITHUB"
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-sans text-xs font-bold uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>View Repositories</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 04: LinkedIn (Purple Accent) */}
          <div className="mag-contact-card group border border-zinc-950/15 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between rounded-xs overflow-hidden will-change-transform">
            <div className="mag-contact-bar h-2 w-full bg-purple-600 origin-left" />
            <div className="p-6 sm:p-7 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between font-sans text-xs text-zinc-500 mb-5 uppercase tracking-wider font-bold">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-950 rounded text-[10px]">04 / PROFESSIONAL NETWORK</span>
                  <Globe className="h-4 w-4 text-purple-600" />
                </div>
                <div className="mag-contact-title font-display font-black text-2xl uppercase tracking-tight text-zinc-950">
                  LinkedIn
                </div>
                <div className="font-sans text-xs text-zinc-700 font-semibold mt-2">
                  /in/sdwirisanggalih
                </div>
                <div className="font-sans text-[11px] text-zinc-500 mt-1">
                  Career chronology & professional endorsements
                </div>
              </div>

              <div className="mag-contact-btn pt-6">
                <a
                  href="https://linkedin.com/in/sdwirisanggalih"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-text="LINKEDIN"
                  className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-sans text-xs font-bold uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <span>Visit LinkedIn Profile</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Colophon Credits Footnote */}
        <div className="border-t border-zinc-950/15 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-sans text-xs text-zinc-600 uppercase tracking-wider font-semibold">
          <div>
            © 2026 SEPTIAN DWI RISANGGALIH · INDEPENDENT STUDIO MONOGRAPH
          </div>
          <div className="flex items-center gap-4">
            <span className="px-2.5 py-0.5 bg-zinc-200 text-zinc-900 rounded font-bold text-[10px]">SET IN PLAYFAIR & SYNE</span>
            <span>·</span>
            <span>PUBLISHED DIGITALLY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
