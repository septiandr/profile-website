"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

class ProceduralSoundSystem {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  public isPlaying = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

      // Master ambient gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.04, now + 3);

      // Low pass filter to create a warm, deep cosmic space pad
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(220, now);

      // Osc 1: Deep fundamental drone (A1 = 55Hz)
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = "sine";
      this.osc1.frequency.setValueAtTime(55, now);

      // Osc 2: Harmonic fifth with slow detune drift (E2 = 82.5Hz)
      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = "triangle";
      this.osc2.frequency.setValueAtTime(82.5, now);

      // Connect graph
      this.osc1.connect(filter);
      this.osc2.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.osc1.start(now);
      this.osc2.start(now);
      this.isPlaying = true;
    } catch (e) {
      console.warn("Audio Context init blocked until user interaction", e);
    }
  }

  public stopAmbient() {
    if (!this.ctx || !this.isPlaying || !this.ambientGain) return;
    const now = this.ctx.currentTime;
    this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, now);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, now + 1);

    setTimeout(() => {
      try {
        this.osc1?.stop();
        this.osc2?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
      } catch {}
      this.isPlaying = false;
    }, 1100);
  }

  public playBlip(freq = 880, duration = 0.08) {
    if (!this.isPlaying) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
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
    // Add hover sound to links and buttons
    const handleInteract = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) {
        getSoundSystem()?.playBlip(750, 0.05);
      }
    };

    window.addEventListener("mouseover", handleInteract);
    return () => window.removeEventListener("mouseover", handleInteract);
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
