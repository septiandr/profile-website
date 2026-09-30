"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

class ProceduralSoundSystem {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private voices: OscillatorNode[] = [];
  private lfo: OscillatorNode | null = null;
  public isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public startAmbient() {
    this.initContext();
    if (!this.ctx || this.isPlaying) return;

    try {
      const now = this.ctx.currentTime;

      // Master ambient gain with silky smooth fade-in
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.0001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.045, now + 3.5);

      // Resonant Lowpass Filter with gentle resonance (Q = 1.8)
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, now);
      filter.Q.setValueAtTime(1.8, now);

      // Slow breathing LFO (0.12 Hz ~ 8.3s cycle) modulating filter frequency
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.12, now);
      lfoGain.gain.setValueAtTime(380, now); // Sweeps between 270Hz and 1030Hz
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start(now);
      this.lfo = lfo;

      // Celestial 4-Voice Chord (F# Minor / Astral Harmony)
      // Voice 1: Deep warm sub (F#2 = 92.50 Hz)
      // Voice 2: Fundamental warm pad (C#3 = 138.59 Hz)
      // Voice 3: Luminous fifth (A3 = 220.00 Hz)
      // Voice 4: Shimmering ninth with subtle chorusing (G#4 = 415.30 Hz)
      const chordFrequencies = [92.5, 138.59, 220.0, 415.3];
      const waveforms: OscillatorType[] = ["sine", "triangle", "sine", "triangle"];
      const detunes = [-4, 3, -2, 5]; // Subtle organic chorus detune

      this.voices = [];

      chordFrequencies.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        osc.type = waveforms[idx];
        osc.frequency.setValueAtTime(freq, now);
        osc.detune.setValueAtTime(detunes[idx], now);

        const voiceGain = this.ctx.createGain();
        voiceGain.gain.setValueAtTime(0.28, now);

        osc.connect(voiceGain);
        voiceGain.connect(filter);
        osc.start(now);
        this.voices.push(osc);
      });

      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.isPlaying = true;
    } catch (e) {
      console.warn("Audio Context init blocked until user interaction", e);
    }
  }

  public stopAmbient() {
    if (!this.ctx || !this.isPlaying || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      try {
        this.voices.forEach((v) => {
          v.stop();
          v.disconnect();
        });
        this.voices = [];
        this.lfo?.stop();
        this.lfo?.disconnect();
        this.lfo = null;
      } catch {}
      this.isPlaying = false;
    }, 1300);
  }

  // Soft Tactile Glass Haptic Click (subtle luxury interface sound)
  public playHaptic(freq = 587.33, duration = 0.035) {
    if (!this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.85, now + duration);

      gain.gain.setValueAtTime(0.018, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch {}
  }

  // Resonant Harmonic Bell Chime on Click
  public playChime(freq = 880, duration = 0.28) {
    if (!this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);

      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 1.5, now); // Harmonic fifth

      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);
    } catch {}
  }
}

let soundInstance: ProceduralSoundSystem | null = null;
export function getSoundSystem() {
  if (typeof window === "undefined") return null;
  if (!soundInstance) {
    soundInstance = new ProceduralSoundSystem();
  }
  return soundInstance;
}

export default function AudioController() {
  const [isActive, setIsActive] = useState(false);

  const toggleAudio = () => {
    const sys = getSoundSystem();
    if (!sys) return;

    if (isActive) {
      sys.stopAmbient();
      setIsActive(false);
    } else {
      sys.startAmbient();
      setIsActive(true);
    }
  };

  useEffect(() => {
    // Add soft tactile hover sound and resonant click sound to interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .cursor-pointer, .exp-card, .tech-card")) {
        getSoundSystem()?.playHaptic(587.33, 0.03);
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .cursor-pointer, .exp-card, .tech-card")) {
        getSoundSystem()?.playChime(784, 0.22);
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label={isActive ? "Mute audio" : "Play ambient audio"}
      className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-space-900/80 px-3.5 py-1.5 text-xs font-mono text-slate-300 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:text-cyan-400"
    >
      {isActive ? (
        <Volume2 className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
      ) : (
        <VolumeX className="h-3.5 w-3.5 text-slate-400 group-hover:text-cyan-400" />
      )}
      <span className="hidden sm:inline">
        {isActive ? "SOUND: ON" : "SOUND: OFF"}
      </span>
      {/* Equalizer animation bars */}
      <div className="flex h-3 items-end gap-0.5">
        <span
          className={`w-0.5 rounded-full bg-cyan-400 transition-all ${
            isActive ? "h-3 animate-[pulse_0.8s_ease-in-out_infinite]" : "h-1 opacity-40"
          }`}
        />
        <span
          className={`w-0.5 rounded-full bg-cyan-400 transition-all ${
            isActive ? "h-2 animate-[pulse_0.5s_ease-in-out_infinite_0.2s]" : "h-1 opacity-40"
          }`}
        />
        <span
          className={`w-0.5 rounded-full bg-cyan-400 transition-all ${
            isActive ? "h-3.5 animate-[pulse_0.9s_ease-in-out_infinite_0.4s]" : "h-1 opacity-40"
          }`}
        />
      </div>
    </button>
  );
}
