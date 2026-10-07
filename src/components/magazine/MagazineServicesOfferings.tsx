"use client";

import { useEffect, useRef, useState, useId } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Server, 
  Globe, 
  Smartphone, 
  Bot, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Sparkles,
  Activity,
  Send,
  CornerDownLeft,
  SmartphoneNfc,
  Layers,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

/* =========================================================================
   INTERACTIVE LIVE MICRO-WIDGET 01: SYSTEM & DASHBOARD TELEMETRY
   ========================================================================= */
function SystemTelemetryWidget() {
  const [activeTab, setActiveTab] = useState<"stream" | "db">("stream");
  const [reqCount, setReqCount] = useState(1420);

  useEffect(() => {
    const interval = setInterval(() => {
      setReqCount((prev) => prev + Math.floor(Math.random() * 9) - 3);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-zinc-950 text-white rounded-lg p-4 font-sans text-xs border border-blue-500/30 shadow-inner overflow-hidden select-none">
      {/* Console Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2.5 mb-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-ping" />
          <span className="font-extrabold uppercase tracking-wider text-[11px] text-blue-400">
            ENTERPRISE KERNEL // TELEMETRY
          </span>
        </div>
        <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
          <button
            onClick={() => setActiveTab("stream")}
            className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase transition-colors cursor-pointer ${
              activeTab === "stream" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Live Stream
          </button>
          <button
            onClick={() => setActiveTab("db")}
            className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase transition-colors cursor-pointer ${
              activeTab === "db" ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Postgres DB
          </button>
        </div>
      </div>

      {/* Tab 1: Live Event Stream & Animated Throughput Wave */}
      {activeTab === "stream" ? (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-zinc-900/90 rounded border border-zinc-800">
              <span className="text-[9px] text-zinc-400 block font-bold uppercase">LATENCY</span>
              <span className="font-display font-black text-blue-400 text-sm">24ms</span>
            </div>
            <div className="p-2 bg-zinc-900/90 rounded border border-zinc-800">
              <span className="text-[9px] text-zinc-400 block font-bold uppercase">THROUGHPUT</span>
              <span className="font-display font-black text-emerald-400 text-sm">{reqCount} req/s</span>
            </div>
            <div className="p-2 bg-zinc-900/90 rounded border border-zinc-800">
              <span className="text-[9px] text-zinc-400 block font-bold uppercase">CACHE HIT</span>
              <span className="font-display font-black text-yellow-400 text-sm">99.4%</span>
            </div>
          </div>

          {/* Animated SVG Pulse Graph */}
          <div className="relative h-12 w-full bg-zinc-900/60 rounded border border-zinc-800/80 flex items-center px-2 overflow-hidden">
            <svg viewBox="0 0 300 40" className="w-full h-full text-blue-500 overflow-visible">
              <path
                d="M 0 25 L 30 25 L 45 10 L 60 30 L 75 15 L 90 25 L 140 25 L 155 5 L 170 35 L 185 20 L 200 25 L 240 25 L 255 12 L 270 28 L 300 25"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="animate-[pulse_2s_ease-in-out_infinite]"
              />
            </svg>
            <div className="absolute right-2 bottom-1 text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
              WSS:// TELEMETRY 60FPS
            </div>
          </div>
        </div>
      ) : (
        /* Tab 2: Simulated PostgreSQL Schema & Query Execution */
        <div className="space-y-2 bg-zinc-900/90 p-2.5 rounded border border-zinc-800 font-mono text-[10px]">
          <div className="flex items-center justify-between text-zinc-400 border-b border-zinc-800 pb-1">
            <span className="text-blue-400 font-bold">SQL QUERY // ATOMIC TRANSACTION</span>
            <span className="text-emerald-400 font-bold">0.82ms</span>
          </div>
          <div className="text-zinc-300 leading-snug">
            <span className="text-purple-400">SELECT</span> id, status, total_amount <br />
            <span className="text-purple-400">FROM</span> enterprise_ledgers <br />
            <span className="text-purple-400">WHERE</span> tenant_id = <span className="text-emerald-400">&apos;id-7701&apos;</span>;
          </div>
          <div className="text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Connection Pool: 32 Active · 0 Idle Time</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   INTERACTIVE LIVE MICRO-WIDGET 02: WEBSITE 60FPS VIEWPORT & 3D LAYER
   ========================================================================= */
function WebsitePreviewWidget() {
  const [is3DMode, setIs3DMode] = useState(false);

  return (
    <div className="w-full bg-[#f4f1ea] rounded-lg p-4 font-sans text-xs border border-emerald-500/30 shadow-inner overflow-hidden select-none">
      {/* Browser Chrome Header */}
      <div className="flex items-center justify-between border-b border-zinc-300 pb-2.5 mb-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 font-mono text-[10px] text-zinc-500 bg-white/80 px-2 py-0.5 rounded border border-zinc-200">
            https://your-brand.com
          </span>
        </div>

        <button
          onClick={() => setIs3DMode(!is3DMode)}
          className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase transition-all cursor-pointer flex items-center gap-1 ${
            is3DMode
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-white text-zinc-700 border border-zinc-300 hover:border-zinc-950"
          }`}
        >
          <Layers className="h-2.5 w-2.5" />
          <span>{is3DMode ? "3D Exploded" : "Normal Web"}</span>
        </button>
      </div>

      {/* Simulated Hero Layout with 3D Transform */}
      <div
        className={`relative h-28 w-full bg-white rounded border border-zinc-200 p-3 flex flex-col justify-between transition-transform duration-500 ${
          is3DMode ? "[transform:perspective(600px)_rotateX(20deg)_rotateY(-12deg)_scale(0.96)] shadow-xl" : "shadow-xs"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-950 text-[8px] font-extrabold uppercase rounded">
              GSAP & THREE.JS 60FPS
            </span>
            <div className="font-display font-black text-sm text-zinc-950 uppercase tracking-tight">
              TACTILE DIGITAL BRANDING
            </div>
          </div>
          <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 animate-spin-slow shrink-0 shadow-sm" />
        </div>

        <div className="flex items-center justify-between text-[9px] text-zinc-600 border-t border-zinc-100 pt-1.5">
          <span className="font-bold flex items-center gap-1 text-emerald-700">
            <Activity className="h-3 w-3 text-emerald-600 animate-pulse" />
            <span>LIGHTHOUSE SCORE: 100 / 100</span>
          </span>
          <span className="font-extrabold text-zinc-950">SUB-SECOND TTI</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   INTERACTIVE LIVE MICRO-WIDGET 03: MOBILE APP SMARTPHONE MOCKUP
   ========================================================================= */
function AppPhoneWidget() {
  const [orderStage, setOrderStage] = useState<number>(2);

  const stages = [
    { label: "Order Received", status: "Verified" },
    { label: "IoT Telemetry Dispatch", status: "Charging 60kW" },
    { label: "Transaction Complete", status: "Receipt Sent" },
  ];

  const advanceStage = () => {
    setOrderStage((prev) => (prev + 1) % stages.length);
  };

  return (
    <div className="w-full bg-[#fdfbf7] rounded-lg p-4 font-sans text-xs border border-orange-500/30 shadow-inner overflow-hidden select-none">
      {/* Smartphone Chrome Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-2 mb-3">
        <div className="flex items-center gap-1.5 font-bold text-[10px] text-zinc-500">
          <SmartphoneNfc className="h-3.5 w-3.5 text-orange-600" />
          <span>REACT NATIVE // CROSS-PLATFORM</span>
        </div>
        <div className="font-mono text-[9px] font-bold text-zinc-500">
          iOS · ANDROID 99.8% SLA
        </div>
      </div>

      {/* Phone Screen Mockup Frame */}
      <div className="bg-white rounded-lg border-2 border-zinc-900 p-3 shadow-md space-y-2.5">
        {/* Notch / Dynamic Island */}
        <div className="w-20 h-2 bg-zinc-900 rounded-full mx-auto" />

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="font-sans text-[9px] font-extrabold text-orange-600 uppercase">
              LIVE TELEMETRY STATUS
            </div>
            <div className="font-display font-black text-xs text-zinc-950 uppercase">
              {stages[orderStage].label}
            </div>
          </div>
          <span className="px-2 py-0.5 bg-orange-100 text-orange-900 text-[9px] font-bold rounded">
            {stages[orderStage].status}
          </span>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
            style={{ width: `${((orderStage + 1) / stages.length) * 100}%` }}
          />
        </div>

        <button
          onClick={advanceStage}
          className="w-full py-1.5 bg-zinc-950 hover:bg-zinc-800 text-white rounded text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1"
        >
          <span>Tap to Simulate App Flow</span>
          <CornerDownLeft className="h-2.5 w-2.5" />
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   INTERACTIVE LIVE MICRO-WIDGET 04: BOT OTOMASI & AI CHAT SIMULATOR
   ========================================================================= */
function BotTerminalWidget() {
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string }>>([
    { sender: "user", text: "/system_status" },
    { sender: "bot", text: "⚡ All 10 microservices operational. Uptime 99.99%. DB query latency 14ms." },
  ]);

  const handleCommand = (cmd: string, reply: string) => {
    setMessages((prev) => [
      ...prev.slice(-2),
      { sender: "user", text: cmd },
      { sender: "bot", text: reply },
    ]);
  };

  return (
    <div className="w-full bg-[#1e1b2e] text-white rounded-lg p-4 font-sans text-xs border border-purple-500/30 shadow-inner overflow-hidden select-none">
      {/* Bot Chat Header */}
      <div className="flex items-center justify-between border-b border-purple-900/60 pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Bot className="h-3.5 w-3.5 text-purple-400" />
          <span className="font-extrabold uppercase tracking-wider text-[11px] text-purple-300">
            TELEGRAM / AI ENGINE 24/7
          </span>
        </div>
        <span className="px-2 py-0.5 bg-purple-950 text-purple-300 border border-purple-700/50 rounded text-[9px] font-bold">
          AUTONOMOUS
        </span>
      </div>

      {/* Chat Messages Feed */}
      <div className="space-y-2 h-24 overflow-y-auto pr-1">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] px-2.5 py-1.5 rounded text-[10px] leading-relaxed ${
                m.sender === "user"
                  ? "bg-purple-600 text-white font-mono"
                  : "bg-zinc-800/90 text-purple-200 border border-purple-800/40"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Interactive Command Buttons */}
      <div className="pt-2.5 border-t border-purple-900/60 flex items-center gap-1.5">
        <span className="text-[9px] font-bold text-purple-400 uppercase">Commands:</span>
        <button
          onClick={() => handleCommand("/report", "📊 Daily summary: 1,420 successful transactions. Volume $48.2K.")}
          className="px-2 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-[9px] font-mono font-bold transition-colors cursor-pointer"
        >
          /report
        </button>
        <button
          onClick={() => handleCommand("/dispatch", "🚀 Automated messages dispatched to 1,500 recipients.")}
          className="px-2 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-[9px] font-mono font-bold transition-colors cursor-pointer"
        >
          /dispatch
        </button>
        <button
          onClick={() => handleCommand("/ai_ask", "🤖 AI Analysis: User engagement velocity increased 28% week-over-week.")}
          className="px-2 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-[9px] font-mono font-bold transition-colors cursor-pointer"
        >
          /ai_ask
        </button>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN SECTION COMPONENT: SECTION 03 SERVICES OFFERINGS
   ========================================================================= */

interface ServiceCardData {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  badge: string;
  badgeColor: string;
  themeColor: string;
  barColor: string;
  accentBorder: string;
  btnBg: string;
  btnHover: string;
  btnShadow: string;
  icon: typeof Server;
  deliverables: string[];
  techStack: string[];
  timeline: string;
  whatsappMessage: string;
  renderWidget: () => React.ReactNode;
}

const SERVICES_DATA: ServiceCardData[] = [
  {
    id: "system",
    name: "ENTERPRISE SYSTEMS & DASHBOARDS",
    category: "01 // SYSTEM & BACKEND",
    tagline: "High-Throughput Business Systems, ERP/CRM & Real-Time Dashboards",
    description:
      "Engineering integrated enterprise resource planning (ERP), real-time analytics dashboards, multi-tenant SaaS architectures, high-concurrency point-of-sale (POS) systems, and distributed microservices with mission-critical SLA.",
    badge: "ENTERPRISE 99.8% SLA",
    badgeColor: "bg-blue-100 text-blue-950 border-blue-300",
    themeColor: "text-blue-600",
    barColor: "bg-blue-600",
    accentBorder: "border-blue-200 hover:border-blue-500",
    btnBg: "bg-blue-600",
    btnHover: "hover:bg-blue-700",
    btnShadow: "shadow-[0_8px_25px_rgba(37,99,235,0.3)]",
    icon: Server,
    deliverables: [
      "Responsive Web-Based Admin Dashboards, CRM & ERP Suites",
      "Distributed Golang/Node.js Microservices & PostgreSQL/Redis Architecture",
      "Payment Gateway Integrations, Automated Invoicing & Real-Time Reporting",
      "Security Audits, Cryptographic JWT Authentication & Role-Based Access Control",
    ],
    techStack: ["Next.js", "Golang", "Node.js", "PostgreSQL", "Redis", "Docker", "WebSockets"],
    timeline: "2 — 6 Weeks",
    whatsappMessage: "Hello Septian, I would like to consult and commission an ENTERPRISE SYSTEM / DASHBOARD / BACKEND project.",
    renderWidget: () => <SystemTelemetryWidget />,
  },
  {
    id: "website",
    name: "MODERN & INTERACTIVE WEBSITES",
    category: "02 // WEBSITE & WEB APP",
    tagline: "Ultra-Fast 60fps Landing Pages, Company Profiles & 3D Web Apps",
    description:
      "Crafting world-class bespoke websites with tactile 60fps WebGL animations, sub-second first-contentful paint, high-conversion visual storytelling, and comprehensive SEO optimization.",
    badge: "60FPS INTERACTIVE",
    badgeColor: "bg-emerald-100 text-emerald-950 border-emerald-300",
    themeColor: "text-emerald-600",
    barColor: "bg-emerald-600",
    accentBorder: "border-emerald-200 hover:border-emerald-500",
    btnBg: "bg-emerald-600",
    btnHover: "hover:bg-emerald-700",
    btnShadow: "shadow-[0_8px_25px_rgba(5,150,105,0.3)]",
    icon: Globe,
    deliverables: [
      "High-Conversion Editorial Landing Pages & Corporate Portals",
      "Silky Smooth 3D WebGL Interactions (Three.js & GSAP Animation Pipelines)",
      "Lighthouse 95+ Performance Scores (Ultra-Fast & SEO-Optimized)",
      "Responsive Multi-Device Layouts with Streamlined Content Management",
    ],
    techStack: ["Next.js 15", "React 19", "Three.js", "GSAP", "Tailwind CSS", "TypeScript"],
    timeline: "1 — 3 Weeks",
    whatsappMessage: "Hello Septian, I would like to consult and commission a modern WEBSITE / WEB APP project.",
    renderWidget: () => <WebsitePreviewWidget />,
  },
  {
    id: "app",
    name: "MOBILE APPLICATIONS (ANDROID & IOS)",
    category: "03 // MOBILE APPS",
    tagline: "Cross-Platform React Native, IoT Telemetry & Fluid Mobile Experiences",
    description:
      "Building fluid cross-platform iOS and Android applications with native performance from a unified codebase. Battle-tested for high-traffic consumer workflows, IoT hardware telemetry, GPS mapping, and in-app checkouts.",
    badge: "CROSS-PLATFORM NATIVE",
    badgeColor: "bg-orange-100 text-orange-950 border-orange-300",
    themeColor: "text-orange-600",
    barColor: "bg-orange-500",
    accentBorder: "border-orange-200 hover:border-orange-500",
    btnBg: "bg-orange-600",
    btnHover: "hover:bg-orange-700",
    btnShadow: "shadow-[0_8px_25px_rgba(234,88,12,0.3)]",
    icon: Smartphone,
    deliverables: [
      "Production-Ready Android (APK/AAB) & iOS (IPA) App Store Deployments",
      "IoT Hardware Telemetry, Bluetooth Low Energy & Barcode/QR Scanning",
      "Interactive Map Navigation, Geo-Fencing & Real-Time Fleet Tracking",
      "Offline-First State Synchronization & Resilient Network Resilience",
    ],
    techStack: ["React Native", "TypeScript", "Redux/Zustand", "Maps SDK", "Socket.IO", "REST APIs"],
    timeline: "3 — 8 Weeks",
    whatsappMessage: "Hello Septian, I would like to consult and commission a MOBILE APPLICATION (Android / iOS) project.",
    renderWidget: () => <AppPhoneWidget />,
  },
  {
    id: "bot",
    name: "AUTOMATION BOTS & AI ASSISTANTS",
    category: "04 // BOTS & AUTOMATION",
    tagline: "Telegram, WhatsApp Business, Discord & Automated Task Engines",
    description:
      "Architecting autonomous 24/7 task engines, automated customer service dispatchers, scheduled market intelligence crawlers, LLM/AI reasoning agents, and transactional webhook triggers without manual intervention.",
    badge: "24/7 AUTONOMOUS",
    badgeColor: "bg-purple-100 text-purple-950 border-purple-300",
    themeColor: "text-purple-600",
    barColor: "bg-purple-600",
    accentBorder: "border-purple-200 hover:border-purple-500",
    btnBg: "bg-purple-600",
    btnHover: "hover:bg-purple-700",
    btnShadow: "shadow-[0_8px_25px_rgba(124,58,237,0.3)]",
    icon: Bot,
    deliverables: [
      "Interactive Telegram & WhatsApp Business Bots with Transaction Menus",
      "Automated Web Scraping, Real-Time Data Crawlers & Anomaly Alerts",
      "Scheduled Notifications (Financial Summaries, Crypto/Stock Telemetry, Order Feeds)",
      "OpenAI / Claude / DeepSeek Integration for Autonomous Customer Support",
    ],
    techStack: ["Node.js", "Python", "Golang", "Telegram Bot API", "WhatsApp API", "Webhooks"],
    timeline: "3 — 10 Days",
    whatsappMessage: "Hello Septian, I would like to consult and commission an AUTOMATION BOT (Telegram / WhatsApp / AI) project.",
    renderWidget: () => <BotTerminalWidget />,
  },
];

export default function MagazineServicesOfferings() {
  const sectionRef = useRef<HTMLElement>(null);
  const focalRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerInstanceRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeIndexRef = useRef<number>(0);

  // Exact center dwell progress coordinates for all 4 cards
  const SNAP_POINTS = [0.0, 0.3333, 0.602, 0.85];

  const scrollToCard = (index: number) => {
    if (!scrollTriggerInstanceRef.current) return;
    const st = scrollTriggerInstanceRef.current;
    const targetProgress = SNAP_POINTS[index] ?? 0;
    const targetScroll = st.start + (st.end - st.start) * targetProgress;

    if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetScroll, { duration: 2.0, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

      if (!section || cards.length === 0) return;

      const getTravelDist = () => {
        return typeof window !== "undefined" ? Math.max(460, window.innerWidth * 0.45) : 480;
      };

      const travelDist = getTravelDist();

      // Card 0 starts locked in dead center, zoomed in, sharp 0px blur
      gsap.set(cards[0], {
        x: 0,
        y: 0,
        scale: 1.10,
        opacity: 1,
        filter: "blur(0px)",
        zIndex: 30,
      });

      // Cards 1, 2, 3 wait offstage to the right
      for (let i = 1; i < cards.length; i++) {
        gsap.set(cards[i], {
          x: travelDist,
          y: 0,
          scale: 0.82,
          opacity: 0,
          filter: "blur(16px)",
          zIndex: 10,
        });
      }

      // Optimized: tiap scroll ada gerakan, transisi tetap pelan
      const tl = gsap.timeline({
        scrollTrigger: {
          id: "section03-repetitive-showcase",
          trigger: section,
          start: "top top",
          end: "+=2400",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            // Even split: tiap ~25% scroll langsung ganti card - tidak perlu banyak scroll
            let nextIndex = 0;
            if (p < 0.25) {
              nextIndex = 0;
            } else if (p < 0.50) {
              nextIndex = 1;
            } else if (p < 0.75) {
              nextIndex = 2;
            } else {
              nextIndex = 3;
            }
            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        },
      });

      scrollTriggerInstanceRef.current = tl.scrollTrigger as ScrollTrigger;

      // Card 0 Hold - dipersingkat agar tidak perlu banyak scroll untuk ganti
      tl.to({}, { duration: 0.6 });

      // Step 0 -> 1: Card 0 moves to exit position, Card 1 enters to Center Zoom (Perlahan 1.4s)
      tl.to(
        cards[0],
        {
          x: -travelDist,
          scale: 0.82,
          opacity: 0,
          filter: "blur(16px)",
          duration: 1.4,
          ease: "power2.inOut",
          onStart: () => {
            cards[0].style.pointerEvents = "none";
            cards[0].style.zIndex = "10";
          },
        },
        "step0to1"
      );
      tl.to(
        cards[1],
        {
          x: 0,
          scale: 1.10,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.inOut",
          onStart: () => {
            cards[1].style.pointerEvents = "auto";
            cards[1].style.zIndex = "30";
          },
        },
        "step0to1"
      );

      // Card 1 Hold - dipersingkat
      tl.to({}, { duration: 0.6 });

      // Step 1 -> 2: Card 1 moves to exit position, Card 2 enters to Center Zoom (tetap pelan 1.4s)
      tl.to(
        cards[1],
        {
          x: -travelDist,
          scale: 0.82,
          opacity: 0,
          filter: "blur(16px)",
          duration: 1.4,
          ease: "power2.inOut",
          onStart: () => {
            cards[1].style.pointerEvents = "none";
            cards[1].style.zIndex = "10";
          },
        },
        "step1to2"
      );
      tl.to(
        cards[2],
        {
          x: 0,
          scale: 1.10,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.inOut",
          onStart: () => {
            cards[2].style.pointerEvents = "auto";
            cards[2].style.zIndex = "30";
          },
        },
        "step1to2"
      );

      // Card 2 Hold - dipersingkat
      tl.to({}, { duration: 0.6 });

      // Step 2 -> 3: Card 2 moves to exit position, Card 3 enters to Center Zoom (Perlahan 1.4s)
      tl.to(
        cards[2],
        {
          x: -travelDist,
          scale: 0.82,
          opacity: 0,
          filter: "blur(16px)",
          duration: 1.4,
          ease: "power2.inOut",
          onStart: () => {
            cards[2].style.pointerEvents = "none";
            cards[2].style.zIndex = "10";
          },
        },
        "step2to3"
      );
      tl.to(
        cards[3],
        {
          x: 0,
          scale: 1.10,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.inOut",
          onStart: () => {
            cards[3].style.pointerEvents = "auto";
            cards[3].style.zIndex = "30";
          },
        },
        "step2to3"
      );

      // Card 3 Hold - dipersingkat
      tl.to({}, { duration: 0.9 });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openWhatsApp = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/6285646444805?text=${encoded}`, "_blank");
  };

  return (
    <section
      id="mag-services"
      ref={sectionRef}
      className="relative w-full h-screen min-h-[640px] max-h-screen bg-[#faf9f6] text-zinc-950 font-sans border-b border-zinc-950/15 overflow-hidden flex flex-col justify-between select-none"
    >
      {/* 1. Compact Editorial Header Monograph with Quick Jump Navigation */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 pt-5 sm:pt-6 pb-3 border-b border-zinc-950/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shrink-0 z-30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-950 border border-blue-300 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
              <span>SECTION 03 · COMMERCIAL SERVICES & ENGINEERING</span>
            </span>
            <span className="text-[10px] font-mono font-extrabold text-blue-700 bg-blue-50/90 border border-blue-200 px-2.5 py-0.5 rounded shadow-2xs">
              ACTIVE 0{activeIndex + 1} / 0{SERVICES_DATA.length}: {SERVICES_DATA[activeIndex]?.name}
            </span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black text-zinc-950 tracking-tight uppercase leading-tight">
            SERVICES & COMMISSIONS:{" "}
            <span className="font-serif italic font-normal text-zinc-700 underline decoration-blue-600 decoration-2 underline-offset-4">
              SYSTEM · WEBSITE · APP · BOT
            </span>
          </h2>
        </div>

        {/* Quick Step Buttons for Effortless Zero-Effort Centering */}
        <div className="flex items-center gap-2 self-stretch md:self-auto justify-between md:justify-end">
          <div className="flex items-center gap-1.5 bg-white border border-zinc-300/80 p-1 rounded shadow-2xs">
            {SERVICES_DATA.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => scrollToCard(idx)}
                data-cursor-text={`0${idx + 1}`}
                className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded transition-all cursor-pointer ${
                  activeIndex === idx
                    ? "bg-blue-600 text-white shadow-xs scale-105"
                    : "text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100"
                }`}
              >
                0{idx + 1} {srv.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Prev / Next Quick Arrow Jumpers */}
          <div className="flex items-center gap-1 bg-white border border-zinc-300/80 p-1 rounded shadow-2xs">
            <button
              onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous service card"
              className="p-1 rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => scrollToCard(Math.min(SERVICES_DATA.length - 1, activeIndex + 1))}
              disabled={activeIndex === SERVICES_DATA.length - 1}
              aria-label="Next service card"
              className="p-1 rounded text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Pinned Stage Area with Focal Reference Indicator */}
      <div className="relative flex-1 w-full min-h-0 overflow-hidden flex items-center justify-center">
        
        {/* Visual Focal Target / Reference Frame marking the unblurred center position */}
        <div
          ref={focalRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] sm:w-[680px] md:w-[840px] lg:w-[940px] xl:w-[1020px] h-[510px] sm:h-[540px] lg:h-[570px] z-10 flex flex-col justify-between border-2 border-dashed border-blue-500/25 rounded-xl transition-all duration-300"
        >
          {/* Top Registration Brackets & Real-Time Center Lock Status */}
          <div className="flex items-center justify-between px-3 -mt-3.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-t-2 border-l-2 border-blue-600" />
              <span className="font-mono text-[9px] font-black tracking-widest text-blue-600 uppercase bg-blue-50/95 px-2.5 py-0.5 rounded border border-blue-300 shadow-2xs flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                <span>FOCAL ZONE // 0PX BLUR CENTER</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-black tracking-wider uppercase bg-white/95 text-blue-700 px-2.5 py-0.5 rounded border border-blue-200 shadow-2xs flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>CARD 0{activeIndex + 1} CENTER LOCKED</span>
              </span>
              <div className="w-5 h-5 border-t-2 border-r-2 border-blue-600" />
            </div>
          </div>

          {/* Center Reticles */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1 text-blue-600 bg-white/80 px-1.5 py-0.5 rounded border border-blue-100 shadow-2xs">
              <span className="w-3 h-0.5 bg-blue-600" />
              <span className="text-[8px] font-mono font-black">CENTER 0PX</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 bg-white/80 px-1.5 py-0.5 rounded border border-blue-100 shadow-2xs">
              <span className="text-[8px] font-mono font-black">HERO ZOOM</span>
              <span className="w-3 h-0.5 bg-blue-600" />
            </div>
          </div>

          {/* Bottom Registration Brackets */}
          <div className="flex items-center justify-between px-3 -mb-3.5">
            <div className="w-5 h-5 border-b-2 border-l-2 border-blue-600" />
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold text-zinc-600 uppercase tracking-widest bg-white/95 px-2.5 py-0.5 rounded border border-zinc-200 shadow-2xs">
                110% SCALE · MAGNETIC SNAPPED
              </span>
              <div className="w-5 h-5 border-b-2 border-r-2 border-blue-600" />
            </div>
          </div>
        </div>

        {/* Staged Cards: Stacked and Choreographed Sequentially via GSAP */}
        <div className="relative w-full h-full flex items-center justify-center">
          {SERVICES_DATA.map((srv, idx) => {
            const Icon = srv.icon;

            return (
              <div
                key={srv.id}
                className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 sm:p-5"
              >
                <div
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`mag-staged-service-card group relative bg-white border-2 rounded-lg transition-[border-color,box-shadow] duration-300 will-change-[transform,filter,opacity] overflow-hidden ${srv.accentBorder} w-[88vw] sm:w-[640px] md:w-[800px] lg:w-[900px] xl:w-[980px] max-h-[calc(100vh-190px)] shadow-[0_25px_70px_rgba(0,0,0,0.12)]`}
                  style={{
                    pointerEvents: activeIndex === idx ? "auto" : "none",
                    zIndex: activeIndex === idx ? 30 : 10,
                  }}
                >
                  {/* Laser Sweep Chromatic Top Accent Bar */}
                  <div className={`h-2.5 w-full ${srv.barColor}`} />

                  {/* Card Interior Grid (2-Columns on md+) */}
                  <div className="p-5 sm:p-7 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-center overflow-y-auto max-h-[calc(100vh-215px)] md:max-h-none">
                    {/* Left Column: Specs, Deliverables, Tech Stack & CTA */}
                    <div className="md:col-span-6 lg:col-span-7 flex flex-col justify-between space-y-4">
                      <div>
                        {/* Category Header & Badge */}
                        <div className="flex items-center justify-between border-b border-zinc-200/80 pb-3 mb-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`p-1.5 rounded bg-white border border-zinc-200 shadow-2xs ${srv.themeColor}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <span className="font-sans text-[11px] font-black tracking-wider uppercase text-zinc-500">
                              {srv.category}
                            </span>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border shadow-2xs ${srv.badgeColor}`}
                          >
                            {srv.badge}
                          </span>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-950 uppercase tracking-tight mb-1 group-hover:text-blue-600 transition-colors">
                          {srv.name}
                        </h3>

                        <div className="font-sans text-[11px] font-bold text-zinc-700 uppercase tracking-wider mb-2">
                          {srv.tagline}
                        </div>

                        <p className="font-sans text-xs text-zinc-600 leading-relaxed mb-4">
                          {srv.description}
                        </p>

                        {/* Key Deliverables Bullet Points */}
                        <div className="space-y-1.5 mb-4 pt-2.5 border-t border-zinc-200/60">
                          <div className="font-sans text-[9px] uppercase font-extrabold tracking-widest text-zinc-400">
                            CORE DELIVERABLES & IMPACT
                          </div>
                          {srv.deliverables.slice(0, 3).map((item, dIdx) => (
                            <div
                              key={dIdx}
                              className="flex items-start gap-2 text-[11px] text-zinc-800 leading-snug"
                            >
                              <CheckCircle2
                                className={`h-3.5 w-3.5 ${srv.themeColor} shrink-0 mt-0.5`}
                              />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        {/* Core Tech Stack Pills */}
                        <div className="mb-2">
                          <div className="font-sans text-[9px] uppercase font-extrabold tracking-widest text-zinc-400 mb-1.5">
                            CORE STACK
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {srv.techStack.map((tech, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 bg-zinc-50 border border-zinc-200 rounded text-[9px] font-bold text-zinc-700 shadow-2xs"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Timeline & WhatsApp CTA Button */}
                      <div className="pt-3 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 font-sans text-[11px] text-zinc-500 font-semibold">
                          <Clock className="h-3 w-3 text-zinc-400" />
                          <span>
                            Timeline:{" "}
                            <strong className="text-zinc-900 font-bold">
                              {srv.timeline}
                            </strong>
                          </span>
                        </div>

                        <button
                          onClick={() => openWhatsApp(srv.whatsappMessage)}
                          data-cursor-text="ORDER"
                          className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-white rounded font-sans text-xs font-bold uppercase tracking-wider ${srv.btnBg} ${srv.btnHover} ${srv.btnShadow} transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-xs`}
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Inquire & Commission Project</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Live Interactive Simulation Widget */}
                    <div className="md:col-span-6 lg:col-span-5 h-full flex flex-col justify-center">
                      <div className="p-3 bg-zinc-50/80 rounded-md border border-zinc-200 shadow-inner">
                        {srv.renderWidget()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
