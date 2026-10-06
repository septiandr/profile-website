"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Zap } from "lucide-react";

const SPEECH_LINES = [
  "⚡ Senior Frontend Architect at your service!",
  "🎨 Crafting 60fps digital experiences & enterprise SaaS!",
  "🚀 Specializing in React, Three.js, React Native & Golang!",
  "🏆 Binus University Computer Science (GPA 3.56)!",
  "🔋 Casion EV: 99.8% crash-free IoT charging telemetry!",
  "🏦 CIMB Niaga Octo Clicks: mission-critical banking security!",
  "💼 Ready for select enterprise commissions in 2026!",
];

const RUNNING_TICKER_ITEMS = [
  "★ RISANGGALIH · INDEPENDENT STUDIO",
  "⚡ SENIOR FRONTEND ARCHITECT",
  "🚀 60FPS THREE.JS & WEBGL EXPERIENCES",
  "🏆 BINUS UNIVERSITY CS (GPA 3.56)",
  "💼 10+ ENTERPRISE PLATFORMS SHIPPED",
  "🔋 CASION EV (99.8% STABILITY SLA)",
  "🏦 CIMB NIAGA OCTO CLICKS BANKING SECURITY",
  "💎 BEHAVE.ID MULTI-TIER REWARD ENGINES",
  "⚡ CLICK 3D MASCOT TO INTERACT",
];

export default function MagazineWalkingRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);

  // Dialog State
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [currentActionName, setCurrentActionName] = useState<string>("Walking");
  const [isSpeedRun, setIsSpeedRun] = useState<boolean>(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const robotModelRef = useRef<THREE.Group | null>(null);

  // Motion physics and stable refs
  const posXRef = useRef<number>(-0.8);
  const directionRef = useRef<number>(1); // 1 = right, -1 = left
  const targetRotationYRef = useRef<number>(Math.PI / 2);
  const isInteractingRef = useRef<boolean>(false);
  const isSpeedRunRef = useRef<boolean>(false);
  const isScrollingRef = useRef<boolean>(false);
  const currentActionNameRef = useRef<string>("Walking");
  const speechIndexRef = useRef<number>(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const speechTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Function to switch animation with crossfade using stable action ref
  const playClip = useCallback((clipName: string, duration = 0.25) => {
    const actions = actionsRef.current;
    const current = actions[currentActionNameRef.current];
    const next = actions[clipName];

    if (!next) return;
    if (current && current !== next) {
      current.fadeOut(duration);
    }
    next.reset().fadeIn(duration).play();
    currentActionNameRef.current = clipName;
    setCurrentActionName(clipName);
  }, []);

  // Trigger special reaction on click
  const triggerReaction = useCallback((forcedAction?: string) => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);

    const gestures = ["Wave", "Jump", "Dance", "ThumbsUp"];
    const chosen =
      forcedAction ||
      gestures[Math.floor(Math.random() * gestures.length)];

    playClip(chosen, 0.2);

    // Show speech line
    const text = SPEECH_LINES[speechIndexRef.current % SPEECH_LINES.length];
    speechIndexRef.current += 1;
    setSpeechText(text);

    // Auto resume after 2.8s: if scrolling, walk; if stationary, Wave/Dance
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
      if (isScrollingRef.current) {
        targetRotationYRef.current = directionRef.current > 0 ? Math.PI / 2 : -Math.PI / 2;
        const walkClip = isSpeedRunRef.current ? "Running" : "Walking";
        playClip(walkClip, 0.3);
      } else {
        targetRotationYRef.current = 0;
        playClip("Wave", 0.3);
      }
    }, 2800);

    // Auto dismiss speech bubble after 4.5s
    speechTimerRef.current = setTimeout(() => {
      setSpeechText(null);
    }, 4500);
  }, [playClip]);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let isDisposed = false;

    const CANVAS_HEIGHT = 225;
    let width = container.clientWidth || window.innerWidth;
    let height = CANVAS_HEIGHT;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Eye-level camera looking straight ahead with full vertical clearance for waving hands
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.90, 4.8);
    camera.lookAt(0, 0.90, 0);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch (err) {
      console.warn("WebGL initialization failed:", err);
      return;
    }

    // High-clarity Agency Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const fillBlue = new THREE.DirectionalLight(0x3b82f6, 1.5);
    fillBlue.position.set(-4, 3, 2);
    scene.add(fillBlue);

    const rimAmber = new THREE.DirectionalLight(0xf59e0b, 1.2);
    rimAmber.position.set(0, 4, -4);
    scene.add(rimAmber);

    // Soft drop shadow plane beneath robot
    const shadowGeo = new THREE.PlaneGeometry(1.6, 0.8);
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 60);
      grad.addColorStop(0, "rgba(9, 9, 11, 0.38)");
      grad.addColorStop(0.5, "rgba(9, 9, 11, 0.16)");
      grad.addColorStop(1, "rgba(9, 9, 11, 0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = 0.01;
    scene.add(shadowMesh);

    // State for Scroll-Driven Movement & Alternate Wave / Dance on Stop
    let isScrolling = false;
    let scrollStopTimer: NodeJS.Timeout | null = null;
    let gestureCycleTimer: NodeJS.Timeout | null = null;
    let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let stopGestureIdx = 0;

    const stopGestures = ["Wave", "Dance"];

    const cycleStopGestures = () => {
      if (isScrolling || isInteractingRef.current) return;
      const chosen = stopGestures[stopGestureIdx % stopGestures.length];
      stopGestureIdx += 1;
      playClip(chosen, 0.35);

      // Alternate to the next stopped gesture after 3.6s if still stopped
      gestureCycleTimer = setTimeout(cycleStopGestures, 3600);
    };

    const onScrollActivity = () => {
      if (gestureCycleTimer) clearTimeout(gestureCycleTimer);

      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY;

      // Update travel direction based on scroll intent
      if (Math.abs(deltaY) > 0.5) {
        if (deltaY > 0) {
          // Scrolling down: walk right
          directionRef.current = 1;
        } else {
          // Scrolling up: walk left
          directionRef.current = -1;
        }
      }
      lastScrollY = currentY;

      if (!isScrolling) {
        isScrolling = true;
        isScrollingRef.current = true;
        // Turn toward travel direction
        targetRotationYRef.current = directionRef.current > 0 ? Math.PI / 2 : -Math.PI / 2;
        const walkClip = isSpeedRunRef.current ? "Running" : "Walking";
        playClip(walkClip, 0.2);
      }

      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      scrollStopTimer = setTimeout(() => {
        isScrolling = false;
        isScrollingRef.current = false;

        // When scrolling stops: face camera and alternate between Dance and Wave!
        targetRotationYRef.current = 0;
        cycleStopGestures();
      }, 250);
    };

    window.addEventListener("scroll", onScrollActivity, { passive: true });
    window.addEventListener("wheel", onScrollActivity, { passive: true });
    window.addEventListener("touchmove", onScrollActivity, { passive: true });

    // Load 3D Robot
    const loader = new GLTFLoader();
    loader.load(
      "/models/RobotExpressive.glb",
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;
        // Uniform scale: fits full body and raised waving arms comfortably inside canvas
        model.scale.set(0.30, 0.30, 0.30);
        model.position.set(posXRef.current, 0, 0);
        model.rotation.y = 0; // Face front initially
        scene.add(model);
        robotModelRef.current = model;

        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        gltf.animations.forEach((clip) => {
          actionsRef.current[clip.name] = mixer.clipAction(clip);
        });

        // Greet user on load with friendly Wave!
        if (actionsRef.current["Wave"]) {
          actionsRef.current["Wave"].play();
          setCurrentActionName("Wave");
          currentActionNameRef.current = "Wave";
        } else if (actionsRef.current["Idle"]) {
          actionsRef.current["Idle"].play();
        }

        // Cycle into Dance after 3.8s if user hasn't scrolled yet
        gestureCycleTimer = setTimeout(cycleStopGestures, 3800);

        // Friendly initial greeting speech
        setTimeout(() => {
          setSpeechText("👋 Scroll down to explore! I'll walk with you!");
          setTimeout(() => setSpeechText(null), 4000);
        }, 1200);
      },
      undefined,
      (err) => {
        console.warn("Could not load robot model:", err);
      }
    );

    // Handle Window Resize
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      width = containerRef.current.clientWidth || window.innerWidth;
      height = CANVAS_HEIGHT;
      rendererRef.current.setSize(width, height);
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      const model = robotModelRef.current;
      if (model && cameraRef.current) {
        // Calculate dynamic horizontal bounds from camera frustum at z=0
        const vFov = (cameraRef.current.fov * Math.PI) / 180;
        const visibleHeight = 2 * Math.tan(vFov / 2) * cameraRef.current.position.z;
        const visibleWidth = visibleHeight * cameraRef.current.aspect;
        const limitX = Math.max(1.6, visibleWidth / 2 - 1.2);

        // ONLY advance position when user is actively scrolling or speed-running
        if (isScrolling && !isInteractingRef.current) {
          const moveSpeed = isSpeedRunRef.current ? 2.4 : 1.5;
          posXRef.current += directionRef.current * moveSpeed * delta;

          // Check right boundary
          if (posXRef.current >= limitX) {
            posXRef.current = limitX;
            directionRef.current = -1;
            targetRotationYRef.current = -Math.PI / 2;
          }
          // Check left boundary
          else if (posXRef.current <= -limitX) {
            posXRef.current = -limitX;
            directionRef.current = 1;
            targetRotationYRef.current = Math.PI / 2;
          }
        }

        // Apply position
        model.position.x = posXRef.current;
        shadowMesh.position.x = posXRef.current;

        // Smoothly interpolate rotation
        model.rotation.y = THREE.MathUtils.lerp(
          model.rotation.y,
          targetRotationYRef.current,
          delta * 9
        );

        // Update position of HTML speech bubble
        if (speechBubbleRef.current && cameraRef.current) {
          const headPos = new THREE.Vector3(posXRef.current, 1.48, 0);
          headPos.project(cameraRef.current);
          const rawScreenX = ((headPos.x + 1) * width) / 2;
          const screenX = Math.max(140, Math.min(width - 140, rawScreenX));
          const rawScreenY = ((-headPos.y + 1) * height) / 2;
          const screenY = Math.max(10, Math.min(height - 20, rawScreenY));
          speechBubbleRef.current.style.transform = `translate(${screenX}px, ${screenY}px) translate(-50%, -100%)`;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScrollActivity);
      window.removeEventListener("wheel", onScrollActivity);
      window.removeEventListener("touchmove", onScrollActivity);
      if (scrollStopTimer) clearTimeout(scrollStopTimer);
      if (gestureCycleTimer) clearTimeout(gestureCycleTimer);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
      if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [playClip]);

  const toggleRunSpeed = () => {
    const nextSpeed = !isSpeedRun;
    setIsSpeedRun(nextSpeed);
    isSpeedRunRef.current = nextSpeed;
    if (!isInteractingRef.current) {
      const nextClip = nextSpeed ? "Running" : "Walking";
      playClip(nextClip, 0.2);
    }
  };

  return (
    <aside
      aria-label="Interactive 3D Agency Robot Mascot"
      className="fixed bottom-0 left-0 right-0 h-64 sm:h-72 z-40 pointer-events-none select-none flex flex-col justify-end overflow-visible"
    >
      {/* Floating Dynamic Speech Bubble */}
      <div
        ref={speechBubbleRef}
        className={`absolute top-0 left-0 pointer-events-auto transition-opacity duration-300 z-50 ${
          speechText ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="bg-zinc-950 text-white px-4 py-2 rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.3)] border border-zinc-800 text-xs font-sans max-w-xs sm:max-w-sm flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-semibold text-[11px] sm:text-xs leading-snug">
            {speechText}
          </span>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-zinc-950" />
        </div>
      </div>

      {/* 3D WebGL Canvas Layer */}
      <div
        ref={containerRef}
        onClick={() => triggerReaction()}
        data-cursor-text="SAY HI"
        className="w-full h-[225px] pointer-events-auto cursor-pointer"
        title="Click the robot to interact!"
      />

      {/* Floating Action Buttons Dock (Above the running text) */}
      <div className="absolute bottom-11 right-6 pointer-events-auto hidden sm:flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md border border-zinc-950/15 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)]">
        <button
          onClick={() => triggerReaction("Wave")}
          data-cursor-text="WAVE"
          className="px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-700 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all flex items-center gap-1 cursor-pointer"
          title="Make robot wave"
        >
          <span>👋 Wave</span>
        </button>

        <button
          onClick={() => triggerReaction("Dance")}
          data-cursor-text="DANCE"
          className="px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-700 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all flex items-center gap-1 cursor-pointer"
          title="Make robot dance"
        >
          <span>🕺 Dance</span>
        </button>

        <button
          onClick={() => triggerReaction("Jump")}
          data-cursor-text="JUMP"
          className="px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-wider text-zinc-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-all flex items-center gap-1 cursor-pointer"
          title="Make robot jump"
        >
          <span>⚡ Jump</span>
        </button>

        <button
          onClick={toggleRunSpeed}
          data-cursor-text={isSpeedRun ? "WALK" : "SPRINT"}
          className={`px-2.5 py-1 text-[10px] font-sans font-extrabold uppercase tracking-wider rounded-full transition-all flex items-center gap-1 cursor-pointer ${
            isSpeedRun
              ? "bg-orange-500 text-white shadow-xs"
              : "text-zinc-700 hover:bg-zinc-100"
          }`}
          title="Toggle walk or run speed"
        >
          <Zap className="h-3 w-3" />
          <span>{isSpeedRun ? "Running" : "Walk"}</span>
        </button>
      </div>

      {/* Mobile Interaction Hint Badge */}
      <div className="absolute bottom-11 left-4 pointer-events-auto sm:hidden">
        <button
          onClick={() => triggerReaction()}
          className="px-3 py-1 bg-white/90 backdrop-blur-md border border-zinc-950/15 rounded-full text-[10px] font-sans font-bold text-zinc-800 shadow-sm flex items-center gap-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Tap 3D Robot</span>
        </button>
      </div>

      {/* Continuous Bottom Running Marquee Text Track ("tulisan berjalan") */}
      <div className="w-full bg-zinc-950 text-white border-t-2 border-yellow-400 py-2 overflow-hidden shadow-2xl pointer-events-auto select-none z-30">
        <div className="flex w-max animate-marquee-agency text-[11px] sm:text-xs font-sans font-black tracking-wider uppercase">
          {[...RUNNING_TICKER_ITEMS, ...RUNNING_TICKER_ITEMS].map((item, idx) => (
            <span key={idx} className="inline-flex items-center gap-6 px-6">
              <span className="text-yellow-400 font-extrabold">●</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
