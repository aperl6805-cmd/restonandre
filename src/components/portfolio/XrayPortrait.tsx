import { useRef, useState } from "react";

import portraitAsset from "@/assets/portrait.png.asset.json";
import xrayAsset from "@/assets/portrait-xray.jpg.asset.json";

const RADIUS = 90;

export function XrayPortrait() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 40 });
  const [hovering, setHovering] = useState(false);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const mask = `radial-gradient(circle ${RADIUS}px at ${pos.x}% ${pos.y}%, #000 0%, #000 55%, transparent 100%)`;

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="group relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-primary/40 bg-[hsl(160_40%_5%)] shadow-glow transition-smooth hover:border-primary"
      style={{ boxShadow: hovering ? "0 0 0 1px var(--primary), 0 0 32px -8px var(--primary-glow)" : undefined }}
    >
      <img
        src={portraitAsset.url}
        alt="Christian Andre C. Reston portrait"
        className="absolute inset-0 h-full w-full object-cover object-top"
        loading="lazy"
      />

      <img
        src={xrayAsset.url}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-200"
        style={{
          opacity: hovering ? 1 : 0,
          WebkitMaskImage: mask,
          maskImage: mask,
        }}
      />

      {/* emerald spotlight ring */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(circle ${RADIUS}px at ${pos.x}% ${pos.y}%, hsl(from var(--primary) h s l / 0.12) 0%, transparent 70%)`,
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3">
        <p className="text-[11px] font-medium uppercase tracking-widest text-primary">
          {hovering ? "x-ray mode" : "hover to see through"}
        </p>
      </div>
    </div>
  );
}
