"use client";

import { useEffect } from "react";
import { sfx } from "@/lib/sound";

/**
 * Listens globally for interactions with interactive elements
 * (a, button, [data-sfx]) and plays matching 8-bit blips.
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

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
