import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Project = {
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  gradient: string;
  github: string;
  live: string;
};

const projects: Project[] = [
  {
    name: "DevTrack",
    tagline: "Project management dashboard",
    description:
      "A streamlined dashboard for engineering teams to plan sprints, track issues, and visualize delivery in real time.",
    tech: ["React", "Node.js", "PostgreSQL"],
    gradient: "bg-gradient-card-1",
    github: "#",
    live: "#",
  },
  {
    name: "ShopWave",
    tagline: "E-commerce storefront",
    description:
      "A fast, SEO-friendly storefront with server-rendered product pages, Stripe checkout, and a custom CMS.",
    tech: ["Next.js", "Stripe", "Tailwind"],
    gradient: "bg-gradient-card-2",
    github: "#",
    live: "#",
  },
  {
    name: "ChatFlow",
    tagline: "Real-time chat application",
    description:
      "Group and direct messaging with typing indicators, read receipts, and end-to-end persistence on a Socket.io core.",
    tech: ["React", "Socket.io", "Express"],
    gradient: "bg-gradient-card-3",
    github: "#",
    live: "#",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
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

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <article
              key={p.name}
              className={`group rounded-2xl border border-border bg-surface p-5 transition-smooth hover:border-primary/60 hover:shadow-glow ${
                i === 0 ? "md:row-span-2" : ""
              }`}
            >
              <div className={`${p.gradient} relative mb-5 flex aspect-[16/10] items-end overflow-hidden rounded-xl p-5`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
                <span className="relative font-mono text-xs uppercase tracking-widest text-background/80">
                  {String(i + 1).padStart(2, "0")} / {p.tagline}
                </span>
              </div>

              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
                <div className="flex gap-1">
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                    <a href={p.github} aria-label={`${p.name} on GitHub`}>
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                    <a href={p.live} aria-label={`${p.name} live demo`}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
