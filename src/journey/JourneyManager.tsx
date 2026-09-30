"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { JourneyStage } from "./types";
import HUDMissionControl from "@/components/journey/HUDMissionControl";
import RobotGuideCompanion from "@/components/journey/RobotGuideCompanion";
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
  const [robotAction, setRobotAction] = useState<string>("Wave");

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

  const handleRobotActionChange = useCallback((action: string) => {
    setRobotAction(action);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentStage("the-void");
    setActiveWaypointIndex(0);
    setActiveProjectIndex(0);
    setActiveTechNode(null);
    setRobotAction("Wave");
  }, []);

  return (
    <div className="relative min-h-screen bg-[#060709] text-zinc-100 overflow-x-hidden">
      {/* Three.js Continuous Cinematic Canvas (Rocket Orbit & Protagonist Robot) */}
      <JourneyCanvas
        onStageChange={handleStageChange}
        onActiveWaypointChange={handleActiveWaypointChange}
        onActiveProjectChange={handleActiveProjectChange}
        activeTechNode={activeTechNode}
        onHoverTechNode={handleHoverTechNode}
        isEngineHot={isEngineHot}
        robotAction={robotAction}
        onRobotActionChange={handleRobotActionChange}
      />

      {/* Mission Control Minimal HUD */}
      <HUDMissionControl currentStage={currentStage} />

      {/* Main Protagonist Robot Guide Companion (Always Explaining) */}
      <RobotGuideCompanion
        stage={currentStage}
        currentAction={robotAction}
        onActionChange={handleRobotActionChange}
      />

      {/* The 6 Sequential Narrative Zones */}
      <main className="relative z-10">
        {/* Zone 1: The Void & Robot Welcome */}
        <Stage01VoidIntro
          onEngineHover={setIsEngineHot}
          onEnterJourney={() => {
            setIsEngineHot(true);
            setRobotAction("Walking");
          }}
        />

        {/* Zone 2: Robot-guided Experience Waypoints */}
        <Stage02ExperienceWaypoints
          activeWaypointIndex={activeWaypointIndex}
        />

        {/* Zone 3: Architectural Tech Lab & Robot Diagnostics */}
        <Stage03TechLab
          onHoverTechNode={handleHoverTechNode}
          activeTechNode={activeTechNode}
        />

        {/* Zone 4: Project Destinations with Orbiting Rocket */}
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
