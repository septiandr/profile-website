"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Zap } from "lucide-react";

const SPEECH_LINES = [
  "💼 Available for Enterprise System, Website, Mobile App & Bot Engineering!",
  "🖥️ Need an Enterprise System, Analytics Dashboard, or ERP? Let's connect!",
  "🌐 Modern reactive websites, 60fps landing pages & 3D WebGL ready to build!",
  "📱 High-performance cross-platform Android & iOS React Native apps!",
  "🤖 Automated 24/7 Telegram & WhatsApp bots for your business workflow!",
  "🔋 Casion EV: 99.8% crash-free IoT charging telemetry architecture!",
  "🏦 CIMB Niaga Octo Clicks: mission-critical financial transaction security!",
  "⚡ Click or drag me to see dance, wave & jump animations!",
];

const RUNNING_TICKER_ITEMS = [
  "★ RISANGGALIH · INDEPENDENT STUDIO",
  "💼 AVAILABLE FOR COMMISSIONS: SYSTEM · WEBSITE · APP · BOT",
  "🖥️ ENTERPRISE SYSTEMS & DASHBOARDS (GOLANG · NODE · POSTGRES)",
  "🌐 MODERN WEBSITES & 3D WEBGL (NEXT.JS 15 · THREE.JS · GSAP)",
  "📱 MOBILE APPS ANDROID & IOS (REACT NATIVE · IOT TELEMETRY)",
  "🤖 24/7 AUTOMATION BOTS (TELEGRAM · WHATSAPP · DISCORD · AI)",
  "⚡ 99.8% PRODUCTION SLA · 60FPS CERTIFIED",
  "🏆 BINUS UNIVERSITY COMPUTER SCIENCE GRADUATE",
  "💬 WHATSAPP INQUIRY: +62 856-4644-4805",
];

// Three.js Orthographic Camera & Stage Configuration
const ROBOT_CANVAS_HEIGHT = 260; // Elevated canvas height for generous vertical headroom
const ROBOT_VISIBLE_HEIGHT = 2.8; // Vertical span in Three.js world units
const ROBOT_CENTER_Y = 0.72; // Lower camera center raises the robot ground (y=0) well above the bottom line

export default function MagazineWalkingRobot() {
  const containerRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);

  // Dialog State
  const [speechText, setSpeechText] = useState<string | null>(null);
  const [currentActionName, setCurrentActionName] = useState<string>("Walking");
  const [isSpeedRun, setIsSpeedRun] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // References for Three.js state
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const robotModelRef = useRef<THREE.Group | null>(null);

  // Motion physics and stable refs
  const posXRef = useRef<number>(-0.5);
  const posYRef = useRef<number>(0);
  const velYRef = useRef<number>(0);
  const directionRef = useRef<number>(1); // 1 = right, -1 = left
  const targetRotationYRef = useRef<number>(Math.PI / 2);
  const isInteractingRef = useRef<boolean>(false);
  const isSpeedRunRef = useRef<boolean>(false);
  const isScrollingRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const hasDraggedRef = useRef<boolean>(false);
  const dragStartScreenRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
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

  // Coordinate helper: translates client pixels into Three.js Orthographic world space
  const getWorldCoords = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return { worldX: 0, worldY: 0, halfWidth: 2 };
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width || window.innerWidth;
    const height = rect.height || ROBOT_CANVAS_HEIGHT;
    const aspect = width / height;
    const visibleWidth = ROBOT_VISIBLE_HEIGHT * aspect;
    const halfWidth = visibleWidth / 2;
    const top = ROBOT_CENTER_Y + ROBOT_VISIBLE_HEIGHT / 2;

    const pointerX = clientX - rect.left;
    const pointerY = clientY - rect.top;

    const worldX = (pointerX / width - 0.5) * visibleWidth;
    const worldY = top - (pointerY / height) * ROBOT_VISIBLE_HEIGHT;

    return { worldX, worldY, halfWidth };
  }, []);

  // Hit-test whether client pointer is hovering over/touching the robot
  const isOverRobot = useCallback((clientX: number, clientY: number) => {
    const { worldX, worldY } = getWorldCoords(clientX, clientY);
    const rx = posXRef.current;
    const ry = posYRef.current;
    const dx = Math.abs(worldX - rx);
    const dy = worldY - ry;
    // Comfortable hit box around robot body
    return dx <= 0.65 && dy >= -0.25 && dy <= 1.85;
  }, [getWorldCoords]);

  // Start grabbing robot
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isOverRobot(e.clientX, e.clientY)) return;

    e.preventDefault();
    const { worldX, worldY } = getWorldCoords(e.clientX, e.clientY);
    isDraggingRef.current = true;
    setIsDragging(true);
    hasDraggedRef.current = false;
    dragStartScreenRef.current = { x: e.clientX, y: e.clientY };
    dragOffsetRef.current = {
      x: worldX - posXRef.current,
      y: worldY - posYRef.current,
    };
    velYRef.current = 0;

    if (containerRef.current) {
      try {
        containerRef.current.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }

    targetRotationYRef.current = 0;
    playClip("Jump", 0.15);

    const grabQuotes = [
      "Whoaaa! Lift off! 🪂",
      "Wheee! Where are we heading? 🚀",
      "Hold on tight, don't drop me! 🤖",
      "Hooray, flying high in zero-g! ✨",
      "Look at me float! 😄",
    ];
    setSpeechText(grabQuotes[Math.floor(Math.random() * grabQuotes.length)]);
    if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  // Move robot while grabbing or track hover state
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      const dist = Math.hypot(
        e.clientX - dragStartScreenRef.current.x,
        e.clientY - dragStartScreenRef.current.y
      );
      if (dist > 5) {
        hasDraggedRef.current = true;
      }

      const { worldX, worldY, halfWidth } = getWorldCoords(e.clientX, e.clientY);
      const isDesktop = (containerRef.current?.clientWidth || window.innerWidth) >= 640;
      const rightMargin = isDesktop ? 3.0 : 0.8;
      const leftMargin = isDesktop ? 0.9 : 0.7;
      const limitRight = Math.max(0.35, halfWidth - rightMargin);
      const limitLeft = -Math.max(0.35, halfWidth - leftMargin);

      const targetX = worldX - dragOffsetRef.current.x;
      const targetY = worldY - dragOffsetRef.current.y;

      posXRef.current = Math.max(limitLeft, Math.min(limitRight, targetX));
      // Clamp vertical lift: minimum 0.0 (ground), maximum 1.75 (top of canvas)
      posYRef.current = Math.max(0.0, Math.min(1.75, targetY));
      velYRef.current = 0;
    } else {
      const over = isOverRobot(e.clientX, e.clientY);
      if (over !== isHovering) {
        setIsHovering(over);
      }
    }
  };

  // Release grab: let gravity drop the robot with physics
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    if (containerRef.current) {
      try {
        if (containerRef.current.hasPointerCapture(e.pointerId)) {
          containerRef.current.releasePointerCapture(e.pointerId);
        }
      } catch {
        // ignore
      }
    }

    // If barely moved and near floor, count as click interaction
    if (!hasDraggedRef.current && posYRef.current <= 0.05) {
      triggerReaction();
      return;
    }

    // If released mid-air: initiate free fall with gravity!
    if (posYRef.current > 0.05) {
      velYRef.current = -0.5;
      playClip("Jump", 0.1);
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let isDisposed = false;

    let width = container.clientWidth || window.innerWidth;
    let height = ROBOT_CANVAS_HEIGHT;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Distortion-free Orthographic camera: parallel projection guarantees robot width & height remain 100% constant across entire screen width
    const aspect = width / height;
    const halfWidth = (ROBOT_VISIBLE_HEIGHT * aspect) / 2;
    const halfHeight = ROBOT_VISIBLE_HEIGHT / 2;
    const camera = new THREE.OrthographicCamera(
      -halfWidth,
      halfWidth,
      ROBOT_CENTER_Y + halfHeight,
      ROBOT_CENTER_Y - halfHeight,
      0.1,
      100
    );
    camera.position.set(0, ROBOT_CENTER_Y, 10);
    camera.lookAt(0, ROBOT_CENTER_Y, 0);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
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
    const shadowGeo = new THREE.PlaneGeometry(1.4, 0.7);
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

    // Load 3D Robot
    const loader = new GLTFLoader();
    loader.load(  
      "/models/RobotExpressive.glb",
      (gltf) => {
        if (isDisposed) return;
        const model = gltf.scene;
        // Natural uniform scale: perfectly proportional without squashing or head clipping
        const ROBOT_SCALE = 0.33;
        model.scale.set(ROBOT_SCALE, ROBOT_SCALE, ROBOT_SCALE);
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
      height = ROBOT_CANVAS_HEIGHT;
      rendererRef.current.setSize(width, height);

      const aspect = width / height;
      const halfW = (ROBOT_VISIBLE_HEIGHT * aspect) / 2;
      const halfH = ROBOT_VISIBLE_HEIGHT / 2;
      cameraRef.current.left = -halfW;
      cameraRef.current.right = halfW;
      cameraRef.current.top = ROBOT_CENTER_Y + halfH;
      cameraRef.current.bottom = ROBOT_CENTER_Y - halfH;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Animation Render Loop
    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      const model = robotModelRef.current;
      if (model && cameraRef.current) {
        // In Orthographic projection, cameraRef.current.right is exact halfWidth in world units
        const halfWidth = cameraRef.current.right;

        // Keep strictly inside container with safe margins on all viewports
        const isDesktop = width >= 640;
        const rightMargin = isDesktop ? 3.0 : 0.8;
        const leftMargin = isDesktop ? 0.9 : 0.7;
        const limitRight = Math.max(0.35, halfWidth - rightMargin);
        const limitLeft = -Math.max(0.35, halfWidth - leftMargin);

        // Clamp position so robot never gets stuck outside container
        posXRef.current = Math.max(limitLeft, Math.min(limitRight, posXRef.current));

        // ONLY advance horizontal position when user is actively scrolling or speed-running (and NOT dragging or airborne)
        const isAirborne = posYRef.current > 0.001;
        if (isScrolling && !isInteractingRef.current && !isDraggingRef.current && !isAirborne) {
          const moveSpeed = isSpeedRunRef.current ? 2.4 : 1.5;
          posXRef.current += directionRef.current * moveSpeed * delta;

          // Turn around cleanly inside container before colliding with edge or dock
          if (posXRef.current >= limitRight) {
            posXRef.current = limitRight;
            directionRef.current = -1;
            targetRotationYRef.current = -Math.PI / 2;
          } else if (posXRef.current <= limitLeft) {
            posXRef.current = limitLeft;
            directionRef.current = 1;
            targetRotationYRef.current = Math.PI / 2;
          }
        }

        // Gravity & impact physics when not being held
        if (!isDraggingRef.current) {
          if (posYRef.current > 0 || velYRef.current !== 0) {
            const GRAVITY = 16.0;
            velYRef.current -= GRAVITY * delta;
            posYRef.current += velYRef.current * delta;

            if (posYRef.current <= 0) {
              posYRef.current = 0;

              // Elastic bounce on impact
              if (velYRef.current < -1.8) {
                velYRef.current = -velYRef.current * 0.35;
                const landingQuotes = [
                  "Thud! Safe landing! 🎯",
                  "Ouch! Bouncy robot legs! ⚡",
                  "Perfect touchdown! Ready to roll! 🚀",
                ];
                setSpeechText(landingQuotes[Math.floor(Math.random() * landingQuotes.length)]);
                if (speechTimerRef.current) clearTimeout(speechTimerRef.current);
                speechTimerRef.current = setTimeout(() => setSpeechText(null), 3000);
              } else {
                velYRef.current = 0;
                if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
                resumeTimerRef.current = setTimeout(() => {
                  if (!isScrollingRef.current) {
                    targetRotationYRef.current = 0;
                    playClip("Wave", 0.3);
                  }
                }, 1200);
              }
            }
          }
        }

        // Apply 3D model position
        model.position.x = posXRef.current;
        model.position.y = posYRef.current;

        // Dynamic floor shadow that scales and softens as robot is lifted
        shadowMesh.position.x = posXRef.current;
        shadowMesh.position.y = 0.01;
        const heightRatio = Math.min(1, posYRef.current / 1.5);
        const shadowScale = THREE.MathUtils.lerp(1.0, 0.42, heightRatio);
        shadowMesh.scale.set(shadowScale, shadowScale, shadowScale);
        (shadowMat as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(0.38, 0.06, heightRatio);

        // Smoothly interpolate rotation (turn to front if grabbed or airborne)
        const desiredRotation = isDraggingRef.current || isAirborne ? 0 : targetRotationYRef.current;
        model.rotation.y = THREE.MathUtils.lerp(
          model.rotation.y,
          desiredRotation,
          delta * 9
        );

        // Update position of HTML speech bubble hovering above the robot head
        if (speechBubbleRef.current && cameraRef.current) {
          const headPos = new THREE.Vector3(posXRef.current, posYRef.current + 1.68, 0);
          headPos.project(cameraRef.current);
          const rawScreenX = ((headPos.x + 1) * width) / 2;
          const bubblePadding = Math.min(140, Math.max(80, width * 0.35));
          const screenX = Math.max(bubblePadding, Math.min(width - bubblePadding, rawScreenX));
          const rawScreenY = ((-headPos.y + 1) * height) / 2;
          const screenY = Math.max(16, Math.min(height - 24, rawScreenY));
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
      className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none select-none flex flex-col justify-end overflow-visible"
    >
      {/* 3D WebGL Canvas Layer with Grab & Physics Interaction */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        data-cursor-text={isDragging ? "HOLDING" : isHovering ? "GRAB ME" : "ROBOT"}
        className={`relative w-full h-[260px] pointer-events-auto overflow-visible touch-none select-none ${
          isDragging
            ? "cursor-grabbing"
            : isHovering
            ? "cursor-grab"
            : "cursor-default"
        }`}
        title="Click or grab and throw the robot!"
      >
        {/* Floating Dynamic Speech Bubble (anchored relative to canvas) */}
        <div
          ref={speechBubbleRef}
          className={`absolute top-0 left-0 pointer-events-auto transition-opacity duration-300 z-50 ${
            speechText ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-zinc-950 text-white px-4 py-2 rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.3)] border border-zinc-800 text-xs font-sans max-w-xs sm:max-w-sm flex items-center gap-2.5 whitespace-nowrap sm:whitespace-normal">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="font-semibold text-[11px] sm:text-xs leading-snug">
              {speechText}
            </span>
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-6 border-x-transparent border-t-6 border-t-zinc-950" />
          </div>
        </div>
      </div>

      {/* Floating Action Buttons Dock (Positioned in bottom-right corner) */}
      <div className="absolute bottom-11 right-4 sm:right-6 pointer-events-auto hidden sm:flex items-center gap-1.5 p-1 bg-white/95 backdrop-blur-md border border-zinc-950/15 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-50">
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
      <div className="absolute bottom-11 left-4 pointer-events-auto sm:hidden z-50">
        <button
          onClick={() => triggerReaction()}
          className="px-3 py-1 bg-white/90 backdrop-blur-md border border-zinc-950/15 rounded-full text-[10px] font-sans font-bold text-zinc-800 shadow-sm flex items-center gap-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Tap 3D Robot</span>
        </button>
      </div>

      {/* Continuous Bottom Running Marquee Text Track */}
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
