"use client";

/**
 * Tiny 8-bit audio engine built on Web Audio (no assets needed).
 * - `sfx`   : short one-shot blips (hover / select / coin / jump)
 * - `music` : looping chiptune background track (square lead, triangle
 *             bass, noise hat + sine kick), scheduled with a lookahead
 *             timer so the loop stays glitch-free.
 *
 * The browser blocks audio until the first user gesture, so `music`
 * must be started from an interaction (see Sfx.tsx / Header.tsx).
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

/* ============================================================
   LOOPING CHIPTUNE MUSIC
   ============================================================ */

const MUSIC_KEY = "pixel-music";
const BPM = 138;
/** One 16th-note in seconds. */
const TICK = 60 / BPM / 4;
/** 4 bars of 16 steps. */
const LOOP_LEN = 128;

type SeqNote = { s: number; m: number; d: number };

/** Lead melody (square) — A minor, cheerful arcade vibe. */
const MELODY: SeqNote[] = [
  // Bar 1 (Am)
  { s: 0, m: 76, d: 2 },
  { s: 4, m: 79, d: 2 },
  { s: 8, m: 84, d: 4 },
  { s: 12, m: 79, d: 2 },
  { s: 16, m: 76, d: 4 },
  { s: 20, m: 72, d: 4 },
  { s: 24, m: 76, d: 2 },
  { s: 28, m: 72, d: 4 },
  // Bar 2 (F)
  { s: 32, m: 81, d: 2 },
  { s: 36, m: 77, d: 2 },
  { s: 40, m: 81, d: 4 },
  { s: 44, m: 84, d: 2 },
  { s: 48, m: 81, d: 4 },
  { s: 52, m: 77, d: 4 },
  { s: 56, m: 74, d: 4 },
  // Bar 3 (C)
  { s: 64, m: 84, d: 2 },
  { s: 68, m: 83, d: 2 },
  { s: 72, m: 79, d: 4 },
  { s: 76, m: 84, d: 2 },
  { s: 80, m: 79, d: 2 },
  { s: 84, m: 76, d: 2 },
  { s: 88, m: 79, d: 4 },
  // Bar 4 (G → Am)
  { s: 96, m: 74, d: 2 },
  { s: 100, m: 77, d: 2 },
  { s: 104, m: 81, d: 4 },
  { s: 108, m: 76, d: 2 },
  { s: 112, m: 72, d: 6 },
];

/** Bass (triangle) — root pulsing up an octave every half bar. */
const BASS: SeqNote[] = [
  { s: 0, m: 45, d: 6 },
  { s: 8, m: 57, d: 6 },
  { s: 16, m: 45, d: 6 },
  { s: 24, m: 57, d: 6 },
  { s: 32, m: 41, d: 6 },
  { s: 40, m: 53, d: 6 },
  { s: 48, m: 41, d: 6 },
  { s: 56, m: 53, d: 6 },
  { s: 64, m: 48, d: 6 },
  { s: 72, m: 60, d: 6 },
  { s: 80, m: 48, d: 6 },
  { s: 88, m: 60, d: 6 },
  { s: 96, m: 43, d: 6 },
  { s: 104, m: 55, d: 6 },
  { s: 112, m: 45, d: 6 },
  { s: 120, m: 57, d: 6 },
];

const melodyByTick: SeqNote[][] = Array.from({ length: LOOP_LEN }, () => []);
const bassByTick: SeqNote[][] = Array.from({ length: LOOP_LEN }, () => []);
for (const n of MELODY) melodyByTick[n.s % LOOP_LEN]?.push(n);
for (const n of BASS) bassByTick[n.s % LOOP_LEN]?.push(n);

function midiToFreq(m: number) {
  return 440 * Math.pow(2, (m - 69) / 12);
}

/* --- live note scheduling --- */

type ActiveNode = { osc: OscillatorNode; gain: GainNode };
const active = new Set<ActiveNode>();

let playing = false;
let musicOn = true;
let timer: ReturnType<typeof setInterval> | null = null;
let nextTime = 0;
let tickPos = 0;

/** Shared white-noise buffer for hats. */
let noiseBuf: AudioBuffer | null = null;
function getNoise(c: AudioContext) {
  if (!noiseBuf) {
    noiseBuf = c.createBuffer(1, Math.floor(c.sampleRate * 0.1), c.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuf;
}

function playAt(
  c: AudioContext,
  freq: number,
  t: number,
  dur: number,
  type: OscillatorType,
  vol: number
) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + dur + 0.05);
  const node: ActiveNode = { osc, gain };
  active.add(node);
  osc.onended = () => {
    active.delete(node);
    try {
      gain.disconnect();
    } catch {
      /* already gone */
    }
  };
}

function kickAt(c: AudioContext, t: number) {
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(130, t);
  osc.frequency.exponentialRampToValueAtTime(45, t + 0.09);
  gain.gain.setValueAtTime(0.09, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.12);
  const node: ActiveNode = { osc, gain };
  active.add(node);
  osc.onended = () => {
    active.delete(node);
    try {
      gain.disconnect();
    } catch {
      /* already gone */
    }
  };
}

function hatAt(c: AudioContext, t: number) {
  const src = c.createBufferSource();
  src.buffer = getNoise(c);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.02, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.035);
  src.connect(gain);
  gain.connect(c.destination);
  src.start(t);
  src.stop(t + 0.05);
  // Hats loop forever — make sure the gain node is released.
  src.onended = () => {
    try {
      gain.disconnect();
    } catch {
      /* already gone */
    }
  };
}

function scheduleTick(c: AudioContext, t: number, tick: number) {
  for (const n of melodyByTick[tick]) {
    playAt(c, midiToFreq(n.m), t, n.d * TICK * 0.92, "square", 0.04);
  }
  for (const n of bassByTick[tick]) {
    playAt(c, midiToFreq(n.m), t, n.d * TICK * 0.92, "triangle", 0.055);
  }
  if (tick % 8 === 0) kickAt(c, t);
  if (tick % 4 === 2) hatAt(c, t);
}

function schedule(c: AudioContext) {
  const now = c.currentTime;
  // If the context was suspended/throttled (e.g. background tab) the clock
  // drifted away from our pointer — restart the loop instead of playing a
  // burst of stale notes or a long silent gap.
  if (nextTime < now - 0.15 || nextTime > now + 0.5) {
    nextTime = now + 0.06;
    tickPos = 0;
  }
  while (nextTime < now + 0.18) {
    scheduleTick(c, nextTime, tickPos % LOOP_LEN);
    nextTime += TICK;
    tickPos++;
  }
}

/** Let the UI (Header) reflect music state changes. */
function notify() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("pixel:music", {
      detail: { enabled: musicOn, playing },
    })
  );
}

function startLoop(c: AudioContext) {
  if (timer) clearInterval(timer);
  playing = true;
  nextTime = c.currentTime + 0.06;
  tickPos = 0;
  timer = setInterval(() => schedule(c), 40);
  notify();
}

function stopLoop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
  playing = false;
  notify();
  const c = audioContext();
  const now = c ? c.currentTime : 0;
  active.forEach((node) => {
    try {
      node.osc.stop(now);
    } catch {
      /* already stopped */
    }
    try {
      node.gain.disconnect();
    } catch {
      /* already gone */
    }
  });
  active.clear();
}

function loadPref() {
  try {
    if (typeof localStorage !== "undefined") {
      musicOn = localStorage.getItem(MUSIC_KEY) !== "0";
    }
  } catch {
    /* storage unavailable */
  }
}

export const music = {
  /** Fresh preference — reloads localStorage so callers never see stale state. */
  isEnabled() {
    loadPref();
    return musicOn;
  },
  isPlaying() {
    return playing;
  },
  /** Call from a user gesture — resumes the context and starts if enabled. */
  unlock() {
    const c = audioContext();
    if (!c) return;
    loadPref();
    if (musicOn && !playing) startLoop(c);
  },
  start() {
    const c = audioContext();
    if (!c) return;
    loadPref();
    if (!playing) startLoop(c);
  },
  stop() {
    stopLoop();
  },
  /** Flip the preference, persist it and apply. Returns the new state. */
  toggle(): boolean {
    loadPref();
    musicOn = !musicOn;
    try {
      localStorage.setItem(MUSIC_KEY, musicOn ? "1" : "0");
    } catch {
      /* storage unavailable */
    }
    if (musicOn) {
      const c = audioContext();
      if (c) startLoop(c);
    } else {
      stopLoop();
    }
    return musicOn;
  },
};
