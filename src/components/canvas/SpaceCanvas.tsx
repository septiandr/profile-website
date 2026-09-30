"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Activity, Layers } from "lucide-react";

export default function SpaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);
  const [robotActionName, setRobotActionName] = useState<string>("Wave");

  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  // Model groups
  const rocketGroupRef = useRef<THREE.Group | null>(null);
  const astronautGroupRef = useRef<THREE.Group | null>(null);
  const robotGroupRef = useRef<THREE.Group | null>(null);

  // Animation mixer for Robot
  const robotMixerRef = useRef<THREE.AnimationMixer | null>(null);
  const robotActionsRef = useRef<{ [name: string]: THREE.AnimationAction }>({});
  const activeActionRef = useRef<THREE.AnimationAction | null>(null);

  // Starfield
  const starPointsRef = useRef<THREE.Points | null>(null);
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
    scene.fog = new THREE.FogExp2(0x030712, 0.035);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting System (Awwwards sci-fi studio aesthetic)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    // Primary Neon Cyan Key Light
    const keyLight = new THREE.DirectionalLight(0x00f5d4, 4.0);
    keyLight.position.set(6, 6, 5);
    scene.add(keyLight);

    // Electric Violet Fill Light
    const fillLight = new THREE.DirectionalLight(0x9d4edd, 3.0);
    fillLight.position.set(-6, -4, 2);
    scene.add(fillLight);

    // Pure White Top/Rim Accent
    const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // Bottom Cyber Warm Light
    const groundLight = new THREE.PointLight(0x00bbf9, 2.0, 15);
    groundLight.position.set(0, -5, 2);
    scene.add(groundLight);

    // 5. Starfield Particles (Deep Space Dust)
    const starCount = 1500;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorCyan = new THREE.Color(0x00f5d4);
    const colorViolet = new THREE.Color(0x9d4edd);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 50;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const rand = Math.random();
      const col = rand > 0.65 ? colorCyan : rand > 0.35 ? colorViolet : colorWhite;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.065,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);
    starPointsRef.current = starPoints;

    // 6. Three Independent Model Groups
    const rocketGroup = new THREE.Group();
    const astronautGroup = new THREE.Group();
    const robotGroup = new THREE.Group();

    scene.add(rocketGroup);
    scene.add(astronautGroup);
    scene.add(robotGroup);

    rocketGroupRef.current = rocketGroup;
    astronautGroupRef.current = astronautGroup;
    robotGroupRef.current = robotGroup;

    // 7. Load all 3 GLTF Models
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

            // Auto-compute bounding box for perfect normalized centering
            const box = new THREE.Box3().setFromObject(root);
            const size = box.getSize(new THREE.Vector3());
            const maxDim = Math.max(size.x, size.y, size.z);
            const normalizedScale = (1 / maxDim) * targetScale;

            root.scale.setScalar(normalizedScale);

            const center = box.getCenter(new THREE.Vector3());
            root.position.x = -center.x * normalizedScale;
            root.position.y = -center.y * normalizedScale;
            root.position.z = -center.z * normalizedScale;

            // Enhance materials for PBR glow
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

            // Handle Robot animations
            if (isRobot && gltf.animations && gltf.animations.length > 0) {
              const mixer = new THREE.AnimationMixer(root);
              robotMixerRef.current = mixer;

              gltf.animations.forEach((clip) => {
                robotActionsRef.current[clip.name] = mixer.clipAction(clip);
              });

              // Play initial greeting Wave, then switch to Idle
              const waveAction = robotActionsRef.current["Wave"];
              const idleAction = robotActionsRef.current["Idle"];

              if (waveAction) {
                waveAction.play();
                activeActionRef.current = waveAction;
                setRobotActionName("Wave");

                // Switch to Idle after 3.5 seconds
                setTimeout(() => {
                  if (idleAction && robotMixerRef.current) {
                    waveAction.fadeOut(0.5);
                    idleAction.reset().fadeIn(0.5).play();
                    activeActionRef.current = idleAction;
                    setRobotActionName("Idle");
                  }
                }, 3500);
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
            console.error("Failed to load model", path, err);
            reject(err);
          }
        );
      });
    };

    // Load all three simultaneously
    Promise.all([
      loadModel("/models/RocketShip.glb", rocketGroup, 1.8),
      loadModel("/models/Astronaut.glb", astronautGroup, 2.2),
      loadModel("/models/RobotExpressive.glb", robotGroup, 1.9, true),
    ])
      .then(() => {
        setLoading(false);
        setupTriChoreography(rocketGroup, astronautGroup, robotGroup);
      })
      .catch(() => setLoading(false));

    // Mouse listener
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mousePos.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize listener
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render loop
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update robot skeletal animations
      if (robotMixerRef.current) {
        robotMixerRef.current.update(delta);
      }

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Slow starfield rotation
      if (starPoints) {
        starPoints.rotation.y += 0.0003;
        starPoints.rotation.x += 0.0001;
      }

      // Parallax depths for all 3 models:
      // Rocket is agile (fastest parallax), Astronaut floats freely (medium), Robot operates stably (subtle)
      if (rocketGroup) {
        rocketGroup.position.x += (mousePos.current.x * 0.25 - rocketGroup.position.x * 0.05) * 0.02;
        rocketGroup.rotation.z += Math.sin(elapsed * 2) * 0.001;
      }
      if (astronautGroup) {
        astronautGroup.position.y += Math.sin(elapsed * 1.4) * 0.0015;
        astronautGroup.rotation.y += 0.0015;
      }
      if (robotGroup) {
        robotGroup.position.y += Math.sin(elapsed * 1.8 + 1) * 0.001;
      }

      // Subtle camera tilt
      camera.position.x = mousePos.current.x * 0.2;
      camera.position.y = mousePos.current.y * 0.15;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
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

  // Choreograph all 3 models with GSAP ScrollTrigger across the full page!
  const setupTriChoreography = (
    rocket: THREE.Group,
    astro: THREE.Group,
    robot: THREE.Group
  ) => {
    triggersRef.current.forEach((t) => t.kill());
    triggersRef.current = [];

    const isMobile = window.innerWidth < 768;

    // ==========================================
    // INITIAL POSE (HERO SECTION)
    // Three models form a dramatic sci-fi formation:
    // - Rocket cruising high at top-right
    // - Astronaut floating mid-right beside profile card
    // - Robot perched on mid-left/bottom welcoming user
    // ==========================================
    if (isMobile) {
      gsap.set(rocket.position, { x: 1.2, y: 1.8, z: -1.0 });
      gsap.set(rocket.rotation, { x: 0.3, y: -0.6, z: 0.2 });
      gsap.set(rocket.scale, { x: 0.6, y: 0.6, z: 0.6 });

      gsap.set(astro.position, { x: 0.8, y: -0.8, z: 0.2 });
      gsap.set(astro.rotation, { x: 0.1, y: -0.4, z: 0.1 });
      gsap.set(astro.scale, { x: 0.65, y: 0.65, z: 0.65 });

      gsap.set(robot.position, { x: -1.0, y: -1.2, z: 0.0 });
      gsap.set(robot.rotation, { x: 0.0, y: 0.5, z: 0.0 });
      gsap.set(robot.scale, { x: 0.6, y: 0.6, z: 0.6 });
    } else {
      // Desktop Grand Trio Composition
      gsap.set(rocket.position, { x: 2.8, y: 1.4, z: -0.5 });
      gsap.set(rocket.rotation, { x: 0.35, y: -0.8, z: 0.25 });
      gsap.set(rocket.scale, { x: 1.1, y: 1.1, z: 1.1 });

      gsap.set(astro.position, { x: 2.0, y: -0.7, z: 0.8 });
      gsap.set(astro.rotation, { x: 0.15, y: -0.5, z: 0.1 });
      gsap.set(astro.scale, { x: 1.0, y: 1.0, z: 1.0 });

      gsap.set(robot.position, { x: -2.7, y: -1.1, z: 0.5 });
      gsap.set(robot.rotation, { x: 0.0, y: 0.7, z: 0.0 });
      gsap.set(robot.scale, { x: 0.95, y: 0.95, z: 0.95 });
    }

    // ==========================================
    // 1. SCROLL TO ABOUT SECTION
    // Rocket swoops across, Astronaut comes close to left bio, Robot stands on right
    // ==========================================
    const tAboutRocket = gsap.to(rocket.position, {
      x: isMobile ? -1.0 : -2.6,
      y: isMobile ? 1.5 : 1.6,
      z: -0.8,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#about", start: "top bottom", end: "top center", scrub: 1.2 },
    });
    const rAboutRocket = gsap.to(rocket.rotation, {
      x: 0.2,
      y: 0.6,
      z: -0.3,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#about", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tAboutAstro = gsap.to(astro.position, {
      x: isMobile ? 0.9 : -1.8,
      y: isMobile ? -0.4 : -0.2,
      z: 1.0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#about", start: "top bottom", end: "top center", scrub: 1.2 },
    });
    const rAboutAstro = gsap.to(astro.rotation, {
      x: -0.1,
      y: 0.8,
      z: -0.1,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#about", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tAboutRobot = gsap.to(robot.position, {
      x: isMobile ? -0.8 : 2.6,
      y: isMobile ? -1.3 : -0.8,
      z: 0.6,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
        onEnter: () => switchRobotAction("ThumbsUp"),
        onLeaveBack: () => switchRobotAction("Idle"),
      },
    });
    const rAboutRobot = gsap.to(robot.rotation, {
      x: 0.05,
      y: -0.7,
      z: 0.0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#about", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    // ==========================================
    // 2. SCROLL TO EXPERIENCE SECTION
    // Rocket banks high right escorting the timeline; Astro glides; Robot walks along
    // ==========================================
    const tExpRocket = gsap.to(rocket.position, {
      x: isMobile ? 1.0 : 2.8,
      y: isMobile ? 0.5 : 0.8,
      z: 0.0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#experience", start: "top bottom", end: "top center", scrub: 1.2 },
    });
    const rExpRocket = gsap.to(rocket.rotation, {
      x: 0.5,
      y: -0.9,
      z: 0.4,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#experience", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tExpAstro = gsap.to(astro.position, {
      x: isMobile ? -0.9 : -2.4,
      y: isMobile ? 0.2 : 0.4,
      z: 0.2,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#experience", start: "top bottom", end: "top center", scrub: 1.2 },
    });
    const rExpAstro = gsap.to(astro.rotation, {
      x: 0.2,
      y: 0.5,
      z: 0.0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#experience", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tExpRobot = gsap.to(robot.position, {
      x: isMobile ? 0.8 : -2.6,
      y: isMobile ? -1.2 : -1.2,
      z: 0.4,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#experience",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
        onEnter: () => switchRobotAction("Walking"),
        onLeaveBack: () => switchRobotAction("ThumbsUp"),
      },
    });

    // ==========================================
    // 3. SCROLL TO PROJECTS SECTION
    // Triad constellation orbiting around the project showcase!
    // ==========================================
    const tProjRocket = gsap.to(rocket.position, {
      x: isMobile ? 0 : 0.0,
      y: isMobile ? 1.6 : 1.9,
      z: -0.8,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#projects", start: "top bottom", end: "top center", scrub: 1.2 },
    });
    const rProjRocket = gsap.to(rocket.rotation, {
      x: 0.6,
      y: 0.0,
      z: 0.0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#projects", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tProjAstro = gsap.to(astro.position, {
      x: isMobile ? 0.9 : 2.5,
      y: isMobile ? -1.0 : -1.2,
      z: 0.5,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#projects", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tProjRobot = gsap.to(robot.position, {
      x: isMobile ? -0.9 : -2.5,
      y: isMobile ? -1.0 : -1.2,
      z: 0.5,
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
    // 4. SCROLL TO SKILLS SECTION
    // Flanking the telemetry matrix with inspection angles
    // ==========================================
    const tSkillsRocket = gsap.to(rocket.position, {
      x: isMobile ? 0 : 0.0,
      y: isMobile ? -1.5 : -1.8,
      z: -1.2,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#skills", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tSkillsAstro = gsap.to(astro.position, {
      x: isMobile ? -0.8 : -2.6,
      y: isMobile ? 0.2 : 0.0,
      z: 0.6,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#skills", start: "top bottom", end: "top center", scrub: 1.2 },
    });
    const rSkillsAstro = gsap.to(astro.rotation, {
      x: 0.0,
      y: 1.2,
      z: 0.0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#skills", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tSkillsRobot = gsap.to(robot.position, {
      x: isMobile ? 0.8 : 2.6,
      y: isMobile ? 0.0 : 0.0,
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
    // 5. SCROLL TO CONTACT SECTION (FINALE MISSION LAUNCH)
    // Rocket points straight up ready for launch; Astro & Robot salute/dance
    // ==========================================
    const tContactRocket = gsap.to(rocket.position, {
      x: 0,
      y: isMobile ? 1.2 : 1.4,
      z: 0.6,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#contact", start: "top bottom", end: "top center", scrub: 1.2 },
    });
    const rContactRocket = gsap.to(rocket.rotation, {
      x: -0.2,
      y: 0.0,
      z: 0.0,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#contact", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tContactAstro = gsap.to(astro.position, {
      x: isMobile ? -0.9 : -2.2,
      y: isMobile ? -0.7 : -0.5,
      z: 1.2,
      ease: "power1.inOut",
      scrollTrigger: { trigger: "#contact", start: "top bottom", end: "top center", scrub: 1.2 },
    });

    const tContactRobot = gsap.to(robot.position, {
      x: isMobile ? 0.9 : 2.2,
      y: isMobile ? -0.7 : -0.5,
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
      tAboutRocket.scrollTrigger!,
      rAboutRocket.scrollTrigger!,
      tAboutAstro.scrollTrigger!,
      rAboutAstro.scrollTrigger!,
      tAboutRobot.scrollTrigger!,
      rAboutRobot.scrollTrigger!,
      tExpRocket.scrollTrigger!,
      rExpRocket.scrollTrigger!,
      tExpAstro.scrollTrigger!,
      rExpAstro.scrollTrigger!,
      tExpRobot.scrollTrigger!,
      tProjRocket.scrollTrigger!,
      rProjRocket.scrollTrigger!,
      tProjAstro.scrollTrigger!,
      tProjRobot.scrollTrigger!,
      tSkillsRocket.scrollTrigger!,
      tSkillsAstro.scrollTrigger!,
      rSkillsAstro.scrollTrigger!,
      tSkillsRobot.scrollTrigger!,
      tContactRocket.scrollTrigger!,
      rContactRocket.scrollTrigger!,
      tContactAstro.scrollTrigger!,
      tContactRobot.scrollTrigger!,
    ].filter(Boolean);
  };

  return (
    <>
      {/* Pinned 3D Three.js canvas container */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />

      {/* Floating Agency Telemetry Widget */}
      <div className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-space-950/80 px-3.5 py-1.5 backdrop-blur-xl shadow-2xl">
          <Layers className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-[11px] text-slate-300 tracking-wider">
            3D TRIAD SYNC:
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            ROCKET • ASTRONAUT • ROBOT ({robotActionName.toUpperCase()})
          </span>
        </div>

        {/* Quick trigger for visitor to interact with robot */}
        <button
          onClick={() => {
            const nextList = ["Dance", "Wave", "ThumbsUp", "Jump", "WalkJump"];
            const currentIdx = nextList.indexOf(robotActionName);
            const next = nextList[(currentIdx + 1) % nextList.length];
            switchRobotAction(next);
          }}
          className="rounded-full border border-purple-500/30 bg-purple-950/40 px-3 py-1.5 font-mono text-[10px] text-purple-300 backdrop-blur-xl hover:border-purple-400 hover:text-white transition-all shadow-lg flex items-center gap-1.5 group"
        >
          <Activity className="h-3 w-3 text-purple-400 group-hover:scale-125 transition-transform" />
          <span>ROBOT: {robotActionName.toUpperCase()}</span>
        </button>

        {loading && (
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-space-950/90 px-3 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SYNCING 3D ASSETS ({loadedCount}/3)...</span>
          </div>
        )}
      </div>
    </>
  );
}
