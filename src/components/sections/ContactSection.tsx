"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Copy, Check, ArrowUpRight, ChevronUp, Terminal } from "lucide-react";
import { profileData } from "@/data/profile";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { personalInfo } = profileData;

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-32 px-6 md:px-12 lg:px-20 z-10 flex flex-col justify-between"
    >
      <div className="max-w-5xl mx-auto w-full my-auto">
        {/* Section Identifier */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase">
            // 05 INITIATE COMM PROTOCOL
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/40 to-transparent" />
        </div>

        {/* Hero Title */}
        <h2 className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase leading-[0.95] mb-8">
          LET&apos;S LAUNCH{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-glow-cyan">
            YOUR NEXT MISSION.
          </span>
        </h2>

        <p className="max-w-2xl text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-12">
          Seeking a senior engineering partner for agency builds, complex frontend architectures, or high-performance products? Transmission channels are open.
        </p>

        {/* Primary Contact Action Hub */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Email Action Card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-300 border border-cyan-400/20 group-hover:scale-110 transition-transform">
                <Mail className="h-6 w-6" />
              </div>
              <button
                onClick={copyEmail}
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-slate-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-cyan-400" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            <div className="font-mono text-xs text-slate-400 mb-1">DIRECT INBOX</div>
            <a
              href={`mailto:${personalInfo.email}`}
              className="font-sans font-bold text-xl sm:text-2xl text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2"
            >
              <span>{personalInfo.email}</span>
              <ArrowUpRight className="h-5 w-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* WhatsApp / Phone Action Card */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-purple-400/40 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-300 border border-purple-400/20 group-hover:scale-110 transition-transform">
                <Phone className="h-6 w-6" />
              </div>
              <div className="rounded-full border border-purple-400/30 bg-purple-950/40 px-3 py-1 font-mono text-xs text-purple-300">
                WHATSAPP READY
              </div>
            </div>

            <div className="font-mono text-xs text-slate-400 mb-1">INSTANT MESSAGING & CALL</div>
            <a
              href="https://wa.me/6285646444805"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-bold text-xl sm:text-2xl text-white group-hover:text-purple-300 transition-colors flex items-center gap-2"
            >
              <span>{personalInfo.phone}</span>
              <ArrowUpRight className="h-5 w-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Location & Status Bar */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <MapPin className="h-4 w-4 text-cyan-400" />
            <span>{personalInfo.location.raw}</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-400">REMOTE & HYBRID CAPABLE</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <Terminal className="h-3.5 w-3.5 text-purple-400" />
            <span>STATUS: READY FOR INTERVIEWS & CONTRACTS</span>
          </div>
        </div>
      </div>

      {/* Footer Telemetry */}
      <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} SEPTIAN DWI RISANGGALIH. BUILT WITH NEXT.JS 15, THREE.JS & GSAP.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <span>ORBIT TO TOP</span>
          <ChevronUp className="h-4 w-4" />
        </button>
      </footer>
    </section>
  );
}
