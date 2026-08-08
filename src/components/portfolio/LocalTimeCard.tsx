import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

/** Live local time in Cebu (UTC+8) with a moving analog dial. */
export function LocalTimeCard({ className }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const parts = now
    ? new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).formatToParts(now)
    : [];
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const h = get("hour") % 12;
  const m = get("minute");
  const s = get("second");
  const label = now
    ? `${String(get("hour")).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : "--:--:--";

  return (
    <div className={className}>
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 text-primary" />
        Local time
      </div>

      <div className="mt-4 flex items-center gap-4">
        <svg viewBox="0 0 100 100" className="h-14 w-14 shrink-0">
          <circle cx="50" cy="50" r="46" className="fill-none stroke-border" strokeWidth="4" />
          <circle cx="50" cy="50" r="46" className="fill-none stroke-primary/30" strokeWidth="1.5" />
          <line
            x1="50" y1="50"
            x2={50 + 22 * Math.sin(((h * 60 + m) / 720) * 2 * Math.PI)}
            y2={50 - 22 * Math.cos(((h * 60 + m) / 720) * 2 * Math.PI)}
            className="stroke-foreground" strokeWidth="5" strokeLinecap="round"
          />
          <line
            x1="50" y1="50"
            x2={50 + 32 * Math.sin((m / 60) * 2 * Math.PI)}
            y2={50 - 32 * Math.cos((m / 60) * 2 * Math.PI)}
            className="stroke-foreground/70" strokeWidth="3.5" strokeLinecap="round"
          />
          <line
            x1="50" y1="50"
            x2={50 + 36 * Math.sin((s / 60) * 2 * Math.PI)}
            y2={50 - 36 * Math.cos((s / 60) * 2 * Math.PI)}
            className="stroke-primary" strokeWidth="1.8" strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="3" className="fill-primary" />
        </svg>

        <div>
          <p className="font-mono text-2xl font-bold tabular-nums text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">Cebu, Philippines · GMT+8</p>
        </div>
      </div>
    </div>
  );
}
