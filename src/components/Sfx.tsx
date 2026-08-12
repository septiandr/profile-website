"use client";

import { useEffect } from "react";
import { music, sfx } from "@/lib/sound";

/**
 * Listens globally for interactions with interactive elements
 * (a, button, [data-sfx]) and plays matching 8-bit blips.
 * Also unlocks the looping background music on the first gesture.
 */
export default function Sfx() {
  useEffect(() => {
    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element &&
      Boolean(el.closest?.("a, button, [data-sfx], [role='link']"));

    const onOver = (e: Event) => {
      if (isInteractive(e.target)) sfx.hover();
    };
    const onDown = (e: Event) => {
      if (isInteractive(e.target)) sfx.select();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isInteractive(e.target)) sfx.select();
    };

    // Browsers block audio until a user gesture — use the first one to
    // start the background music (respects the saved on/off preference).
    const unlockMusic = () => music.unlock();
    document.addEventListener("pointerdown", unlockMusic, { once: true });
    document.addEventListener("keydown", unlockMusic, { once: true });

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", unlockMusic);
      document.removeEventListener("keydown", unlockMusic);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
