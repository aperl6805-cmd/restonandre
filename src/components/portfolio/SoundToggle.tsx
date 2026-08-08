import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

let enabled = false;
let ctx: AudioContext | null = null;

function blip(freq: number, gainPeak: number, dur: number) {
  if (!enabled) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") void ctx.resume();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(gainPeak, ctx.currentTime + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
    o.connect(g).connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + dur + 0.02);
  } catch {
    /* audio unavailable */
  }
}

export const uiSound = {
  hover: () => blip(880, 0.012, 0.06),
  click: () => blip(520, 0.05, 0.12),
  success: () => {
    blip(660, 0.045, 0.12);
    setTimeout(() => blip(990, 0.045, 0.18), 90);
  },
};

/** Ambient UI-sound toggle, pinned bottom-left. */
export function SoundToggle() {
  const [on, setOn] = useState(false);

  useEffect(() => {
    enabled = on;
  }, [on]);

  return (
    <button
      onClick={() => {
        const next = !on;
        setOn(next);
        enabled = next;
        if (next) uiSound.click();
      }}
      aria-label={on ? "Disable interface sounds" : "Enable interface sounds"}
      aria-pressed={on}
      className="fixed bottom-6 left-6 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/80 text-muted-foreground backdrop-blur-md transition-smooth hover:border-primary/60 hover:text-primary"
    >
      {on ? <Volume2 className="h-4 w-4 text-primary" /> : <VolumeX className="h-4 w-4" />}
    </button>
  );
}
