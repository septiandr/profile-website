"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Floating retro world props: clouds, sun, coins and ? blocks.
 * Pure CSS animations — no JS needed.
 */
export default function Ornaments() {
  const { scrollY } = useScroll();
  const cloudsY = useTransform(scrollY, [0, 1200], [0, 180]);
  const coinsY = useTransform(scrollY, [0, 1200], [0, -140]);
  const blocksY = useTransform(scrollY, [0, 1200], [0, 100]);

  return (
    <div className="ornaments" aria-hidden>
      <motion.span className="orn pixel-sun sun" style={{ y: blocksY }} />
      <motion.span className="orn pixel-cloud cloud c1" style={{ y: cloudsY }} />
      <motion.span className="orn pixel-cloud cloud c2" style={{ y: cloudsY }} />
      <motion.span className="orn pixel-cloud cloud c3" style={{ y: cloudsY }} />
      <motion.span className="orn pixel-coin coin k1" style={{ y: coinsY }} />
      <motion.span className="orn pixel-coin coin k2" style={{ y: coinsY }} />
      <motion.span className="orn pixel-coin coin k3" style={{ y: coinsY }} />
      <motion.span className="orn pixel-block block b1" style={{ y: blocksY }} />
      <motion.span className="orn pixel-block block b2" style={{ y: blocksY }} />
    </div>
  );
}
