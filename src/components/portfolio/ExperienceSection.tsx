import { Badge } from "@/components/ui/badge";

type Job = {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: string[];
};

const jobs: Job[] = [
  {
    company: "TechNova Solutions",
    role: "Senior Software Developer",
    location: "Remote",
    period: "2023 — Present",
    achievements: [
      "Led the rebuild of the core customer dashboard, cutting time-to-interactive by 48%.",
      "Designed and rolled out a typed RPC layer that replaced ad-hoc REST endpoints across 4 product squads.",
      "Mentored 3 mid-level engineers through structured code reviews and pairing sessions.",
    ],
  },
  {
    company: "DigitalCraft Agency",
    role: "Frontend Developer",
    location: "Cebu, PH",
    period: "2021 — 2023",
    achievements: [
      "Shipped 9 client websites with a shared design system, reducing project ramp-up time by half.",
      "Introduced automated visual regression testing, catching layout bugs before production releases.",
      "Partnered with designers to translate Figma libraries into reusable React component packages.",
    ],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">Career</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Experience</h2>
      </div>

      <div className="space-y-16">
        {jobs.map((job) => (
          <div key={job.company} className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <div className="md:sticky md:top-24 md:self-start">
              <h3 className="text-xl font-bold text-foreground">{job.company}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{job.period}</p>
              <Badge variant="outline" className="mt-3 border-border text-muted-foreground">
                {job.location}
              </Badge>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-glow">
              <h4 className="text-lg font-semibold text-primary">{job.role}</h4>
              <ul className="mt-4 space-y-3">
                {job.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-glow" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
