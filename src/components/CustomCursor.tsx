"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-40);
  const y = useMotionValue(-40);
  const cursorX = useSpring(x, { stiffness: 500, damping: 35, mass: 0.25 });
  const cursorY = useSpring(y, { stiffness: 500, damping: 35, mass: 0.25 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => {
      media.removeEventListener("change", update);
      window.removeEventListener("mousemove", move);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="custom-cursor"
      style={{ x: cursorX, y: cursorY }}
      aria-hidden
    >
      <span />
    </motion.div>
  );
}
