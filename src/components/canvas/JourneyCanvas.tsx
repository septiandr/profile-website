"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarfieldRig } from "@/journey/three/StarfieldRig";
import { PlanetRig } from "@/journey/three/PlanetRig";
import { TechLabRig } from "@/journey/three/TechLabRig";
import { JourneyStage } from "@/journey/types";

interface JourneyCanvasProps {
  onStageChange?: (stage: JourneyStage, progress: number) => void;
  onActiveWaypointChange?: (index: number) => void;
  onActiveProjectChange?: (index: number) => void;
  activeTechNode?: number | null;
  onHoverTechNode?: (index: number | null) => void;
  isEngineHot?: boolean;
}

export default function JourneyCanvas({
  onStageChange,
  onActiveWaypointChange,
  onActiveProjectChange,
  activeTechNode,
  onHoverTechNode,
  isEngineHot = false,
}: JourneyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Rigs
  const starfieldRef = useRef<StarfieldRig | null>(null);
  const planetRef = useRef<PlanetRig | null>(null);
  const techLabRef = useRef<TechLabRig | null>(null);

  // Characters
  const rocketGroupRef = useRef<THREE.Group | null>(null);
  const astronautGroupRef = useRef<THREE.Group | null>(null);
  const robotGroupRef = useRef<THREE.Group | null>(null);

  // Character animations
  const robotMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const robotActionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});

  // Engine Light for Rocket
  const engineLightRef = useRef<THREE.PointLight | null>(null);

  // Mouse tracking (constrained)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isWarping = useRef(false);
  const isVibrating = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x050507); // Pure deep void
    scene.fog = new THREE.FogExp2(0x050507, 0.025);

    // 2. CAMERA (Cinematic framing)
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. RENDERER (Clean, high-performance)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. RESTRAINED LIGHTING (Cinematic key + subtle silver rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xe2e8f0, 2.8); // Neutral silver key
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2); // Faint cyan rim
    rimLight.position.set(-6, -3, -4);
    scene.add(rimLight);

    // Rocket Engine Light
    const engineLight = new THREE.PointLight(0x38bdf8, 1.0, 8);
    engineLight.position.set(0, -1.2, 0);
    scene.add(engineLight);
    engineLightRef.current = engineLight;

    // 5. STARFIELD RIG
    const starfield = new StarfieldRig(1000);
    scene.add(starfield.points);
    starfieldRef.current = starfield;

    // 6. PLANET RIG (Atmospheric arrival)
    const planet = new PlanetRig();
    scene.add(planet.group);
    planetRef.current = planet;

    // 7. TECH LAB RIG (Spatial skill nodes & subtle portal)
    const techLab = new TechLabRig();
    scene.add(techLab.group);
    techLabRef.current = techLab;

    // 8. CHARACTER GROUPS
    const rocketGroup = new THREE.Group();
    const astronautGroup = new THREE.Group();
    const robotGroup = new THREE.Group();

    scene.add(rocketGroup);
    scene.add(astronautGroup);
    scene.add(robotGroup);

    rocketGroupRef.current = rocketGroup;
    astronautGroupRef.current = astronautGroup;
    robotGroupRef.current = robotGroup;

    // Initial Positions in The Void (Scene 01)
    // Rocket is barely visible in distance, camera slowly glides into focus
    rocketGroup.position.set(0, -0.1, 0.5);
    rocketGroup.rotation.set(0.12, -0.3, 0.05);
    rocketGroup.scale.setScalar(2.2);

    astronautGroup.position.set(0, -4, -15);
    astronautGroup.scale.setScalar(0.001);

    robotGroup.position.set(0, -4, -15);
    robotGroup.scale.setScalar(0.001);

    // 9. LOAD GLTF ASSETS
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

            // Restrained PBR surface materials
            root.traverse((node) => {
              if ((node as THREE.Mesh).isMesh) {
                const mesh = node as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                if (mesh.material) {
                  const m = mesh.material as THREE.MeshStandardMaterial;
                  m.roughness = Math.max(0.3, m.roughness ?? 0.4);
                  m.metalness = Math.min(0.7, m.metalness ?? 0.2);
                }
              }
            });

            if (isRobot && gltf.animations && gltf.animations.length > 0) {
              const mixer = new THREE.AnimationMixer(root);
              robotMixerRef.current = mixer;
              gltf.animations.forEach((clip) => {
                robotActionsRef.current[clip.name] = mixer.clipAction(clip);
              });
              const idleAction = robotActionsRef.current["Idle"] || robotActionsRef.current["Standing"];
              if (idleAction) {
                idleAction.play();
              }
            }

            targetGroup.add(root);
            resolve();
          },
          undefined,
          (err) => {
            console.error("Asset load fallback", path, err);
            resolve();
          }
        );
      });
    };

    Promise.all([
      loadGLB("/models/RocketShip.glb", rocketGroup, 2.0),
      loadGLB("/models/Astronaut.glb", astronautGroup, 2.2),
      loadGLB("/models/RobotExpressive.glb", robotGroup, 1.9, true),
    ]).then(() => {
      setupContinuousScrollChoreography(
        rocketGroup,
        astronautGroup,
        robotGroup,
        planet.group,
        techLab.group
      );
    });

    // 10. MOUSE MOVEMENT LISTENER (Restrained)
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // 11. RESIZE LISTENER
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 12. RENDER LOOP
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.06;

      // Update Rigs
      starfield.update(delta);
      planet.update(delta);
      techLab.update(delta, elapsed);

      if (robotMixerRef.current) {
        robotMixerRef.current.update(delta);
      }

      // Constrained Rocket Mouse Reaction in The Void (Scene 02)
      // "The rocket reacts subtly to mouse movement. Mouse X controls small horizontal rotation.
      // Mouse Y controls small vertical rotation. Movement must be constrained."
      if (rocketGroup && window.scrollY < window.innerHeight * 0.7) {
        const mouseRotY = mouse.current.x * 0.25;
        const mouseRotX = -mouse.current.y * 0.18;
        rocketGroup.rotation.y = -0.3 + mouseRotY;
        rocketGroup.rotation.x = 0.12 + mouseRotX;

        // Subtle vibration during takeoff sequence
        if (isVibrating.current) {
          rocketGroup.position.x = (Math.random() - 0.5) * 0.04;
          rocketGroup.position.y = -0.1 + (Math.random() - 0.5) * 0.04;
        } else {
          rocketGroup.position.y = -0.1 + Math.sin(elapsed * 1.5) * 0.03;
        }
      }

      // Subtle engine glow modulation
      if (engineLightRef.current) {
        const baseIntensity = isEngineHot ? 3.5 : 1.2;
        engineLightRef.current.intensity = baseIntensity + Math.sin(elapsed * 8) * 0.3;
      }

      // Cinematic gentle camera tracking
      camera.position.x = mouse.current.x * 0.18;
      camera.position.y = mouse.current.y * 0.12;
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
      planet.dispose();
      techLab.dispose();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Sync Engine Hot state from prop
  useEffect(() => {
    if (engineLightRef.current) {
      engineLightRef.current.intensity = isEngineHot ? 3.5 : 1.2;
    }
  }, [isEngineHot]);

  // Sync Hover Tech Node
  useEffect(() => {
    if (techLabRef.current && activeTechNode !== undefined) {
      if (activeTechNode !== null) {
        techLabRef.current.activateNode(activeTechNode);
      }
    }
  }, [activeTechNode]);

  // Continuous Cinematic GSAP Timeline bound to scroll
  const setupContinuousScrollChoreography = (
    rocket: THREE.Group,
    astro: THREE.Group,
    robot: THREE.Group,
    planet: THREE.Group,
    techLab: THREE.Group
  ) => {
    // ============================================================
    // ZONE 1: THE VOID & TAKEOFF -> ATMOSPHERE (Scenes 01 - 04)
    // ============================================================
    const stTakeoff = ScrollTrigger.create({
      trigger: "#zone-void",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.(p > 0.4 ? "take-off" : "the-void", p);

        // Rocket accelerates forward toward screen, starfield warps
        rocket.position.z = p * 7.8;
        rocket.rotation.x = 0.12 - p * 0.35;
        rocket.scale.setScalar(2.2 + p * 1.5);

        if (starfieldRef.current) {
          starfieldRef.current.setWarp(1 + p * 6);
        }

        // Planet appears as rocket approaches atmosphere
        if (planet) {
          planet.scale.setScalar(Math.min(p * 1.8, 1.8));
          planet.position.z = -25 + p * 15;
          planet.position.y = -6 + p * 4;
        }
      },
    });

    // ============================================================
    // ZONE 2: ASTRONAUT & WAYPOINTS EXPEDITION (Scenes 05 - 06)
    // ============================================================
    const stWaypoints = ScrollTrigger.create({
      trigger: "#zone-experience",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("experience-waypoints", p);

        // Rocket lands on surface and rests
        rocket.position.set(2.4, -0.6, -1.0);
        rocket.rotation.set(0, -0.4, 0);
        rocket.scale.setScalar(1.2);

        // Astronaut emerges, walks along the path
        astro.position.set(-1.8 + p * 2.8, -0.8 + Math.sin(p * Math.PI) * 0.3, 1.2 - p * 0.4);
        astro.rotation.set(0, 0.4 - p * 0.8, 0);
        astro.scale.setScalar(1.0);

        // Waypoint index (0 to 5)
        const waypointIndex = Math.min(Math.floor(p * 6), 5);
        onActiveWaypointChange?.(waypointIndex);
      },
    });

    // ============================================================
    // ZONE 3: TECHNOLOGY LAB & ROBOT ACTIVATION (Scenes 07 - 10)
    // ============================================================
    const stTechLab = ScrollTrigger.create({
      trigger: "#zone-skills",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("tech-lab", p);

        // Astronaut approaches console
        astro.position.set(-2.0, -0.6, 0.8);
        astro.rotation.set(0, 0.8, 0);

        // Tech lab spatial nodes materialize
        techLab.position.set(0, 0, -0.5);
        techLab.scale.setScalar(Math.min(p * 1.4, 1.0));

        // Robot activates
        robot.position.set(1.8, -0.8, 0.6);
        robot.rotation.set(0, -0.6, 0);
        robot.scale.setScalar(Math.min(p * 1.3, 0.95));

        // Form subtle circular portal in Scene 10
        if (techLabRef.current) {
          const portalScale = p > 0.65 ? (p - 0.65) * 3 : 0.001;
          techLabRef.current.portalRing.scale.setScalar(portalScale);
        }
      },
    });

    // ============================================================
    // ZONE 4: PROJECT DESTINATIONS (Scenes 11 - 12)
    // ============================================================
    const stProjects = ScrollTrigger.create({
      trigger: "#zone-projects",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("projects", p);

        // Rocket travels between project destinations
        rocket.position.set(Math.sin(p * Math.PI * 2) * 1.5, 0.8 - p * 0.4, 0.5);
        rocket.rotation.set(0.2, p * Math.PI, 0);
        rocket.scale.setScalar(1.3);

        const projectIdx = Math.min(Math.floor(p * 3), 2);
        onActiveProjectChange?.(projectIdx);
      },
    });

    // ============================================================
    // ZONE 5: CREW CONVERGENCE & ABOUT (Scene 13)
    // ============================================================
    const stAbout = ScrollTrigger.create({
      trigger: "#zone-about",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.("about", p);

        // All three characters assembled
        rocket.position.set(2.2, 0.8, -0.5);
        astro.position.set(-1.8, -0.5, 0.8);
        robot.position.set(1.8, -0.7, 0.8);
      },
    });

    // ============================================================
    // ZONE 6: CONTACT & FINAL DEPARTURE (Scenes 14 - 16)
    // ============================================================
    const stContact = ScrollTrigger.create({
      trigger: "#zone-contact",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        onStageChange?.(p > 0.65 ? "departure" : "contact", p);

        if (p < 0.65) {
          // Standing together
          rocket.position.set(0, 0.6, 0);
          rocket.rotation.set(-0.2, 0, 0);
          astro.position.set(-1.6, -0.6, 1.0);
          robot.position.set(1.6, -0.6, 1.0);
        } else {
          // Final departure: Rocket launches into deep space, shrinking into stars
          const departureP = (p - 0.65) / 0.35;
          rocket.position.y = 0.6 + departureP * 12;
          rocket.position.z = -departureP * 25;
          rocket.scale.setScalar(Math.max(1.3 - departureP * 1.2, 0.01));

          // Astro & robot boarded
          astro.scale.setScalar(Math.max(1.0 - departureP * 3, 0.001));
          robot.scale.setScalar(Math.max(0.95 - departureP * 3, 0.001));
        }
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
