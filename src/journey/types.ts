export type JourneyStage =
  | "the-void"
  | "take-off"
  | "experience-waypoints"
  | "tech-lab"
  | "project-portal"
  | "projects"
  | "about"
  | "contact"
  | "departure"
  | "end-screen";

export interface ExperienceWaypoint {
  id?: string;
  type?: "milestone" | "featured-project";
  projectNumber?: string;
  year: string;
  domain: string;
  company: string;
  role: string;
  description: string;
  tech: string[];
  deliverables?: string[];
  image?: string;
  gallery?: string[];
}

export interface TechNode {
  category: "Frontend" | "Backend" | "Database" | "Mobile";
  name: string;
  detail: string;
  position: [number, number, number];
}

export interface JourneyProject {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  description: string;
  role: string;
  stack: string[];
  deliverables: string[];
}

export const EXPERIENCE_WAYPOINTS: ExperienceWaypoint[] = [
  {
    type: "milestone",
    year: "2022",
    domain: "BANKING & FINANCE",
    company: "PT Infosys Solusi Terpadu",
    role: "Frontend Developer",
    description:
      "Built enterprise digital banking portals, high-security transaction interfaces, and e-debit platforms for CIMB Niaga (Octo Clicks).",
    tech: ["React", "TypeScript", "Redux", "Material UI", "Axios", "REST APIs"],
    deliverables: [
      "Engineered secure cryptographic e-debit & OTP transaction flows for CIMB Niaga Octo Clicks",
      "Optimized legacy corporate portal latency with componentized React architecture",
      "Implemented strict banking audit logs and PCI-DSS compliance UI checks",
    ],
    image: "/porto/OC.jpg",
  },
  {
    type: "milestone",
    year: "2023",
    domain: "EDUCATION PLATFORMS",
    company: "PT Natieva Global International",
    role: "IT Programmer",
    description:
      "Architected course certification hubs (Luna Sinarmas) and student live learning platforms with real-time scheduling.",
    tech: ["Next.js", "Zustand", "Tailwind CSS", "Laravel", "React Query"],
    deliverables: [
      "Built real-time video classroom schedule sync with Zustand state cache for Luna by MSIG Life",
      "Developed full-stack LMS dashboards, mobile learning app, and CMS platforms for Natieva & Natieva Kids",
      "Reduced bundle payload by 42% through lazy-loaded module federation",
    ],
    image: "/porto/natieva.jpeg",
    gallery: [
      "/porto/natieva.jpeg",
      "/porto/luna.png",
      "/porto/natieva-mobile.png",
      "/porto/natieva-kids.jpg",
    ],
  },
  {
    type: "milestone",
    year: "2024",
    domain: "EV CHARGING INFRASTRUCTURE",
    company: "CV Technopartner Indonesia",
    role: "Senior Frontend Developer",
    description:
      "Spearheaded mobile development for Casion EV, managing charging station telemetry and live driver interaction.",
    tech: ["React Native", "Redux", "REST APIs", "IoT Telemetry", "Maps"],
    deliverables: [
      "Integrated IoT telemetry websockets for real-time kWh and charging station status",
      "Constructed native map navigation with geo-fenced charger reservation and barcode scanning",
      "Deployed cross-platform React Native codebase with 99.8% crash-free sessions",
    ],
    image: "/porto/casion.png",
  },
  {
    type: "milestone",
    year: "2024",
    domain: "LOYALTY & REWARDS",
    company: "CV Technopartner Indonesia",
    role: "Senior Frontend Developer",
    description:
      "Engineered multi-tier reward engines, voucher redemption pipelines, and business analytics dashboards (DDT & Zu Point).",
    tech: ["React.js", "React Native", "TypeScript", "Zustand"],
    deliverables: [
      "Engineered atomic point ledger redemption across multi-merchant POS terminals",
      "Developed high-conversion voucher scratch cards and tier progression animations",
      "Built executive revenue analytics dashboards with sub-second chart rendering",
    ],
    image: "/milestones/ddt-rewards.svg",
  },
  {
    id: "behave",
    type: "featured-project",
    projectNumber: "01",
    year: "2024",
    domain: "FEATURED WORK · BEHAVE",
    company: "CV Technopartner Indonesia",
    role: "Senior Fullstack Developer",
    description:
      "A comprehensive digital enterprise platform for promotions, reservations, vouchers, and member transaction workflows.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Go"],
    deliverables: [
      "Designed member reward workflows and voucher redemption engines",
      "Integrated secure payment and merchant transaction handling",
      "Engineered merchant CMS dashboards with exportable analytics",
    ],
    image: "/milestones/behave-saas.svg",
  },
  {
    type: "milestone",
    year: "2025",
    domain: "FOOD SERVICE ECOSYSTEMS",
    company: "Independent Enterprise",
    role: "Fullstack Developer",
    description:
      "Constructed a high-concurrency steak restaurant web ordering architecture with live kitchen displays via WebSockets.",
    tech: ["React.js", "Socket.IO", "Node.js", "PostgreSQL"],
    deliverables: [
      "Built zero-latency kitchen display system (KDS) powered by Socket.IO events",
      "Architected table-side QR ordering pipeline with optimistic state updates",
      "Eliminated order drop rates during peak dining rush hours through auto-retry queues",
    ],
    image: "/milestones/steak-kds.svg",
  },
  {
    id: "shihlin",
    type: "featured-project",
    projectNumber: "02",
    year: "2025",
    domain: "FEATURED WORK · SHIHLIN",
    company: "CV Technopartner Indonesia",
    role: "Lead Frontend Engineer",
    description:
      "Fast-service dining mobile ordering app supporting menu exploration, queue tracking, and real-time counter notifications.",
    tech: ["React Native", "TypeScript", "Redux Toolkit", "Socket.IO"],
    deliverables: [
      "Built fluid mobile UI optimized for high-traffic food ordering",
      "Connected live socket channel for kitchen status updates",
      "Handled offline state recovery and cart reconciliation",
    ],
    image: "/milestones/shihlin-app.svg",
  },
  {
    type: "milestone",
    year: "2026",
    domain: "DIGITAL COMMERCE & GAMING",
    company: "Independent Enterprise",
    role: "Fullstack Architect",
    description:
      "Engineered end-to-end game top-up platform with Golang microservices and automated WhatsApp notification bots.",
    tech: ["Next.js", "Golang", "PostgreSQL", "WhatsApp API"],
    deliverables: [
      "Architected high-throughput Golang microservice handling 1,500+ orders/min",
      "Automated transactional WhatsApp receipt delivery using webhook dispatchers",
      "Implemented PostgreSQL connection pooling and ACID-compliant wallet balances",
    ],
    image: "/milestones/golang-microservices.svg",
  },
  {
    id: "game-topup",
    type: "featured-project",
    projectNumber: "03",
    year: "2026",
    domain: "FEATURED WORK · GAME TOP-UP",
    company: "Independent Enterprise",
    role: "Fullstack Architect",
    description:
      "A high-throughput digital games marketplace integrated with Golang backend services and automated WhatsApp delivery bots.",
    tech: ["Next.js", "TypeScript", "Golang", "PostgreSQL", "WhatsApp API"],
    deliverables: [
      "Built instant top-up checkout with asynchronous transaction processing",
      "Engineered Golang REST microservice with PostgreSQL transactions",
      "Deployed automated WhatsApp bot for payment verification & receipt dispatch",
    ],
    image: "/milestones/game-topup.svg",
  },
];

export const TECH_NODES: TechNode[] = [
  // Frontend
  { category: "Frontend", name: "React 19", detail: "Component Architecture & Concurrent Mode", position: [-2.2, 1.2, 0] },
  { category: "Frontend", name: "Next.js 15", detail: "App Router, SSR, Turbopack Architecture", position: [-1.4, 0.4, 0.4] },
  { category: "Frontend", name: "TypeScript", detail: "Strict Typing, Generic System Contracts", position: [-0.6, 1.4, -0.2] },

  // Backend
  { category: "Backend", name: "Golang", detail: "Concurrent Microservices & Low Latency APIs", position: [0.6, 1.3, -0.3] },
  { category: "Backend", name: "Hono", detail: "Ultrafast Edge API Framework & TypeScript RPC", position: [1.1, 0.9, 0.1] },
  { category: "Backend", name: "Node.js", detail: "Event-driven Asynchronous Backend Architecture", position: [1.6, 0.5, 0.3] },
  { category: "Backend", name: "Laravel", detail: "Enterprise MVC & Secure API Services", position: [2.2, 1.1, 0] },

  // Database
  { category: "Database", name: "PostgreSQL", detail: "Relational Schemas, Indexing & Transactions", position: [-1.2, -0.8, 0.2] },
  { category: "Database", name: "Redis", detail: "Distributed In-Memory Cache & Session Management", position: [-0.4, -1.3, -0.2] },

  // Mobile
  { category: "Mobile", name: "React Native", detail: "Cross-Platform iOS & Android Native Core", position: [0.6, -1.2, -0.1] },
  { category: "Mobile", name: "Expo", detail: "Mobile Runtime, OTA Updates & Native Modules", position: [1.4, -0.7, 0.3] },
];

export const JOURNEY_PROJECTS: JourneyProject[] = [
  {
    id: "behave",
    number: "01",
    name: "BEHAVE",
    subtitle: "LOYALTY PLATFORM",
    description:
      "A comprehensive digital enterprise platform for promotions, reservations, vouchers, and member transaction workflows.",
    role: "Senior Fullstack Developer",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Go"],
    deliverables: [
      "Designed member reward workflows and voucher redemption engines",
      "Integrated secure payment and merchant transaction handling",
      "Engineered merchant CMS dashboards with exportable analytics",
    ],
  },
  {
    id: "shihlin",
    number: "02",
    name: "SHIHLIN",
    subtitle: "MOBILE ORDERING",
    description:
      "Fast-service dining mobile ordering app supporting menu exploration, queue tracking, and real-time counter notifications.",
    role: "Lead Frontend Engineer",
    stack: ["React Native", "TypeScript", "Redux Toolkit", "Socket.IO"],
    deliverables: [
      "Built fluid mobile UI optimized for high-traffic food ordering",
      "Connected live socket channel for kitchen status updates",
      "Handled offline state recovery and cart reconciliation",
    ],
  },
  {
    id: "game-topup",
    number: "03",
    name: "GAME TOP-UP",
    subtitle: "DIGITAL COMMERCE",
    description:
      "A high-throughput digital games marketplace integrated with Golang backend services and automated WhatsApp delivery bots.",
    role: "Fullstack Architect",
    stack: ["Next.js", "TypeScript", "Golang", "PostgreSQL", "WhatsApp API"],
    deliverables: [
      "Built instant top-up checkout with asynchronous transaction processing",
      "Engineered Golang REST microservice with PostgreSQL transactions",
      "Deployed automated WhatsApp bot for payment verification & receipt dispatch",
    ],
  },
];

