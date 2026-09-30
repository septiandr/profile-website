"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass, Sparkles, Activity } from "lucide-react";

export default function SpaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [robotActionName, setRobotActionName] = useState<string>("Wave");

  // Three.js core references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Model group references
  const rocketGroupRef = useRef<THREE.Group | null>(null);
  const astronautGroupRef = useRef<THREE.Group | null>(null);
  const robotGroupRef = useRef<THREE.Group | null>(null);

  // User interactive drag rotation state for Rocket
  const isDragging = useRef(false);
  const previousPointerPos = useRef({ x: 0, y: 0 });
  const rocketUserRotation = useRef({ x: 0, y: 0 });
  const rocketInertia = useRef({ x: 0, y: 0 });

  // Robot animations
  const robotMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const robotActionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

  // Starfield & Warp particles
  const starPointsRef = useRef<THREE.Points | null>(null);
  const warpSpeedRef = useRef(1);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const triggersRef = useRef<ScrollTrigger[]>([]);

  // Function to switch Robot animation
  const switchRobotAction = (newActionName: string) => {
    const actions = robotActionsRef.current;
    if (!actions[newActionName]) return;

    const prevAction = activeActionRef.current;
    const nextAction = actions[newActionName];

    if (prevAction === nextAction) return;

    if (prevAction) {
      prevAction.fadeOut(0.3);
    }
    nextAction.reset().fadeIn(0.3).play();
    activeActionRef.current = nextAction;
    setRobotActionName(newActionName);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.03);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. High-performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f5d4, 4.0); // Neon Cyan
    keyLight.position.set(6, 6, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9d4edd, 3.2); // Electric Violet
    fillLight.position.set(-6, -4, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.5); // Top Crisp
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // 5. Starfield & Cosmic Dust Particles
    const starCount = 1800;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorCyan = new THREE.Color(0x00f5d4);
    const colorViolet = new THREE.Color(0x9d4edd);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const rand = Math.random();
      const col = rand > 0.6 ? colorCyan : rand > 0.35 ? colorViolet : colorWhite;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.07,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);
    starPointsRef.current = starPoints;

    // 6. Independent Model Groups
    const rocketGroup = new THREE.Group();
    const astronautGroup = new THREE.Group();
    const robotGroup = new THREE.Group();

    scene.add(rocketGroup);
    scene.add(astronautGroup);
    scene.add(robotGroup);

    rocketGroupRef.current = rocketGroup;
    astronautGroupRef.current = astronautGroup;
    robotGroupRef.current = robotGroup;

    // Initial stage positions:
    // Rocket is centered in Launchpad
    rocketGroup.position.set(0, 0, 0);
    rocketGroup.rotation.set(0.15, -0.4, 0.1);
    rocketGroup.scale.setScalar(2.3);

    // Astro and Robot are initially scaled down & waiting in the deep sectors
    astronautGroup.position.set(2.5, -2, -10);
    astronautGroup.scale.setScalar(0.001);

    robotGroup.position.set(-2.5, -2, -10);
    robotGroup.scale.setScalar(0.001);

    // 7. Load GLTF Models
    const loader = new GLTFLoader();

    const loadModel = (
      path: string,
      targetGroup: THREE.Group,
      targetScale: number,
      isRobot = false
    ): Promise<void> => {
      return new Promise((resolve, reject) => {
        loader.load(
          path,
          (gltf) => {
            const root = gltf.scene;

            const box = new THREE.Box3().setFromObject(root);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const normalizedScale = (1 / maxDim) * targetScale;

            root.scale.setScalar(normalizedScale);

            const center = box.getCenter(new THREE.Vector3());
            root.position.x = -center.x * normalizedScale;
            root.position.y = -center.y * normalizedScale;
            root.position.z = -center.z * normalizedScale;

            root.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                if (mesh.material) {
                  const mat = mesh.material as THREE.MeshStandardMaterial;
                  mat.roughness = Math.max(0.15, mat.roughness ?? 0.3);
                  mat.metalness = Math.min(0.85, mat.metalness ?? 0.2);
                }
              }
            });

            if (isRobot && gltf.animations && gltf.animations.length > 0) {
              const mixer = new THREE.AnimationMixer(root);
              robotMixerRef.current = mixer;

              gltf.animations.forEach((clip) => {
                robotActionsRef.current[clip.name] = mixer.clipAction(clip);
              });

              const waveAction = robotActionsRef.current["Wave"];
              const idleAction = robotActionsRef.current["Idle"];

              if (waveAction) {
                waveAction.play();
                activeActionRef.current = waveAction;
                setRobotActionName("Wave");
              } else if (idleAction) {
                idleAction.play();
                activeActionRef.current = idleAction;
                setRobotActionName("Idle");
              }
            }

            targetGroup.add(root);
            setLoadedCount((prev) => prev + 1);
            resolve();
          },
          undefined,
          (err) => {
            console.error("Model load error", path, err);
            reject(err);
          }
        );
      });
    };

    Promise.all([
      loadModel("/models/RocketShip.glb", rocketGroup, 1.8),
      loadModel("/models/Astronaut.glb", astronautGroup, 2.2),
      loadModel("/models/RobotExpressive.glb", robotGroup, 1.9, true),
    ])
      .then(() => {
        setLoading(false);
        setupJourneyChoreography(rocketGroup, astronautGroup, robotGroup);
      })
      .catch(() => setLoading(false));

    // Pointer Drag Listeners to allow user to freely rotate the rocket in the launchpad stage!
    const onPointerDown = (e: PointerEvent) => {
      // Only drag rocket when near top launchpad
      if (window.scrollY < window.innerHeight * 0.8) {
        isDragging.current = true;
        previousPointerPos.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      mousePos.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;

      if (!isDragging.current) return;
      const deltaX = e.clientX - previousPointerPos.current.x;
      const deltaY = e.clientY - previousPointerPos.current.y;

      rocketInertia.current.x = deltaX * 0.008;
      rocketInertia.current.y = deltaY * 0.008;

      rocketUserRotation.current.y += rocketInertia.current.x;
      rocketUserRotation.current.x += rocketInertia.current.y;

      previousPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (robotMixerRef.current) {
        robotMixerRef.current.update(delta);
      }

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Apply drag inertia to rocket when near launchpad
      if (!isDragging.current) {
        rocketInertia.current.x *= 0.92;
        rocketInertia.current.y *= 0.92;
        rocketUserRotation.current.y += rocketInertia.current.x;
        rocketUserRotation.current.x += rocketInertia.current.y;
      }

      // Starfield slow movement & warp acceleration
      if (starPoints) {
        starPoints.rotation.y += 0.0003 * warpSpeedRef.current;
        starPoints.rotation.x += 0.0001 * warpSpeedRef.current;
      }

      // Idle float for rocket when in Launchpad stage
      if (rocketGroup && window.scrollY < window.innerHeight * 0.5) {
        rocketGroup.rotation.y = rocketUserRotation.current.y + Math.sin(elapsed * 1.5) * 0.05;
        rocketGroup.rotation.x = rocketUserRotation.current.x + Math.cos(elapsed * 1.2) * 0.03;
        rocketGroup.position.y = Math.sin(elapsed * 2) * 0.08;
      }

      // Idle drift for Astronaut and Robot
      if (astronautGroup && astronautGroup.scale.x > 0.05) {
        astronautGroup.position.y += Math.sin(elapsed * 1.4) * 0.0015;
        astronautGroup.rotation.y += 0.0015;
      }
      if (robotGroup && robotGroup.scale.x > 0.05) {
        robotGroup.position.y += Math.sin(elapsed * 1.8) * 0.001;
      }

      // Camera subtle parallax
      camera.position.x = mousePos.current.x * 0.2;
      camera.position.y = mousePos.current.y * 0.15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      triggersRef.current.forEach((t) => t.kill());
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Choreograph the Game Journey:
  // Launchpad -> Rocket warps directly into the screen and disappears -> Next sectors reveal Astronaut & Robot!
  const setupJourneyChoreography = (
    rocket: THREE.Group,
    astro: THREE.Group,
    robot: THREE.Group
  ) => {
    triggersRef.current.forEach((t) => t.kill());
    triggersRef.current = [];

    const isMobile = window.innerWidth < 768;

    // ==========================================
    // STAGE 1: LAUNCH FROM #welcome TO #hero
    // Rocket accelerates forward directly toward the camera/screen (z: 0 -> 9.0),
    // zooms right past the screen, slowly and dramatically, then disappears!
    // ==========================================
    const launchTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#welcome",
        start: "top top",
        end: "bottom top",
        scrub: 1.2,
        onUpdate: (self) => {
          // Accelerate warp speed lines
          warpSpeedRef.current = 1 + self.progress * 8;
        },
      },
    });

    launchTimeline
      .to(rocket.position, {
        x: 0,
        y: 0.1,
        z: 8.8, // Flies right towards the viewer and past the camera lens (camera at 7.5)!
        ease: "power2.in",
      }, 0)
      .to(rocket.rotation, {
        x: -0.3, // Tilts forward in flight
        y: 0,
        z: 0,
        ease: "power1.inOut",
      }, 0)
      .to(rocket.scale, {
        x: 3.5,
        y: 3.5,
        z: 3.5,
        ease: "power2.in",
      }, 0);

    // ==========================================
    // STAGE 2: ARRIVAL AT #hero & #about (THE DOSSIER SECTOR)
    // As rocket vanishes past the screen, Astronaut floats in gracefully from deep space!
    // ==========================================
    const tHeroAstro = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top bottom",
        end: "center center",
        scrub: 1.2,
      },
    });

    tHeroAstro
      .to(astro.position, {
        x: isMobile ? 1.0 : 2.5,
        y: isMobile ? -0.8 : -0.5,
        z: 0.8,
        ease: "power1.out",
      }, 0)
      .to(astro.scale, {
        x: isMobile ? 0.7 : 1.1,
        y: isMobile ? 0.7 : 1.1,
        z: isMobile ? 0.7 : 1.1,
        ease: "power1.out",
      }, 0)
      .to(astro.rotation, {
        x: 0.1,
        y: -0.5,
        z: 0.1,
        ease: "power1.out",
      }, 0);

    // ==========================================
    // STAGE 3: #experience (MISSION HISTORY SECTOR)
    // Astronaut glides alongside timeline; Robot emerges from deep space into sector!
    // ==========================================
    const tExpAstro = gsap.to(astro.position, {
      x: isMobile ? -0.8 : -2.4,
      y: isMobile ? 0.2 : 0.3,
      z: 0.5,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#experience", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tExpRobot = gsap.timeline({
      scrollTrigger: {
        trigger: "#experience",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
        onEnter: () => switchRobotAction("Walking"),
        onLeaveBack: () => switchRobotAction("Wave"),
      },
    });

    tExpRobot
      .to(robot.position, {
        x: isMobile ? 0.8 : 2.6,
        y: isMobile ? -1.0 : -0.8,
        z: 0.6,
        ease: "power1.out",
      }, 0)
      .to(robot.scale, {
        x: isMobile ? 0.65 : 0.95,
        y: isMobile ? 0.65 : 0.95,
        z: isMobile ? 0.65 : 0.95,
        ease: "power1.out",
      }, 0)
      .to(robot.rotation, {
        x: 0.05,
        y: -0.6,
        z: 0,
        ease: "power1.out",
      }, 0);

    // ==========================================
    // STAGE 4: #projects (FULLSTACK ARCHITECTURES SECTOR)
    // Astronaut and Robot form an orbital flank around the projects!
    // ==========================================
    const tProjAstro = gsap.to(astro.position, {
      x: isMobile ? 0.9 : 2.5,
      y: isMobile ? -1.0 : -1.2,
      z: 0.4,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#projects", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tProjRobot = gsap.to(robot.position, {
      x: isMobile ? -0.9 : -2.5,
      y: isMobile ? -1.0 : -1.2,
      z: 0.4,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
        onEnter: () => switchRobotAction("Yes"),
        onLeaveBack: () => switchRobotAction("Walking"),
      },
    });

    // ==========================================
    // STAGE 5: #skills (TELEMETRY MATRIX SECTOR)
    // Robot inspects and gives ThumbsUp to the tech stack!
    // ==========================================
    const tSkillsRobot = gsap.to(robot.position, {
      x: isMobile ? 0.8 : 2.6,
      y: 0,
      z: 0.6,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
        onEnter: () => switchRobotAction("ThumbsUp"),
        onLeaveBack: () => switchRobotAction("Yes"),
      },
    });

    // ==========================================
    // STAGE 6: #contact (TERMINAL / LAUNCH RE-DOCK)
    // Robot and Astronaut celebrate contact!
    // ==========================================
    const tContactAstro = gsap.to(astro.position, {
      x: isMobile ? -0.8 : -2.2,
      y: isMobile ? -0.6 : -0.4,
      z: 1.2,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#contact", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tContactRobot = gsap.to(robot.position, {
      x: isMobile ? 0.8 : 2.2,
      y: isMobile ? -0.6 : -0.4,
      z: 1.2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
        onEnter: () => switchRobotAction("Dance"),
        onLeaveBack: () => switchRobotAction("ThumbsUp"),
      },
    });

    triggersRef.current = [
      launchTimeline.scrollTrigger!,
      tHeroAstro.scrollTrigger!,
      tExpAstro.scrollTrigger!,
      tExpRobot.scrollTrigger!,
      tProjAstro.scrollTrigger!,
      tProjRobot.scrollTrigger!,
      tSkillsRobot.scrollTrigger!,
      tContactAstro.scrollTrigger!,
      tContactRobot.scrollTrigger!,
    ].filter(Boolean);
  };

  return (
    <>
      {/* 3D Canvas element */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 z-0 overflow-hidden cursor-grab active:cursor-grabbing"
      />

      {/* Floating HUD status indicator */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-space-950/80 px-3.5 py-1.5 backdrop-blur-xl shadow-2xl">
          <Compass className="h-3.5 w-3.5 text-cyan-400 animate-spin-slow" />
          <span className="font-mono text-[11px] text-slate-300 tracking-wider">
            MISSION RIG:
          </span>
          <span className="font-mono text-[10px] text-cyan-300">
            WARP DRIVE READY • DRAG ROCKET TO ROTATE
          </span>
        </div>

        {/* Robot quick dance trigger */}
        <button
          onClick={() => {
            const nextList = ["Dance", "Wave", "ThumbsUp", "Jump"];
            const currentIdx = nextList.indexOf(robotActionName);
            const next = nextList[(currentIdx + 1) % nextList.length];
            switchRobotAction(next);
          }}
          className="rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 font-mono text-[10px] text-purple-300 backdrop-blur-xl hover:border-purple-400 hover:text-white transition-all shadow-lg flex items-center gap-1.5"
        >
          <Activity className="h-3 w-3 text-purple-400" />
          <span>ROBOT: {robotActionName.toUpperCase()}</span>
        </button>

        {loading && (
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-space-950/90 px-3 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>CALIBRATING 3D SHIPS ({loadedCount}/3)...</span>
          </div>
        )}
      </div>
    </>
  );
}
