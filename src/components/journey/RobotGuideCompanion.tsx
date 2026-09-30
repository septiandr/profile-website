"use client";

import { useEffect, useState } from "react";
import { Bot, Sparkles, MessageSquare } from "lucide-react";
import { JourneyStage } from "@/journey/types";

interface RobotGuideProps {
  stage: JourneyStage;
  currentAction: string;
  onActionChange: (action: string) => void;
}

export default function RobotGuideCompanion({
  stage,
  currentAction,
  onActionChange,
}: RobotGuideProps) {
  const [displayText, setDisplayText] = useState<string>("");

  const speechMessages: Record<JourneyStage, string> = {
    "the-void": "GREETINGS! I AM RISANGGALIH'S AUTONOMOUS GUIDE. WELCOME TO HIS JOURNEY.",
    "take-off": "WARP ENGINES ENGAGED. PREPARING EXPEDITION SCAN.",
    "experience-waypoints": "5+ YEARS OF PRODUCTION DATA DETECTED. REVIEWING ARCHITECTURAL MILESTONES.",
    "tech-lab": "SCANNING CORE ENGINES: REACT, NEXT.JS, GOLANG, NODE.JS & DATABASES.",
    "project-portal": "ALL SYSTEMS CALIBRATED. OPENING PROJECT EXPEDITION DESTINATIONS.",
    projects: "OBSERVING FULLSTACK ENTERPRISE BUILDS: BEHAVE, SHIHLIN & GAME TOP-UP.",
    about: "MEET SEPTIAN DWI RISANGGALIH: SENIOR FRONTEND & FULLSTACK ARCHITECT.",
    contact: "TRANSMISSION CHANNELS READY. LET'S BUILD SOMETHING GREAT TOGETHER!",
    departure: "MISSION DEPLOYMENT ARCHIVED. COMMENCING CELEBRATION DANCE!",
    "end-screen": "MISSION LOG SAVED. CLICK RESTART TO RELIVE THE JOURNEY.",
  };

  const message = speechMessages[stage] || speechMessages["the-void"];

  // Typewriter kinetic text effect for Robot's speech
  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const timer = setInterval(() => {
      if (i < message.length) {
        setDisplayText(message.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 22);

    return () => clearInterval(timer);
  }, [message]);

  const cycleAction = () => {
    const list = ["Wave", "ThumbsUp", "Dance", "Jump", "WalkJump", "Yes"];
    const idx = list.indexOf(currentAction);
    const next = list[(idx + 1) % list.length];
    onActionChange(next);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm pointer-events-auto">
      <div className="border border-solar-500/40 bg-obsidian-950/90 p-4 rounded-xl shadow-[0_10px_35px_rgba(245,158,11,0.15)] backdrop-blur-xl">
        {/* Header / Companion Tag */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-solar-400 animate-ping" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-solar-400 font-bold uppercase">
              MAIN GUIDE // ROBOT COMPANION
            </span>
          </div>

          <button
            onClick={cycleAction}
            className="font-mono text-[10px] text-zinc-400 hover:text-solar-300 border border-zinc-800 hover:border-solar-500/50 px-2 py-0.5 rounded transition-all flex items-center gap-1"
          >
            <Sparkles className="h-2.5 w-2.5 text-solar-400" />
            <span>POSE: {currentAction.toUpperCase()}</span>
          </button>
        </div>

        {/* Dynamic Typewritten Dialogue */}
        <div className="flex items-start gap-2.5 pt-1">
          <Bot className="h-4 w-4 text-solar-400 mt-0.5 shrink-0" />
          <p className="font-mono text-xs text-zinc-200 leading-relaxed font-light min-h-[36px]">
            {displayText}
            <span className="inline-block w-1.5 h-3 bg-solar-400 ml-1 animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
}
