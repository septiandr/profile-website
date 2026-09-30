"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarfieldRig } from "@/journey/three/StarfieldRig";
import { TechLabRig } from "@/journey/three/TechLabRig";
import { JourneyStage } from "@/journey/types";

interface JourneyCanvasProps {
  onStageChange?: (stage: JourneyStage, progress: number) => void;
  onActiveWaypointChange?: (index: number) => void;
  onActiveProjectChange?: (index: number) => void;
  activeTechNode?: number | null;
  onHoverTechNode?: (index: number | null) => void;
  isEngineHot?: boolean;
  robotAction?: string;
  onRobotActionChange?: (action: string) => void;
}

export default function JourneyCanvas({
  onStageChange,
  onActiveWaypointChange,
  onActiveProjectChange,
  activeTechNode,
  onHoverTechNode,
  isEngineHot = false,
  robotAction = "Wave",
  onRobotActionChange,
}: JourneyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Rigs
  const starfieldRef = useRef<StarfieldRig | null>(null);
  const techLabRef = useRef<TechLabRig | null>(null);

  // Characters (ONLY Rocket and Robot - NO Astronaut!)
  const rocketGroupRef = useRef<THREE.Group | null>(null);
  const robotGroupRef = useRef<THREE.Group | null>(null);

  // Robot animation mixer
  const robotMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const robotActionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

  // Rocket Engine Warm Amber Light
  const engineLightRef = useRef<THREE.PointLight | null>(null);

  // Parallax & Mouse Tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef<number>(0);

  // Play animation clip smoothly
  const playRobotAnimation = useCallback((actionName: string) => {
    const actions = robotActionsRef.current;
    if (!actions[actionName]) return;

    const prevAction = activeActionRef.current;
    const nextAction = actions[actionName];

    if (prevAction === nextAction) return;

    if (prevAction) {
      prevAction.fadeOut(0.35);
    }
    nextAction.reset().fadeIn(0.35).play();
    activeActionRef.current = nextAction;
    onRobotActionChange?.(actionName);
  }, [onRobotActionChange]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. SCENE (Warm deep obsidian void)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x060709);
    scene.fog = new THREE.FogExp2(0x060709, 0.026);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(44, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);
    cameraRef.current = camera;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. WARM SOLAR LIGHTING (Warm Key + Amber Accent + Neutral Rim)
    const ambientLight = new THREE.AmbientLight(0xfef3c7, 0.85); // Warm ambient
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 3.2); // Warm white key
    keyLight.position.set(6, 7, 5);
    scene.add(keyLight);

    const solarAccentLight = new THREE.DirectionalLight(0xf59e0b, 2.8); // Solar Amber Accent
    solarAccentLight.position.set(-6, -3, 3);
    scene.add(solarAccentLight);

    const rimLight = new THREE.DirectionalLight(0xd4d4d8, 2.0); // Titanium Rim
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // Rocket Thruster Point Light
    const engineLight = new THREE.PointLight(0xf59e0b, 2.0, 10);
    scene.add(engineLight);
    engineLightRef.current = engineLight;

    // 5. STARFIELD RIG (Warm Champagne & Amber)
    const starfield = new StarfieldRig(1200);
    scene.add(starfield.points);
    starfieldRef.current = starfield;

    // 6. TECH LAB RIG (Spatial Nodes & Portal)
    const techLab = new TechLabRig();
    scene.add(techLab.group);
    techLabRef.current = techLab;

    // 7. CHARACTERS: ROCKET & ROBOT ONLY (No Astronaut)
    const rocketGroup = new THREE.Group();
    const robotGroup = new THREE.Group();

    scene.add(rocketGroup);
    scene.add(robotGroup);

    rocketGroupRef.current = rocketGroup;
    robotGroupRef.current = robotGroup;

    // Initial Positions in Scene 01 (Intro)
    // Robot is front and center protagonist!
    robotGroup.position.set(1.4, -0.9, 1.2);
    robotGroup.scale.setScalar(1.2);
    robotGroup.rotation.set(0, -0.4, 0);

    // Rocket is circling in mid-orbit
    rocketGroup.position.set(-2.5, 1.2, -1.0);
    rocketGroup.scale.setScalar(1.5);
    rocketGroup.rotation.set(0.3, 0.8, -0.2);

    // 8. LOAD GLTF ASSETS (RocketShip.glb and RobotExpressive.glb)
    const loader = new GLTFLoader();

    const loadGLB = (
      path: string,
      targetGroup: THREE.Group,
      targetScale: number,
      isRobot = false
    ): Promise<void> => {
      return new Promise((resolve) => {
        loader.load(
          path,
          (gltf) => {
            const root = gltf.scene;
            const box = new THREE.Box3().setFromObject(root);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const normalized = (1 / maxDim) * targetScale;

            root.scale.setScalar(normalized);
            const center = box.getCenter(new THREE.Vector3());
            root.position.x = -center.x * normalized;
            root.position.y = -center.y * normalized;
            root.position.z = -center.z * normalized;

            // Enhance materials with warm titanium sheen
            root.traverse((node) => {
              if ((node as THREE.Mesh).isMesh) {
                const mesh = node as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                if (mesh.material) {
                  const m = mesh.material as THREE.MeshStandardMaterial;
                  m.roughness = Math.max(0.2, m.roughness ?? 0.35);
                  m.metalness = Math.min(0.8, m.metalness ?? 0.25);
                }
              }
            });

            if (isRobot && gltf.animations && gltf.animations.length > 0) {
              const mixer = new THREE.AnimationMixer(root);
              robotMixerRef.current = mixer;
              gltf.animations.forEach((clip) => {
                robotActionsRef.current[clip.name] = mixer.clipAction(clip);
              });

              // Initial Protagonist Greeting Wave!
              const waveAction = robotActionsRef.current["Wave"];
              const idleAction = robotActionsRef.current["Idle"] || robotActionsRef.current["Standing"];

              if (waveAction) {
                waveAction.play();
                activeActionRef.current = waveAction;

                setTimeout(() => {
                  if (idleAction && robotMixerRef.current) {
                    waveAction.fadeOut(0.5);
                    idleAction.reset().fadeIn(0.5).play();
                    activeActionRef.current = idleAction;
                  }
                }, 3500);
              } else if (idleAction) {
                idleAction.play();
                activeActionRef.current = idleAction;
              }
            }

            targetGroup.add(root);
            resolve();
          },
          undefined,
          (err) => {
            console.error("Asset load error", path, err);
            resolve();
          }
        );
      });
    };

    Promise.all([
      loadGLB("/models/RocketShip.glb", rocketGroup, 1.8),
      loadGLB("/models/RobotExpressive.glb", robotGroup, 2.2, true),
    ]).then(() => {
      setupScrollOrbitChoreography(rocketGroup, robotGroup, techLab.group);
    });

    // 9. MOUSE TRACKING FOR PARALLAX
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 10. RESIZE LISTENER
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 11. ANIMATION LOOP WITH PARALLAX & CONTINUOUS ROCKET ORBIT
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Update Rigs
      starfield.update(delta);
      techLab.update(delta, elapsed);

      if (robotMixerRef.current) {
        robotMixerRef.current.update(delta);
      }

      const p = scrollProgressRef.current;

      // ============================================================
      // CONTINUOUS ROCKET ORBIT (Scroll-driven 3D circling & banking)
      // "roket akan berputar berkeliling sesuai scroll"
      // ============================================================
      if (rocketGroup) {
        const orbitAngle = p * Math.PI * 5 + elapsed * 0.3;
        const radiusX = 3.2;
        const radiusZ = 2.4;

        // Position on 3D elliptical flight path
        const targetX = Math.sin(orbitAngle) * radiusX;
        const targetZ = Math.cos(orbitAngle) * radiusZ - 0.5;
        const targetY = Math.sin(orbitAngle * 0.6) * 1.6 + 0.2;

        rocketGroup.position.set(targetX, targetY, targetZ);

        // Bank rocket smoothly into the direction of orbit velocity
        const tangentX = Math.cos(orbitAngle);
        const tangentZ = -Math.sin(orbitAngle);
        const heading = Math.atan2(tangentX, tangentZ);

        rocketGroup.rotation.y = heading + Math.PI;
        rocketGroup.rotation.z = Math.sin(orbitAngle) * 0.35;
        rocketGroup.rotation.x = -Math.cos(orbitAngle * 0.6) * 0.2;

        // Rocket engine light follows the thruster
        if (engineLightRef.current) {
          engineLightRef.current.position.set(targetX, targetY - 0.5, targetZ);
          engineLightRef.current.intensity = 2.0 + Math.sin(elapsed * 10) * 0.5;
        }
      }

      // ============================================================
      // PROTAGONIST ROBOT MOUSE PARALLAX & ALIVE BREATHING
      // ============================================================
      if (robotGroup) {
        // Robot looks slightly toward cursor (interactive spatial tracking)
        robotGroup.rotation.y += (mouse.current.x * 0.4 - robotGroup.rotation.y * 0.1) * 0.05;
        robotGroup.rotation.x += (-mouse.current.y * 0.2 - robotGroup.rotation.x * 0.1) * 0.05;

        // Subtle breathing float
        robotGroup.position.y += Math.sin(elapsed * 2) * 0.001;
      }

      // ============================================================
      // CAMERA PARALLAX & CINEMATIC TRACKING
      // ============================================================
      camera.position.x = mouse.current.x * 0.25;
      camera.position.y = mouse.current.y * 0.18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      starfield.dispose();
      techLab.dispose();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync external robot action triggers
  useEffect(() => {
    if (robotAction) {
      playRobotAnimation(robotAction);
    }
  }, [robotAction, playRobotAnimation]);

  // Choreograph Robot Protagonist transitions across the sections
  const setupScrollOrbitChoreography = (
    rocket: THREE.Group,
    robot: THREE.Group,
    techLab: THREE.Group
  ) => {
    const isMobile = window.innerWidth < 768;

    // Track full journey scroll progress for continuous rocket orbit
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    // 1. INTRO / VOID STAGE
    ScrollTrigger.create({
      trigger: "#zone-void",
      start: "top top",
      end: "bottom top",
      scrub: 1.0,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.(p > 0.4 ? "take-off" : "the-void", p);
        if (p < 0.2) {
          playRobotAnimation("Wave");
        }
      },
    });

    // 2. EXPERIENCE WAYPOINTS STAGE (Robot guides the milestones)
    ScrollTrigger.create({
      trigger: "#zone-experience",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("experience-waypoints", p);

        // Robot walks along with the user, guiding each milestone
        if (isMobile) {
          robot.position.set(0.6, -1.0, 0.8);
          robot.scale.setScalar(0.75);
        } else {
          robot.position.set(-1.8 + p * 3.6, -0.8 + Math.sin(p * Math.PI) * 0.2, 1.2);
          robot.scale.setScalar(1.1);
        }

        const waypointIndex = Math.min(Math.floor(p * 6), 5);
        onActiveWaypointChange?.(waypointIndex);

        if (p > 0.1 && p < 0.8) {
          playRobotAnimation("Walking");
        } else {
          playRobotAnimation("ThumbsUp");
        }
      },
    });

    // 3. TECHNOLOGY LAB STAGE (Robot activates and scans skills)
    ScrollTrigger.create({
      trigger: "#zone-skills",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("tech-lab", p);

        // Robot stands at the center telemetry podium
        robot.position.set(isMobile ? 0 : 1.6, -0.7, 1.0);
        robot.scale.setScalar(isMobile ? 0.8 : 1.15);

        // Tech lab nodes materialize in 3D
        techLab.position.set(0, 0, -0.3);
        techLab.scale.setScalar(Math.min(p * 1.3, 1.0));

        if (p > 0.3) {
          playRobotAnimation("ThumbsUp");
        }
      },
    });

    // 4. PROJECTS DESTINATIONS (Robot celebrates project showcase)
    ScrollTrigger.create({
      trigger: "#zone-projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("projects", p);

        robot.position.set(isMobile ? 0.7 : -1.9, -0.8, 1.2);
        robot.scale.setScalar(isMobile ? 0.75 : 1.1);

        const projectIdx = Math.min(Math.floor(p * 3), 2);
        onActiveProjectChange?.(projectIdx);

        if (p > 0.4 && p < 0.8) {
          playRobotAnimation("Jump");
        } else {
          playRobotAnimation("Yes");
        }
      },
    });

    // 5. ABOUT DOSSIER (Robot stands beside Risanggalih)
    ScrollTrigger.create({
      trigger: "#zone-about",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("about", p);

        robot.position.set(isMobile ? 0.8 : 1.8, -0.7, 1.2);
        robot.scale.setScalar(isMobile ? 0.8 : 1.1);
        playRobotAnimation("ThumbsUp");
      },
    });

    // 6. CONTACT & CELEBRATION (Robot dances with visitor!)
    ScrollTrigger.create({
      trigger: "#zone-contact",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.(p > 0.65 ? "departure" : "contact", p);

        robot.position.set(0, -0.5, 1.5);
        robot.scale.setScalar(isMobile ? 0.9 : 1.3);

        // Victory Dance celebration at contact terminal!
        playRobotAnimation("Dance");
      },
    });
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
    />
  );
}
