import { GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./Reveal";

type Education = {
  school: string;
  degree: string;
  location: string;
  period: string;
  highlights: string[];
};

const education: Education[] = [
  {
    school: "St. Cecilia's College — Cebu, Inc.",
    degree: "Bachelor's — Computing / Software Development",
    location: "Cebu, Philippines",
    period: "Present",
    highlights: [
      "Focused coursework in software engineering, data structures, and web technologies.",
      "Shipping production-grade side projects (e.g. Dreflow) alongside the curriculum.",
    ],
  },
];

export function EducationSection() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Background</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Education</h2>
        </div>
      </Reveal>

      <div className="space-y-16">
        {education.map((ed, i) => (
          <Reveal key={ed.school} delay={i * 0.1}>
            <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
              <div className="md:sticky md:top-24 md:self-start">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{ed.school}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{ed.period}</p>
                <Badge variant="outline" className="mt-3 border-border text-muted-foreground">
                  {ed.location}
                </Badge>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 shadow-glow">
                <h4 className="text-lg font-semibold text-primary">{ed.degree}</h4>
                <ul className="mt-4 space-y-3">
                  {ed.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary shadow-glow" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
