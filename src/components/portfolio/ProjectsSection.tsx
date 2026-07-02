import { useRef, type MouseEvent } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import dreflowPreviewAsset from "@/assets/dreflow-preview-new.png.asset.json";
import andioPreviewAsset from "@/assets/andio-preview-new.png.asset.json";
import andioLogo from "@/assets/andio-logo.png.asset.json";
import dreflowLogo from "@/assets/dreflow-logo.png.asset.json";
import ancrestPreviewAsset from "@/assets/ancrest-preview.png.asset.json";
import ancrestLogo from "@/assets/ancrest-logo.png.asset.json";
import repodrePreviewAsset from "@/assets/repodre-preview.png.asset.json";
import repodreLogo from "@/assets/repodre-logo.png.asset.json";

type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  image: string;
  logo?: string;
  github: string;
  live: string;
};

const projects: Project[] = [
  {
    name: "Dreflow",
    tagline: "Canvas + video studio",
    description:
      "Built a browser-based canvas and video editor on top of the HTML5 Canvas API with a custom scene-graph and immutable state store. Solved real-time preview bottlenecks by batching renders via requestAnimationFrame and offloading heavy frame work to Web Workers, keeping interactions at 60fps under multi-layer compositions.",
    tech: ["React", "TypeScript", "Canvas API", "Web Workers", "Tailwind"],
    image: dreflowPreviewAsset.url,
    logo: dreflowLogo.url,
    github: "#",
    live: "https://dreflow.netlify.app/",
  },
  {
    name: "Andio",
    tagline: "Multi-track web DAW",
    description:
      "A high-performance, browser-based DAW with an arranger timeline, precision piano roll, and polyphonic synth engine. Engineered low-latency scheduling on the Web Audio API across drums, bass, piano, and synth channels, plus a custom grid-coordinate system for note painting, dragging, and resizing. Refactored snapping math to eliminate sub-pixel gaps and overlapping inserts while holding 60fps during playback.",
    tech: ["React", "TypeScript", "Web Audio API", "Tone.js", "Tailwind"],
    image: andioPreviewAsset.url,
    logo: andioLogo.url,
    github: "#",
    live: "https://andio-sage.vercel.app/",
  },
  {
    name: "Ancrest",
    tagline: "Visual logic & API orchestration studio",
    description:
      "A full-stack, node-based automation workspace designed for orchestrating modular API pipelines. Built a custom coordinate-tracking matrix that dynamically renders fluid SVG Bezier graph connections in real-time as users manipulate elements on an infinite panning grid. Engineered strict directional data-flow validation guards to block cyclical loops, backed by a deterministic JSONB execution store in Supabase to sync states seamlessly. Features a step-by-step visual automation simulator with a live syntax-highlighted data payload console.",
    tech: ["React", "TypeScript", "Supabase", "SVG Bezier Curves", "Tailwind"],
    image: ancrestPreviewAsset.url,
    logo: ancrestLogo.url,
    github: "#",
    live: "https://ancrest.vercel.app/",
  },
  {
    name: "Repodre",
    tagline: "Interactive codebase graph",
    description:
      "An interactive, browser-based static analysis platform designed to turn complex GitHub repositories into live visual execution flow diagrams and database blueprints. Engineered a client-side Abstract Syntax Tree (AST) parsing engine to extract dependencies locally in milliseconds with zero backend server overhead. Built an infinite panning canvas featuring Crow's Foot notation ERD rendering and multi-engine SQL export utilities, backed by a real-time state hydration layer in Supabase to stream and store canvas layout metadata with strict Row Level Security (RLS).",
    tech: ["React", "TypeScript", "Supabase", "AST Parsing", "Tailwind"],
    image: repodrePreviewAsset.url,
    logo: repodreLogo.url,
    github: "#",
    live: "https://repodre.netlify.app/",
  },
];


function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-smooth hover:border-primary/60 hover:shadow-glow ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), hsl(var(--primary) / 0.15), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">Selected Work</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Recent Projects</h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              A small selection of products I've designed, built, or rescued in the
              past couple of years.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <SpotlightCard className="h-full">
                <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-border">
                  <img
                    src={p.image}
                    alt={`${p.name} preview`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 font-mono text-xs uppercase tracking-widest text-foreground/80">
                    {String(i + 1).padStart(2, "0")} / {p.tagline}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {p.logo && (
                      <img
                        src={p.logo}
                        alt={`${p.name} logo`}
                        className="h-8 w-8 rounded-md object-cover ring-1 ring-border"
                      />
                    )}
                    <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                  </div>
                  <div className="flex gap-1">
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                      <a href={p.github} aria-label={`${p.name} on GitHub`}>
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.name} live demo`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="border-border bg-background/40 text-muted-foreground"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
