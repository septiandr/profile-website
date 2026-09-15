"use client";
import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LETTER_COLORS = [
  "#e52521", // R
  "#fbd000", // I
  "#3aa43a", // S
  "#2456d0", // A
  "#e52521", // N
  "#fbd000", // G
  "#3aa43a", // A
  "#2456d0", // L
  "#e52521", // I
  "#fbd000", // H
];

export default function Hero() {
  const [hasStarted, setHasStarted] = useState(false);
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 700], [0, 110]);
  const avatarY = useTransform(scrollY, [0, 700], [0, -85]);
  const backgroundY = useTransform(scrollY, [0, 700], [0, 180]);

  useEffect(() => {
    if (hasStarted) return;

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [hasStarted]);

  const startGame = (event: MouseEvent<HTMLAnchorElement>) => {
    if (hasStarted) return;
    event.preventDefault();
    setHasStarted(true);
  };

  return (
    <motion.section
      className="hero"
      id="home"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.div className="container hero-inner" style={{ y: backgroundY }}>
        <motion.div style={{ y: titleY }}>
          <motion.p className="hero-tag hero-line pixel" variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>★ 8-BIT WEB DEVELOPER ★</motion.p>

          <motion.h1 className="hero-title" whileHover={{ scale: 1.02 }}>
            {"RISANGALIH".split("").map((ch, i) => (
              <motion.span
                key={i}
                className="hero-letter"
                initial={{ opacity: 0, y: 18, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 300, damping: 16 }}
                style={{
                  color: LETTER_COLORS[i % LETTER_COLORS.length],
                  animationDelay: `${(i % 5) * 0.12}s`,
                }}
              >
                {ch}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p className="hero-sub hero-line pixel" variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            HI! I’M SEPTIAN D RISANGALIH — I CRAFT <span className="hl">WEB EXPERIENCES</span>
            <br />
            THAT ARE <span className="hl">FAST</span> · <span className="hl">SMOOTH</span> ·{" "}
            <span className="hl">MEANINGFUL</span>
          </motion.p>

          <motion.div className="hero-info hero-line pixel" variants={{ hidden: { y: 24, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
            <span>{hasStarted ? "PLAYER 1 ACTIVE" : "PLAYER 1 READY"}</span>
            <span>WORLD 1-1</span>
            <span className="coin-text">COINS 99</span>
          </motion.div>

          <motion.a href="#projects" className="btn press-start" onClick={startGame} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }} whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <span className={hasStarted ? "" : "blink"}>
              {hasStarted ? "▶ SCROLL TO PLAY" : "▶ PRESS START"}
            </span>
          </motion.a>
        </motion.div>

        <motion.div className="hero-avatar-wrap" style={{ y: avatarY }} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, type: "spring", stiffness: 220, damping: 14 }}>
          <div className="hero-avatar nes-frame">
            <Image
              src="/profile.jpg"
              alt="Pixel portrait of Risanggalih"
              width={96}
              height={96}
              priority
            />
          </div>
          <span className="avatar-label pixel">PLAYER 1</span>
        </motion.div>
      </motion.div>

      <div className="ground-strip" aria-hidden />
    </motion.section>
  );
}
