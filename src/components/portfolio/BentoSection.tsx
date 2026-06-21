import { Badge } from "@/components/ui/badge";

const stack = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
];

const currently = [
  { label: "Building", value: "Dreflow — canvas + video studio" },
  { label: "Learning", value: "WebGL & rendering performance" },
  { label: "Based in", value: "Cebu, Philippines" },
];

export function BentoSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">About</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
          A bit about me & my toolkit
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
        <article className="rounded-2xl border border-border bg-surface p-6 shadow-glow transition-smooth hover:border-primary/50 md:col-span-2 md:row-span-2">
          <h3 className="text-lg font-semibold text-foreground">About Me</h3>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            I'm a software developer based in the Philippines focused on building
            web applications that are both delightful and reliable. I move easily
            between product, design, and infrastructure, which means I can ship a
            feature from a Figma sketch to a deployed Postgres-backed API.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Outside of code, I tinker with mechanical keyboards, brew pour-over
            coffee, and contribute to open-source projects whenever I get the
            chance.
          </p>
        </article>

        <article id="skills" className="rounded-2xl border border-border bg-surface p-6 shadow-glow transition-smooth hover:border-primary/50">
          <h3 className="text-lg font-semibold text-foreground">Tech Stack</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {stack.map((s) => (
              <Badge
                key={s}
                variant="secondary"
                className="border border-border bg-background/40 text-foreground hover:border-primary/60 hover:text-primary"
              >
                {s}
              </Badge>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-border bg-surface p-6 shadow-glow transition-smooth hover:border-primary/50">
          <h3 className="text-lg font-semibold text-foreground">Quick Stats</h3>
          <ul className="mt-4 space-y-3">
            {stats.map((s) => (
              <li key={s.label} className="flex items-baseline justify-between gap-4">
                <span className="text-2xl font-black text-primary">{s.value}</span>
                <span className="text-sm text-muted-foreground">{s.label}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
