import { Sparkles, Building2, Users, PenTool } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./Reveal";
import schoolOsLogo from "@/assets/school-os-logo.png.asset.json";

const pillars = [
  {
    icon: Building2,
    title: "School Structure",
    body: "Multi-tenant model where each admin (principal) provisions and runs their own school instance.",
  },
  {
    icon: Users,
    title: "Roles & Access",
    body: "Teachers, students, registrar, and librarian — each with scoped permissions and workflows.",
  },
  {
    icon: PenTool,
    title: "Isomorphic Canvas",
    body: "Design the school's blueprint visually with a Canva-style editor that renders the same on server and client.",
  },
];

const modules = [
  "Tuition tracking",
  "Attendance",
  "Class scheduling",
  "Library catalog",
  "Grades & reports",
  "Announcements",
];

export function NowCreatingSection() {
  return (
    <section id="now-creating" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-10 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Now Creating
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="grid gap-6 overflow-hidden rounded-2xl border border-border bg-surface md:grid-cols-[1.1fr_1fr]">
          {/* Left: identity */}
          <div className="relative flex flex-col justify-between gap-8 p-8 md:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                In active development
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
                SCHOOL OS
              </h2>
              <p className="mt-2 text-sm font-medium text-primary">
                A School Operating System
              </p>
              <p className="mt-4 max-w-prose text-muted-foreground leading-relaxed">
                A multi-tenant platform where principals spin up their own school,
                invite teachers, students, registrars, and librarians, and lay
                out the school's structure through an isomorphic, Canva-style
                blueprint editor. Tuition, attendance, and academic operations
                live in one place.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Planned modules
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {modules.map((m) => (
                  <Badge
                    key={m}
                    variant="outline"
                    className="border-border bg-background/40 text-muted-foreground"
                  >
                    {m}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Right: logo + pillars */}
          <div className="relative flex flex-col gap-6 border-t border-border bg-background/30 p-8 md:border-l md:border-t-0 md:p-10">
            <div className="relative mx-auto flex aspect-[16/10] w-full max-w-md items-center justify-center overflow-hidden rounded-xl border border-border bg-[#f3f4ec]">
              <img
                src={schoolOsLogo.url}
                alt="SCHOOL OS logo"
                loading="lazy"
                className="h-full w-full object-contain p-4"
              />
            </div>

            <ul className="grid gap-4">
              {pillars.map(({ icon: Icon, title, body }) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border bg-background/60 text-primary">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
