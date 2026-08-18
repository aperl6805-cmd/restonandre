import { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "accent-hsl";
const DEFAULT_ACCENT = { h: 160, s: 84, l: 39 };

type HSL = { h: number; s: number; l: number };

function hslToHex({ h, s, l }: HSL) {
  const a = (s / 100) * Math.min(l / 100, 1 - l / 100);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l / 100 - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * c)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHsl(hex: string): HSL | null {
  const m = /^#?([\da-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = d / (1 - Math.abs(2 * l - 1));
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function applyAccent({ h, s, l }: HSL) {
  const root = document.documentElement;
  root.style.setProperty("--primary", `hsl(${h} ${s}% ${l}%)`);
  root.style.setProperty("--primary-glow", `hsl(${h} ${s}% ${Math.min(l + 16, 70)}%)`);
  root.style.setProperty(
    "--primary-foreground",
    l > 62 ? "hsl(222 47% 7%)" : "hsl(0 0% 100%)",
  );
  root.style.setProperty(
    "--gradient-hero",
    `linear-gradient(135deg, hsl(${h} ${s}% ${l}% / 0.18), transparent 60%)`,
  );
}

/** Circular hue/saturation wheel that retints the whole site accent + cursor. */
export function AccentPicker() {
  const [open, setOpen] = useState(false);
  const [hsl, setHsl] = useState<HSL>(DEFAULT_ACCENT);
  const [hexInput, setHexInput] = useState(hslToHex(DEFAULT_ACCENT));
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragging = useRef(false);

  // restore
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as HSL;
        setHsl(parsed);
        setHexInput(hslToHex(parsed));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    applyAccent(hsl);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(hsl));
  }, [hsl]);

  // draw the wheel
  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const size = canvas.width;
    const r = size / 2;
    const img = ctx.createImageData(size, size);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const dx = x - r;
        const dy = y - r;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const i = (y * size + x) * 4;
        if (dist > r) continue;
        let hue = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        if (hue < 0) hue += 360;
        const sat = Math.min(dist / r, 1) * 100;
        const hex = hslToHex({ h: hue, s: sat, l: hsl.l });
        const int = parseInt(hex.slice(1), 16);
        img.data[i] = (int >> 16) & 255;
        img.data[i + 1] = (int >> 8) & 255;
        img.data[i + 2] = int & 255;
        img.data[i + 3] = dist > r - 1 ? 180 : 255;
      }
    }
    ctx.clearRect(0, 0, size, size);
    ctx.putImageData(img, 0, 0);
  }, [open, hsl.l]);

  const pickFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const r = rect.width / 2;
    const dx = e.clientX - rect.left - r;
    const dy = e.clientY - rect.top - r;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let hue = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    if (hue < 0) hue += 360;
    const sat = Math.round(Math.min(dist / r, 1) * 100);
    const next = { h: Math.round(hue), s: sat, l: hsl.l };
    setHsl(next);
    setHexInput(hslToHex(next));
  };

  const currentHex = hslToHex(hsl);

  return (
    <div className="fixed bottom-20 left-6 z-[99]">
      {open && (
        <div className="mb-3 w-64 rounded-2xl border border-border bg-surface/95 p-4 shadow-glow backdrop-blur-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Accent color
          </p>
          <canvas
            ref={canvasRef}
            width={220}
            height={220}
            className="mx-auto block h-[180px] w-[180px] cursor-crosshair rounded-full"
            onPointerDown={(e) => {
              dragging.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              pickFromEvent(e);
            }}
            onPointerMove={(e) => dragging.current && pickFromEvent(e)}
            onPointerUp={() => (dragging.current = false)}
          />

          <label className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            Lightness
            <input
              type="range"
              min={25}
              max={70}
              value={hsl.l}
              onChange={(e) => {
                const next = { ...hsl, l: Number(e.target.value) };
                setHsl(next);
                setHexInput(hslToHex(next));
              }}
              className="h-1 flex-1 accent-[var(--primary)]"
            />
          </label>

          <div className="mt-3 flex items-center gap-2">
            <span
              className="h-7 w-7 shrink-0 rounded-lg border border-border"
              style={{ background: currentHex }}
            />
            <input
              value={hexInput}
              onChange={(e) => {
                setHexInput(e.target.value);
                const parsed = hexToHsl(e.target.value);
                if (parsed) setHsl(parsed);
              }}
              spellCheck={false}
              aria-label="Hex accent color"
              className="w-full rounded-lg border border-border bg-background px-2 py-1.5 font-mono text-xs uppercase text-foreground outline-none focus:border-primary"
            />
          </div>

          <button
            onClick={() => {
              setHsl(DEFAULT_ACCENT);
              setHexInput(hslToHex(DEFAULT_ACCENT));
            }}
            className="mt-3 w-full rounded-lg border border-border py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            Reset
          </button>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change accent color"
        aria-expanded={open}
        className={cn(
          "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/80 backdrop-blur-xl shadow-glow transition-colors hover:border-primary/60",
        )}
        style={{ color: currentHex }}
      >
        <Palette className="h-5 w-5" />
      </button>
    </div>
  );
}
