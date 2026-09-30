"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { JourneyStage } from "./types";
import HUDMissionControl from "@/components/journey/HUDMissionControl";
import Stage01VoidIntro from "@/components/journey/Stage01VoidIntro";
import Stage02ExperienceWaypoints from "@/components/journey/Stage02ExperienceWaypoints";
import Stage03TechLab from "@/components/journey/Stage03TechLab";
import Stage04Projects from "@/components/journey/Stage04Projects";
import Stage05AboutContact from "@/components/journey/Stage05AboutContact";
import Stage06DepartureEnd from "@/components/journey/Stage06DepartureEnd";

const JourneyCanvas = dynamic(
  () => import("@/components/canvas/JourneyCanvas"),
  { ssr: false }
);

export default function JourneyManager() {
  const [currentStage, setCurrentStage] = useState<JourneyStage>("the-void");
  const [activeWaypointIndex, setActiveWaypointIndex] = useState<number>(0);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [activeTechNode, setActiveTechNode] = useState<number | null>(null);
  const [isEngineHot, setIsEngineHot] = useState<boolean>(false);

  const handleStageChange = useCallback((stage: JourneyStage) => {
    setCurrentStage(stage);
  }, []);

  const handleActiveWaypointChange = useCallback((index: number) => {
    setActiveWaypointIndex(index);
  }, []);

  const handleActiveProjectChange = useCallback((index: number) => {
    setActiveProjectIndex(index);
  }, []);

  const handleHoverTechNode = useCallback((index: number | null) => {
    setActiveTechNode(index);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentStage("the-void");
    setActiveWaypointIndex(0);
    setActiveProjectIndex(0);
    setActiveTechNode(null);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050507] text-zinc-100 overflow-x-hidden">
      {/* Three.js Continuous Cinematic Canvas Rig */}
      <JourneyCanvas
        onStageChange={handleStageChange}
        onActiveWaypointChange={handleActiveWaypointChange}
        onActiveProjectChange={handleActiveProjectChange}
        activeTechNode={activeTechNode}
        onHoverTechNode={handleHoverTechNode}
        isEngineHot={isEngineHot}
      />

      {/* Mission Control Minimal HUD */}
      <HUDMissionControl currentStage={currentStage} />

      {/* The 6 Sequential Narrative Zones */}
      <main className="relative z-10">
        {/* Zone 1: The Void & Rocket Interaction */}
        <Stage01VoidIntro
          onEngineHover={setIsEngineHot}
          onEnterJourney={() => setIsEngineHot(true)}
        />

        {/* Zone 2: Astronaut & Physical Experience Waypoints */}
        <Stage02ExperienceWaypoints
          activeWaypointIndex={activeWaypointIndex}
        />

        {/* Zone 3: Technology Lab & Robot Activation */}
        <Stage03TechLab
          onHoverTechNode={handleHoverTechNode}
          activeTechNode={activeTechNode}
        />

        {/* Zone 4: Project Destinations */}
        <Stage04Projects
          activeProjectIndex={activeProjectIndex}
        />

        {/* Zone 5: Personnel Dossier & Contact */}
        <Stage05AboutContact />

        {/* Zone 6: Final Departure & End Screen */}
        <Stage06DepartureEnd onRestart={handleRestart} />
      </main>
    </div>
  );
}
