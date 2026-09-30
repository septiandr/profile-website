"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StarfieldRig } from "@/journey/three/StarfieldRig";
import { TechLabRig } from "@/journey/three/TechLabRig";
import { JourneyStage, EXPERIENCE_WAYPOINTS } from "@/journey/types";

interface JourneyCanvasProps {
  onStageChange?: (stage: JourneyStage, progress: number) => void;
  onActiveWaypointChange?: (index: number) => void;
  onActiveProjectChange?: (index: number) => void;
  activeTechNode?: number | null;
  onHoverTechNode?: (index: number | null) => void;
  isEngineHot?: boolean;
  robotAction?: string;
  onRobotActionChange?: (action: string) => void;
  isModalOpen?: boolean;
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
  isModalOpen = false,
}: JourneyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Three.js instances
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Rigs
  const starfieldRef = useRef<StarfieldRig | null>(null);
  const techLabRef = useRef<TechLabRig | null>(null);

  // Characters (Rocket & Robot only)
  const rocketGroupRef = useRef<THREE.Group | null>(null);
  const rocketInnerMeshRef = useRef<THREE.Group | null>(null);
  const robotGroupRef = useRef<THREE.Group | null>(null);

  // Robot animation mixer & actions
  const robotMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const robotActionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const currentActionNameRef = useRef<string>("Wave");

  // Keep a stable ref for onRobotActionChange to avoid re-render loops
  const onRobotActionChangeRef = useRef(onRobotActionChange);
  useEffect(() => {
    onRobotActionChangeRef.current = onRobotActionChange;
  }, [onRobotActionChange]);

  // Rocket Engine Warm Amber Light & Hot state ref (prevents re-mounting scene)
  const engineLightRef = useRef<THREE.PointLight | null>(null);
  const isEngineHotRef = useRef(isEngineHot);
  useEffect(() => {
    isEngineHotRef.current = isEngineHot;
  }, [isEngineHot]);

  // Track created ScrollTriggers to only clean up our own triggers
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Parallax & Smooth Target Lerping (Eliminates all blinking/teleporting)
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef<number>(0);

  const robotTargetPos = useRef({ x: 0, y: -0.42, z: 1.65 });
  const robotTargetScale = useRef<number>(0.75);
  const robotTargetRotY = useRef<number>(0);
  const scrollIdleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Rock-solid Animation Switcher with smooth crossFade
  const switchRobotAction = useCallback((newActionName: string) => {
    const actions = robotActionsRef.current;
    const next = actions[newActionName];
    if (!next) return;

    if (newActionName === currentActionNameRef.current) {
      // Already active! Just ensure it is running without resetting timer on every scroll frame!
      if (!next.isRunning()) {
        next.play();
      }
      return;
    }

    const prev = actions[currentActionNameRef.current];
    currentActionNameRef.current = newActionName;

    next.reset();
    next.enabled = true;
    next.setEffectiveTimeScale(newActionName === "Walking" ? 1.2 : 1.0);
    next.setEffectiveWeight(1);

    if (prev && prev !== next) {
      prev.crossFadeTo(next, 0.35, true);
    } else {
      next.fadeIn(0.35);
    }
    next.play();

    onRobotActionChangeRef.current?.(newActionName);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. SCENE (Cinematic Deep Midnight Astral Void)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x070814);
    scene.fog = new THREE.FogExp2(0x070814, 0.022);

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
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. RICH CHROMATIC STUDIO LIGHTING (Champagne Key + Indigo Fill + Amber Rim + Cyan Starlight)
    const ambientLight = new THREE.AmbientLight(0x1a1e36, 1.4); // Velvet deep indigo ambient
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e4, 3.8); // Warm champagne sunlight
    keyLight.position.set(6, 7, 5);
    scene.add(keyLight);

    const indigoFillLight = new THREE.DirectionalLight(0x4338ca, 2.6); // Deep royal indigo fill for rich cinematic shadows
    indigoFillLight.position.set(-6, -2, -3);
    scene.add(indigoFillLight);

    const solarAccentLight = new THREE.DirectionalLight(0xf59e0b, 3.2); // Radiant solar amber
    solarAccentLight.position.set(0, 8, -6);
    scene.add(solarAccentLight);

    const cyanBounceLight = new THREE.DirectionalLight(0x06b6d4, 1.2); // Subtle celestial cyan bounce
    cyanBounceLight.position.set(-3, 4, 4);
    scene.add(cyanBounceLight);

    // Rocket Thruster Point Light (parented to rocketGroup at thruster -Z offset)
    const engineLight = new THREE.PointLight(0xf59e0b, 2.5, 10);
    engineLightRef.current = engineLight;

    // 5. STARFIELD RIG (Warm Champagne & Amber)
    const starfield = new StarfieldRig(1200);
    scene.add(starfield.points);
    starfieldRef.current = starfield;

    // 6. TECH LAB RIG (Spatial Nodes & Portal)
    const techLab = new TechLabRig();
    scene.add(techLab.group);
    techLabRef.current = techLab;

    // 7. CHARACTERS: ROCKET & ROBOT ONLY
    const rocketGroup = new THREE.Group();
    const rocketInnerMesh = new THREE.Group();
    rocketGroup.add(rocketInnerMesh);
    // Attach thruster light to the rear of rocketGroup (local -Z)
    engineLight.position.set(0, 0, -0.9);
    rocketGroup.add(engineLight);

    const robotGroup = new THREE.Group();

    scene.add(rocketGroup);
    scene.add(robotGroup);

    rocketGroupRef.current = rocketGroup;
    rocketInnerMeshRef.current = rocketInnerMesh;
    robotGroupRef.current = robotGroup;

    // Initial Stage Coordinates: Robot prominently in CENTER facing forward waving
    const isMobile = width < 768;
    robotGroup.position.set(0, -0.40, 1.8);
    robotGroup.scale.setScalar(isMobile ? 0.78 : 1.25);
    robotGroup.rotation.set(0, 0, 0);

    rocketGroup.position.set(-2.5, 1.2, -1.0);
    rocketGroup.scale.setScalar(0.72);

    // 8. LOAD GLTF ASSETS
    const loader = new GLTFLoader();

    // Load Rocket
    loader.load(
      "/models/RocketShip.glb",
      (gltf) => {
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const normalized = (1 / maxDim) * 0.75;

        root.scale.setScalar(normalized);
        const center = box.getCenter(new THREE.Vector3());
        root.position.x = -center.x * normalized;
        root.position.y = -center.y * normalized;
        root.position.z = -center.z * normalized;

        // Model nose is naturally at local +Z.
        // Object3D.lookAt() points local +Z towards forward motion vector.
        // Therefore, keep rotation at (0, 0, 0) so nose flies 100% forward!
        rocketInnerMesh.rotation.set(0, 0, 0);

        root.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.frustumCulled = false; // Prevent culling blink
            if (mesh.material) {
              const m = mesh.material as THREE.MeshStandardMaterial;
              m.roughness = Math.max(0.2, m.roughness ?? 0.35);
              m.metalness = Math.min(0.8, m.metalness ?? 0.25);
            }
          }
        });

        rocketInnerMesh.add(root);
      },
      undefined,
      (err) => console.error("Rocket load error", err)
    );

    // Load Robot (Protagonist)
    loader.load(
      "/models/RobotExpressive.glb",
      (gltf) => {
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const normalized = (1 / maxDim) * 1.55;

        root.scale.setScalar(normalized);
        const center = box.getCenter(new THREE.Vector3());
        root.position.x = -center.x * normalized;
        root.position.y = -center.y * normalized;
        root.position.z = -center.z * normalized;

        root.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            // CRITICAL: Disable frustum culling on animated bones to prevent any blink/flicker!
            mesh.frustumCulled = false;
            if (mesh.material) {
              const m = mesh.material as THREE.MeshStandardMaterial;
              m.roughness = Math.max(0.2, m.roughness ?? 0.35);
              m.metalness = Math.min(0.8, m.metalness ?? 0.25);
            }
          }
        });

        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(root);
          robotMixerRef.current = mixer;
          gltf.animations.forEach((clip) => {
            robotActionsRef.current[clip.name] = mixer.clipAction(clip);
          });

          // Play initial greeting Wave and keep waving to welcome visitor
          const waveAction = robotActionsRef.current["Wave"];
          if (waveAction) {
            waveAction.reset().play();
            currentActionNameRef.current = "Wave";
          } else {
            const idleAction = robotActionsRef.current["Idle"] || robotActionsRef.current["Standing"];
            if (idleAction) {
              idleAction.reset().play();
              currentActionNameRef.current = "Idle";
            }
          }
        }

        // Invisible hitbox cylinder to make clicking and hovering on the robot effortless
        const hitBoxGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.7, 12);
        const hitBoxMat = new THREE.MeshBasicMaterial({ visible: false });
        const hitBoxMesh = new THREE.Mesh(hitBoxGeo, hitBoxMat);
        hitBoxMesh.name = "robot_hitbox";
        robotGroup.add(hitBoxMesh);

        robotGroup.add(root);
      },
      undefined,
      (err) => console.error("Robot load error", err)
    );

    // Setup Discrete Scroll Choreography (No continuous state loops)
    setupDiscreteScrollChoreography(techLab.group);

    // 9. RAYCASTER & INTERACTION: ROBOT CLICK TO WAVE ("jika robot di klik dia melambai")
    const raycaster = new THREE.Raycaster();
    const pointerVector = new THREE.Vector2();

    const triggerRobotWaveClick = () => {
      const actions = robotActionsRef.current;
      const waveAction = actions["Wave"];
      if (!waveAction) return;

      const prev = actions[currentActionNameRef.current];
      currentActionNameRef.current = "Wave";

      waveAction.reset();
      waveAction.enabled = true;
      waveAction.setEffectiveTimeScale(1.25);
      waveAction.setEffectiveWeight(1);

      if (prev && prev !== waveAction) {
        prev.crossFadeTo(waveAction, 0.25, true);
      } else {
        waveAction.play();
      }

      // Fun tactile bounce response on click
      gsap.killTweensOf(robotGroup.position, "y");
      const currentY = robotGroup.position.y;
      gsap.to(robotGroup.position, {
        y: currentY + 0.1,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        ease: "power2.out",
        onComplete: () => {
          robotGroup.position.y = currentY;
        },
      });

      onRobotActionChangeRef.current?.("Wave");
    };

    const onWindowClick = (e: MouseEvent) => {
      // Ignore clicks on interactive UI elements (buttons, inputs, cards, links)
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(
          "button, a, input, select, textarea, [role='button'], .exp-card, .tech-card, .project-card"
        )
      ) {
        return;
      }

      pointerVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerVector.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(pointerVector, camera);
      const intersects = raycaster.intersectObjects(robotGroup.children, true);
      if (intersects.length > 0) {
        triggerRobotWaveClick();
      }
    };
    window.addEventListener("click", onWindowClick);

    // 10. MOUSE TRACKING FOR PARALLAX & ROBOT HOVER CURSOR
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;

      // Check if mouse is hovering over the 3D robot
      pointerVector.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerVector.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointerVector, camera);
      const isOver = raycaster.intersectObjects(robotGroup.children, true).length > 0;
      if (isOver) {
        document.body.style.cursor = "pointer";
      } else {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (!el?.closest("button, a, [role='button'], .cursor-pointer")) {
          document.body.style.cursor = "auto";
        }
      }
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

    // 11. MAIN ANIMATION LOOP WITH NOSE-FIRST ORBIT & SMOOTH LERP
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerping
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      // Update Rigs
      starfield.update(delta);
      techLab.update(delta, elapsed);

      if (robotMixerRef.current) {
        robotMixerRef.current.update(delta);
      }

      // ============================================================
      // 1. ROCKET CONTINUOUS ORBIT (ALWAYS FLIES NOSE-FIRST!)
      // ============================================================
      if (rocketGroup) {
        const p = scrollProgressRef.current;
        const orbitAngle = p * Math.PI * 4.5 + elapsed * 0.25;
        const radiusX = 3.4;
        const radiusZ = 2.2;

        // Current position along orbit
        const curX = Math.sin(orbitAngle) * radiusX;
        const curZ = Math.cos(orbitAngle) * radiusZ - 0.3;
        const curY = Math.sin(orbitAngle * 0.7) * 1.6 + 0.3;
        rocketGroup.position.set(curX, curY, curZ);

        // Next position ahead on trajectory to determine forward vector
        const deltaAngle = 0.08;
        const nextX = Math.sin(orbitAngle + deltaAngle) * radiusX;
        const nextZ = Math.cos(orbitAngle + deltaAngle) * radiusZ - 0.3;
        const nextY = Math.sin((orbitAngle + deltaAngle) * 0.7) * 1.6 + 0.3;

        // Point rocket group along forward flight vector!
        rocketGroup.lookAt(nextX, nextY, nextZ);

        // Bank into the curve smoothly (natural aerodynamic roll)
        if (rocketInnerMeshRef.current) {
          rocketInnerMeshRef.current.rotation.z = 0.18 + Math.sin(orbitAngle) * 0.15;
        }

        // Engine light thruster flicker / pulse
        if (engineLightRef.current) {
          const isHot = isEngineHotRef.current;
          engineLightRef.current.intensity = isHot ? 3.8 : 2.2 + Math.sin(elapsed * 9) * 0.5;
        }
      }

      // ============================================================
      // 2. ROBOT PROTAGONIST: SMOOTH CONTINUOUS LERP (NO BLINKING!)
      // ============================================================
      if (robotGroup) {
        // Continuous position lerp
        robotGroup.position.x += (robotTargetPos.current.x - robotGroup.position.x) * 0.08;
        robotGroup.position.y += (robotTargetPos.current.y - robotGroup.position.y) * 0.08;
        robotGroup.position.z += (robotTargetPos.current.z - robotGroup.position.z) * 0.08;

        // Continuous scale lerp
        const currentScale = robotGroup.scale.x;
        const newScale = currentScale + (robotTargetScale.current - currentScale) * 0.08;
        robotGroup.scale.setScalar(newScale);

        // Continuous rotation lerp + mouse interactive parallax
        const targetRot = robotTargetRotY.current + mouse.current.x * 0.35;
        robotGroup.rotation.y += (targetRot - robotGroup.rotation.y) * 0.08;
        robotGroup.rotation.x += (-mouse.current.y * 0.18 - robotGroup.rotation.x) * 0.08;

        // Alive breathing float
        robotGroup.position.y += Math.sin(elapsed * 2.2) * 0.001;
      }

      // ============================================================
      // 3. CAMERA CINEMATIC PARALLAX
      // ============================================================
      camera.position.x = mouse.current.x * 0.22;
      camera.position.y = mouse.current.y * 0.15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      starfield.dispose();
      techLab.dispose();
      triggersRef.current.forEach((st) => st.kill());
      triggersRef.current = [];
      if (scrollIdleTimerRef.current) {
        clearTimeout(scrollIdleTimerRef.current);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []); // Run once on mount! Never destroy WebGL scene on prop updates!

  // Sync Hover Tech Node
  useEffect(() => {
    if (techLabRef.current && activeTechNode !== undefined) {
      if (activeTechNode !== null) {
        techLabRef.current.activateNode(activeTechNode);
      }
    }
  }, [activeTechNode]);

  // Sync external robot action triggers (e.g. from companion HUD)
  useEffect(() => {
    if (robotAction && !isModalOpen) {
      switchRobotAction(robotAction);
    }
  }, [robotAction, isModalOpen, switchRobotAction]);

  // Dedicated Experience Modal Open Handler ("robot jangan hilang disini, buat dance")
  const isModalOpenRef = useRef(isModalOpen);
  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
    if (isModalOpen) {
      const isMobile = window.innerWidth < 768;
      // Step forward prominently into the visible right corridor, enlarge and DANCE!
      robotTargetPos.current = {
        x: isMobile ? 1.05 : 2.65,
        y: isMobile ? -0.45 : -0.32,
        z: 1.65,
      };
      robotTargetScale.current = isMobile ? 1.15 : 1.55;
      robotTargetRotY.current = -0.45;
      switchRobotAction("Dance");
    } else {
      // Modal closed: return to standard wave/walk posture
      switchRobotAction("Wave");
    }
  }, [isModalOpen, switchRobotAction]);

  // Discrete ScrollTrigger setup: updates TARGETS smoothly, NEVER snaps!
  const setupDiscreteScrollChoreography = (techLab: THREE.Group) => {
    const isMobile = window.innerWidth < 768;

    const addTrigger = (vars: ScrollTrigger.Vars) => {
      const st = ScrollTrigger.create(vars);
      triggersRef.current.push(st);
      return st;
    };

    // Track full scroll progress for continuous orbit
    addTrigger({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollProgressRef.current = self.progress;
      },
    });

    // 1. INTRO / VOID STAGE (Robot in Center Waving -> Smooth Transition to Sector 02)
    addTrigger({
      trigger: "#zone-void",
      start: "top top",
      end: "bottom top",
      scrub: 1.0,
      onUpdate: (self) => {
        if (isModalOpenRef.current) return;
        const p = self.progress;

        // Cinematic hyperspace warp stars as user scrolls between pages
        if (starfieldRef.current) {
          starfieldRef.current.setWarp(1 + p * 7);
        }

        if (p < 0.12) {
          // Centered & actively waving at intro: enlarged and heroic per user request
          onStageChange?.("the-void", p);
          robotTargetPos.current = { x: 0, y: -0.40, z: 1.8 };
          robotTargetScale.current = isMobile ? 0.85 : 1.35;
          robotTargetRotY.current = 0;
          switchRobotAction("Wave");
        } else {
          // Page transition: robot smoothly glides from center to the RIGHT margin while WALKING
          onStageChange?.("take-off", p);
          const t = (p - 0.12) / 0.88;
          robotTargetPos.current = {
            x: isMobile ? 1.45 * t : 3.35 * t,
            y: -0.40 - t * 0.14,
            z: 1.8 - t * 0.45,
          };
          robotTargetScale.current = (isMobile ? 0.85 : 1.35) + t * 0.15;
          robotTargetRotY.current = -t * 0.55; // Angled left towards the cards
          switchRobotAction("Walking");
        }
      },
      onEnter: () => {
        if (isModalOpenRef.current) return;
        onStageChange?.("the-void", 0);
        robotTargetPos.current = { x: 0, y: -0.40, z: 1.8 };
        robotTargetScale.current = isMobile ? 0.85 : 1.35;
        robotTargetRotY.current = 0;
        switchRobotAction("Wave");
      },
      onLeaveBack: () => {
        if (isModalOpenRef.current) return;
        onStageChange?.("the-void", 0);
        robotTargetPos.current = { x: 0, y: -0.40, z: 1.8 };
        robotTargetScale.current = isMobile ? 0.85 : 1.35;
        robotTargetRotY.current = 0;
        switchRobotAction("Wave");
        if (starfieldRef.current) {
          starfieldRef.current.setWarp(1.0);
        }
      },
    });

    // 2. EXPERIENCE WAYPOINTS STAGE (Robot positioned on the RIGHT, walking when scrolling & waving when idle)
    addTrigger({
      trigger: "#zone-experience",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.0,
      onUpdate: (self) => {
        if (isModalOpenRef.current) return;
        const p = self.progress;
        onStageChange?.("experience-waypoints", p);

        // Robot stands on the RIGHT edge with generous space facing left towards the cards
        if (isMobile) {
          robotTargetPos.current = { x: 1.4, y: -0.75, z: 1.3 };
          robotTargetScale.current = 0.95;
          robotTargetRotY.current = -0.45;
        } else {
          robotTargetPos.current = { x: 3.35, y: -0.52, z: 1.4 };
          robotTargetScale.current = 1.45;
          robotTargetRotY.current = -0.55;
        }

        // When actively scrolling, robot performs dynamic Walking stride!
        switchRobotAction("Walking");

        // When user pauses scrolling, robot smoothly transitions to waving
        if (scrollIdleTimerRef.current) {
          clearTimeout(scrollIdleTimerRef.current);
        }
        scrollIdleTimerRef.current = setTimeout(() => {
          if (!isModalOpenRef.current) {
            switchRobotAction("Wave");
          }
        }, 500);

        const waypointIndex = Math.min(
          Math.floor(p * EXPERIENCE_WAYPOINTS.length),
          EXPERIENCE_WAYPOINTS.length - 1
        );
        onActiveWaypointChange?.(waypointIndex);
      },
      onEnter: () => {
        if (isModalOpenRef.current) return;
        if (isMobile) {
          robotTargetPos.current = { x: 1.4, y: -0.75, z: 1.3 };
          robotTargetScale.current = 0.95;
          robotTargetRotY.current = -0.45;
        } else {
          robotTargetPos.current = { x: 3.35, y: -0.52, z: 1.4 };
          robotTargetScale.current = 1.45;
          robotTargetRotY.current = -0.55;
        }
        switchRobotAction("Wave");
      },
      onLeaveBack: () => {
        if (!isModalOpenRef.current) switchRobotAction("Walking");
      },
      onLeave: () => {
        if (!isModalOpenRef.current) switchRobotAction("Walking");
      },
    });

    // 3. TECHNOLOGY LAB STAGE (Protagonist robot strictly on the RIGHT margin, looking left at skills)
    addTrigger({
      trigger: "#zone-skills",
      start: "top center",
      end: "bottom center",
      scrub: 1.0,
      onUpdate: (self) => {
        if (isModalOpenRef.current) return;
        const p = self.progress;
        onStageChange?.("tech-lab", p);

        robotTargetPos.current = { x: isMobile ? 1.3 : 3.05, y: isMobile ? -0.75 : -0.55, z: 1.4 };
        robotTargetScale.current = isMobile ? 0.95 : 1.45;
        robotTargetRotY.current = -0.50; // Angled left towards skills

        // Materialize tech lab 3D nodes on the left/center
        techLab.position.set(isMobile ? 0 : -0.8, 0, -0.3);
        techLab.scale.setScalar(Math.min(p * 1.3, 1.0));
      },
      onEnter: () => {
        if (!isModalOpenRef.current) switchRobotAction("ThumbsUp");
      },
      onLeave: () => {
        if (!isModalOpenRef.current) switchRobotAction("Walking");
      },
    });

    // 4. ABOUT DOSSIER STAGE (Robot strictly on the RIGHT margin, looking left at dossier!)
    addTrigger({
      trigger: "#zone-about",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (isModalOpenRef.current) return;
        onStageChange?.("about", 0.5);
        robotTargetPos.current = { x: isMobile ? 1.3 : 3.05, y: isMobile ? -0.75 : -0.55, z: 1.4 };
        robotTargetScale.current = isMobile ? 0.95 : 1.45;
        robotTargetRotY.current = -0.50; // Angled towards the dossier on the left
        switchRobotAction("ThumbsUp");
      },
    });

    // 6. CONTACT & VICTORY DANCE (Robot in Center, clear from top headline and bottom buttons)
    addTrigger({
      trigger: "#zone-contact",
      start: "top center",
      end: "bottom bottom",
      onEnter: () => {
        if (isModalOpenRef.current) return;
        onStageChange?.("contact", 0.5);
        robotTargetPos.current = { x: 0, y: -0.30, z: 1.65 };
        robotTargetScale.current = isMobile ? 1.15 : 1.65;
        robotTargetRotY.current = 0;
        switchRobotAction("Dance");
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
