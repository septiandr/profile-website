"use client";

/**
 * Tiny 8-bit SFX engine built on Web Audio (no assets needed).
 * Sounds only start from user gestures, so no autoplay issues.
 */

let ctx: AudioContext | null = null;
let lastHover = 0;

function audioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function tone(
  freq: number,
  at: number,
  dur: number,
  type: OscillatorType,
  vol: number
) {
  const c = audioContext();
  if (!c) return;
  const t0 = c.currentTime + at;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  gain.gain.setValueAtTime(vol, t0);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.03);
}

export const sfx = {
  /** Short blip on hover — throttled so we don't spam audio. */
  hover() {
    const now = Date.now();
    if (now - lastHover < 70) return;
    lastHover = now;
    tone(660, 0, 0.04, "square", 0.012);
  },
  /** Classic two-note arcade confirm. */
  select() {
    tone(520, 0, 0.05, "square", 0.03);
    tone(780, 0.05, 0.07, "square", 0.03);
  },
  /** Mario-style coin. */
  coin() {
    tone(988, 0, 0.07, "square", 0.04);
    tone(1319, 0.08, 0.14, "square", 0.04);
  },
  /** Rising jump sweep. */
  jump() {
    tone(330, 0, 0.09, "square", 0.03);
    tone(660, 0.06, 0.1, "square", 0.025);
  },
};
