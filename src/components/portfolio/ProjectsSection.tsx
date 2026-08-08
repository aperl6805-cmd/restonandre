import { useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, MoveHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { matchesSkill, useSkillHighlight } from "./SkillHighlight";
import { uiSound } from "./SoundToggle";
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
  architecture: string[];
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
    architecture: [
      "Custom scene-graph with an immutable state store for undo/redo.",
      "Render batching through requestAnimationFrame to avoid layout thrash.",
      "Web Workers handle frame compositing off the main thread.",
    ],
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
      "A high-performance, browser-based DAW with an arranger timeline, precision piano roll, and polyphonic synth engine. Engineered low-latency scheduling on the Web Audio API across drums, bass, piano, and synth channels, plus a custom grid-coordinate system for note painting, dragging, and resizing.",
    architecture: [
      "Look-ahead scheduler on the Web Audio clock for sample-accurate playback.",
      "Grid-coordinate system powering note paint, drag, and resize interactions.",
      "Snapping math refactored to remove sub-pixel gaps and overlapping inserts.",
    ],
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
      "A full-stack, node-based automation workspace designed for orchestrating modular API pipelines. Built a custom coordinate-tracking matrix that dynamically renders fluid SVG Bezier graph connections in real-time as users manipulate elements on an infinite panning grid.",
    architecture: [
      "Coordinate-tracking matrix driving live SVG Bezier edge rendering.",
      "Directional data-flow guards that block cyclical graph loops.",
      "Deterministic JSONB execution store in Supabase for state sync.",
      "Step-by-step simulator with a syntax-highlighted payload console.",
    ],
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
      "An interactive, browser-based static analysis platform that turns complex GitHub repositories into live visual execution flow diagrams and database blueprints, with zero backend parsing overhead.",
    architecture: [
      "Client-side AST parsing engine extracting dependencies in milliseconds.",
      "Infinite panning canvas with Crow's Foot notation ERD rendering.",
      "Multi-engine SQL export utilities.",
      "Realtime state hydration in Supabase with strict Row Level Security.",
    ],
    tech: ["React", "TypeScript", "Supabase", "AST Parsing", "Tailwind"],
    image: repodrePreviewAsset.url,
    logo: repodreLogo.url,
    github: "#",
    live: "https://repodre.vercel.app/",
  },
];

function ProjectCard({
  p,
  index,
  dimmed,
  onOpen,
}: {
  p: Project;
  index: number;
  dimmed: boolean;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.article
      ref={ref}
      layoutId={`project-${p.name}`}
      onMouseMove={onMove}
      onMouseEnter={uiSound.hover}
      onClick={() => {
        uiSound.click();
        onOpen();
      }}
      className={`group relative w-[86vw] shrink-0 cursor-pointer snap-center overflow-hidden rounded-3xl border border-border bg-surface p-5 transition-[opacity,filter,border-color] duration-300 hover:border-primary/60 hover:shadow-glow sm:w-[520px] ${
        dimmed ? "opacity-35 saturate-50" : "opacity-100"
      }`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklab, var(--primary) 16%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">
        <div className="relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border">
          <img
            src={p.image}
            alt={`${p.name} preview`}
            loading="lazy"
            draggable={false}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.06]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-4 font-mono text-xs uppercase tracking-widest text-foreground/80">
            {String(index + 1).padStart(2, "0")} / {p.tagline}
          </span>
          <span className="absolute right-3 top-3 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[11px] text-foreground opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
            Quick look
          </span>
        </div>

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

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {p.description}
        </p>

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
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const { active } = useSkillHighlight();
  const [open, setOpen] = useState<Project | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = scroller.current;
    if (!el || !drag.current.down) return;
    el.scrollLeft = drag.current.startScroll - (e.clientX - drag.current.startX);
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <section id="projects" className="border-y border-border bg-surface/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Selected Work
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                Recent Projects
              </h2>
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <MoveHorizontal className="h-4 w-4 text-primary" />
              Drag or scroll sideways · click a card for the deep dive
            </p>
          </div>
        </Reveal>
      </div>

      <div
        ref={scroller}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-[max(1.5rem,calc((100vw-72rem)/2))]"
      >
        {projects.map((p, i) => (
          <ProjectCard
            key={p.name}
            p={p}
            index={i}
            dimmed={!matchesSkill(p.tech, active)}
            onOpen={() => setOpen(p)}
          />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 p-4 backdrop-blur-md"
          >
            <motion.div
              layoutId={`project-${open.name}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-surface p-6 shadow-glow md:p-8"
            >
              <button
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground backdrop-blur-md transition-smooth hover:text-primary"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-hidden rounded-2xl border border-border">
                <img src={open.image} alt={`${open.name} preview`} className="w-full object-cover" />
              </div>

              <div className="mt-6 flex items-center gap-3">
                {open.logo && (
                  <img
                    src={open.logo}
                    alt=""
                    className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{open.name}</h3>
                  <p className="font-mono text-xs uppercase tracking-widest text-primary">
                    {open.tagline}
                  </p>
                </div>
              </div>

              <p className="mt-4 leading-relaxed text-muted-foreground">{open.description}</p>

              <h4 className="mt-6 text-sm font-semibold uppercase tracking-widest text-primary">
                Architecture
              </h4>
              <ul className="mt-3 space-y-2">
                {open.architecture.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {a}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {open.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="border-border bg-background/40 text-muted-foreground"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary-glow"
                >
                  <a href={open.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" /> Visit live site
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-border">
                  <a href={open.github} aria-label={`${open.name} source`}>
                    <Github className="mr-2 h-4 w-4" /> Source
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
