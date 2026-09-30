"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Orbit, Sparkles } from "lucide-react";

export type ModelType = "Astronaut" | "RocketShip" | "RobotExpressive";

export default function SpaceCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentModel, setCurrentModel] = useState<ModelType>("Astronaut");
  const [loading, setLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const starPointsRef = useRef<THREE.Points | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const triggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030712, 0.04);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);
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
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x00f5d4, 3.5); // Neon Cyan
    keyLight.position.set(5, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9d4edd, 2.5); // Electric Violet
    fillLight.position.set(-5, -3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0); // Crisp Rim
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // 5. Starfield Particles
    const starCount = 1200;
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cyanColor = new THREE.Color(0x00f5d4);
    const violetColor = new THREE.Color(0x9d4edd);
    const whiteColor = new THREE.Color(0xffffff);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 45;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 45;

      const rand = Math.random();
      const col = rand > 0.7 ? cyanColor : rand > 0.4 ? violetColor : whiteColor;
      starColors[i * 3] = col.r;
      starColors[i * 3 + 1] = col.g;
      starColors[i * 3 + 2] = col.b;
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const starPoints = new THREE.Points(starGeometry, starMaterial);
    scene.add(starPoints);
    starPointsRef.current = starPoints;

    // 6. Model Root Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Mouse listener for parallax
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

    // 7. Render Loop
    const clock = new THREE.Clock();
    let animId = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Smooth mouse lerp
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // Slow starfield rotation
      if (starPoints) {
        starPoints.rotation.y += 0.0003;
        starPoints.rotation.x += 0.0001;
      }

      // Subtle breathing float on model group
      if (modelGroup) {
        modelGroup.position.y += Math.sin(clock.getElapsedTime() * 1.5) * 0.001;
      }

      // Camera subtle parallax
      camera.position.x = mousePos.current.x * 0.3;
      camera.position.y = mousePos.current.y * 0.2;
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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Load Model whenever currentModel changes
  useEffect(() => {
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    setLoading(true);
    setLoadProgress(0);

    // Clear previous model from group
    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0];
      modelGroup.remove(child);
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).geometry?.dispose();
      }
    }
    if (mixerRef.current) {
      mixerRef.current.stopAllAction();
      mixerRef.current = null;
    }

    const loader = new GLTFLoader();
    const modelPath = `/models/${currentModel}.glb`;

    loader.load(
      modelPath,
      (gltf) => {
        const root = gltf.scene;

        // Auto-compute bounding box to normalize scale & center
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = currentModel === "Astronaut" ? 2.6 : currentModel === "RocketShip" ? 2.2 : 2.0;
        const normalizedScale = (1 / maxDim) * targetScale;

        root.scale.setScalar(normalizedScale);

        // Center geometry offset
        const center = box.getCenter(new THREE.Vector3());
        root.position.x = -center.x * normalizedScale;
        root.position.y = -center.y * normalizedScale;
        root.position.z = -center.z * normalizedScale;

        // Enable shadows and enhance materials
        root.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = Math.max(0.2, mat.roughness ?? 0.4);
              mat.metalness = Math.min(0.8, mat.metalness ?? 0.2);
            }
          }
        });

        // Animations if available
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(root);
          mixerRef.current = mixer;
          // Play first clip (or idle/walk)
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        modelGroup.add(root);
        setLoading(false);

        // Setup GSAP ScrollTrigger timeline sync
        setupScrollChoreography(modelGroup, currentModel);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (error) => {
        console.error("Error loading model", error);
        setLoading(false);
      }
    );
  }, [currentModel]);

  const setupScrollChoreography = (modelGroup: THREE.Group, type: ModelType) => {
    // Kill existing triggers
    triggersRef.current.forEach((t) => t.kill());
    triggersRef.current = [];

    const isMobile = window.innerWidth < 768;

    // Reset initial pose for Hero
    if (isMobile) {
      gsap.set(modelGroup.position, { x: 0, y: -0.6, z: 0.5 });
      gsap.set(modelGroup.rotation, { x: 0.1, y: -0.3, z: 0 });
      gsap.set(modelGroup.scale, { x: 0.7, y: 0.7, z: 0.7 });
    } else {
      gsap.set(modelGroup.position, { x: 1.8, y: -0.2, z: 0.5 });
      gsap.set(modelGroup.rotation, { x: 0.15, y: -0.5, z: 0.05 });
      gsap.set(modelGroup.scale, { x: 1, y: 1, z: 1 });
    }

    // SECTION 1: ABOUT (Fly from right to left)
    const tAbout = gsap.to(modelGroup.position, {
      x: isMobile ? 0 : -1.8,
      y: isMobile ? -0.4 : 0.1,
      z: 0.8,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });
    const rAbout = gsap.to(modelGroup.rotation, {
      x: -0.1,
      y: 0.6,
      z: -0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });

    // SECTION 2: EXPERIENCE (Cruise & bank to the right side)
    const tExp = gsap.to(modelGroup.position, {
      x: isMobile ? 0 : 1.9,
      y: isMobile ? -0.5 : -0.2,
      z: 0.3,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#experience",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });
    const rExp = gsap.to(modelGroup.rotation, {
      x: 0.3,
      y: -0.8,
      z: 0.2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#experience",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });

    // SECTION 3: PROJECTS (Elevate & center orbital view)
    const tProj = gsap.to(modelGroup.position, {
      x: isMobile ? 0 : 0,
      y: isMobile ? 1.0 : 1.2,
      z: -0.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });
    const rProj = gsap.to(modelGroup.rotation, {
      x: 0.4,
      y: 0.1,
      z: 0.0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });

    // SECTION 4: SKILLS (Dock to left telemetry position)
    const tSkills = gsap.to(modelGroup.position, {
      x: isMobile ? 0 : -1.8,
      y: isMobile ? -0.5 : -0.1,
      z: 0.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });
    const rSkills = gsap.to(modelGroup.rotation, {
      x: 0.05,
      y: 1.1,
      z: -0.1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#skills",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });

    // SECTION 5: CONTACT (Grand frontal landing alignment)
    const tContact = gsap.to(modelGroup.position, {
      x: 0,
      y: isMobile ? -0.8 : -0.3,
      z: 1.4,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });
    const rContact = gsap.to(modelGroup.rotation, {
      x: 0,
      y: 0,
      z: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#contact",
        start: "top bottom",
        end: "top center",
        scrub: 1.2,
      },
    });

    triggersRef.current = [
      tAbout.scrollTrigger!,
      rAbout.scrollTrigger!,
      tExp.scrollTrigger!,
      rExp.scrollTrigger!,
      tProj.scrollTrigger!,
      rProj.scrollTrigger!,
      tSkills.scrollTrigger!,
      rSkills.scrollTrigger!,
      tContact.scrollTrigger!,
      rContact.scrollTrigger!,
    ].filter(Boolean);
  };

  return (
    <>
      {/* Pinned Three.js canvas container */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      />

      {/* Model Switcher HUD widget */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-2">
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-space-950/80 px-3 py-1.5 backdrop-blur-xl shadow-lg">
          <Orbit className="h-3.5 w-3.5 text-cyan-400 animate-spin-slow" />
          <span className="font-mono text-[11px] text-slate-400 tracking-wider">
            3D RIG:
          </span>
          {(["Astronaut", "RocketShip", "RobotExpressive"] as ModelType[]).map((type) => (
            <button
              key={type}
              onClick={() => setCurrentModel(type)}
              className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] transition-all ${
                currentModel === type
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_10px_rgba(0,245,212,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {type === "Astronaut" ? "ASTRONAUT" : type === "RocketShip" ? "ROCKET" : "ROBOT"}
            </button>
          ))}
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-space-950/90 px-3 py-1 font-mono text-[10px] text-cyan-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SYNCING 3D ASSET... {loadProgress > 0 ? `${loadProgress}%` : ""}</span>
          </div>
        )}
      </div>
    </>
  );
}
