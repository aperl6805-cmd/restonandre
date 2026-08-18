import { motion } from "framer-motion";
import { Coffee, Keyboard, Sparkles } from "lucide-react";
import { useSkillHighlight } from "./SkillHighlight";
import { uiSound } from "./SoundToggle";
import { Reveal } from "./Reveal";

import tsAsset from "@/assets/skill-typescript.png.asset.json";
import reactAsset from "@/assets/skill-react.png.asset.json";
import pgAsset from "@/assets/skill-postgresql.png.asset.json";
import canvasAsset from "@/assets/skill-canvas.png.asset.json";
import audioAsset from "@/assets/skill-webaudio.png.asset.json";
import tailwindAsset from "@/assets/skill-tailwind.png.asset.json";

const skills = [
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Canvas",
  "Web Audio",
  "Tailwind",
];

const skillLogos: Record<string, string> = {
  TypeScript: tsAsset.url,
  React: reactAsset.url,
  PostgreSQL: pgAsset.url,
  Canvas: canvasAsset.url,
  "Web Audio": audioAsset.url,
  Tailwind: tailwindAsset.url,
};

// Radial constellation coordinates (percent of the box)
const nodes = skills.map((name, i) => {
  const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
  const r = i % 2 === 0 ? 36 : 26;
  return {
    name,
    x: 50 + r * Math.cos(angle),
    y: 50 + r * Math.sin(angle) * 0.92,
  };
});

export function BentoSection() {
  const { active, setActive } = useSkillHighlight();

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            A bit about me & my toolkit
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Hover a skill in the constellation — the projects below that use it stay lit.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {/* Narrative card */}
        <Reveal className="md:col-span-2">
          <article className="relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-glow transition-smooth hover:border-primary/50 md:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
            <h3 className="relative text-lg font-semibold text-foreground">About Me</h3>
            <p className="relative mt-3 leading-relaxed text-muted-foreground">
              I'm a software developer based in the Philippines focused on building
              web applications that are both delightful and reliable. I move easily
              between product, design, and infrastructure, which means I can ship a
              feature from a sketch to a deployed Postgres-backed API.
            </p>
            <p className="relative mt-4 leading-relaxed text-muted-foreground">
              Outside of code, I tinker with mechanical keyboards, brew pour-over
              coffee, and poke at rendering engines whenever I get the chance.
            </p>

            <div className="relative mt-7 flex flex-wrap gap-3">
              {[
                { Icon: Keyboard, label: "Mechanical keyboards" },
                { Icon: Coffee, label: "Pour-over coffee" },
                { Icon: Sparkles, label: "Rendering rabbit holes" },
              ].map(({ Icon, label }, i) => (
                <motion.span
                  key={label}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
                </motion.span>
              ))}
            </div>
          </article>
        </Reveal>

        {/* Skill constellation */}
        <Reveal delay={0.1}>
          <article
            id="skills"
            onMouseLeave={() => setActive(null)}
            className="relative h-full min-h-[340px] overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-glow transition-smooth hover:border-primary/50"
          >
            <h3 className="text-lg font-semibold text-foreground">Skill Constellation</h3>

            <div className="relative mt-4 h-[260px] w-full">
              <svg className="absolute inset-0 h-full w-full" aria-hidden>
                {nodes.map((n) => (
                  <line
                    key={n.name}
                    x1="50%"
                    y1="50%"
                    x2={`${n.x}%`}
                    y2={`${n.y}%`}
                    className={
                      active === n.name ? "stroke-primary" : "stroke-border"
                    }
                    strokeWidth={active === n.name ? 1.6 : 1}
                    opacity={active && active !== n.name ? 0.25 : 0.8}
                  />
                ))}
              </svg>

              {active && skillLogos[active] ? (
                <motion.img
                  key={active}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  src={skillLogos[active]}
                  alt={`${active} logo`}
                  className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-lg"
                />
              ) : (
                <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-glow" />
              )}

              {nodes.map((n) => (
                <button
                  key={n.name}
                  onMouseEnter={() => {
                    setActive(n.name);
                    uiSound.hover();
                  }}
                  onFocus={() => setActive(n.name)}
                  onBlur={() => setActive(null)}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition-smooth ${
                    active === n.name
                      ? "border-primary bg-primary/15 text-primary scale-110"
                      : active
                        ? "border-border bg-background/50 text-muted-foreground/50"
                        : "border-border bg-background/60 text-muted-foreground hover:border-primary/60 hover:text-primary"
                  }`}
                >
                  {n.name}
                </button>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
