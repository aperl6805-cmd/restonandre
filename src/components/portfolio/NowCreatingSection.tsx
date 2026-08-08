import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Building2,
  CalendarCheck,
  CreditCard,
  Library,
  Megaphone,
  PenTool,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { uiSound } from "./SoundToggle";
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

type Module = {
  key: string;
  label: string;
  icon: typeof CreditCard;
  headline: string;
  body: string;
  rows: { left: string; right: string }[];
};

const modules: Module[] = [
  {
    key: "tuition",
    label: "Tuition tracking",
    icon: CreditCard,
    headline: "Billing ledger",
    body: "Per-student balances, installment plans, and receipts scoped to each school tenant.",
    rows: [
      { left: "Grade 10 · Reyes, M.", right: "₱ 4,200 due" },
      { left: "Grade 9 · Cruz, J.", right: "Paid ✓" },
      { left: "Grade 11 · Lim, A.", right: "Plan 2/4" },
    ],
  },
  {
    key: "attendance",
    label: "Attendance",
    icon: CalendarCheck,
    headline: "Daily roll call",
    body: "Teachers mark sections in seconds; registrars get roll-ups per grade level in real time.",
    rows: [
      { left: "Section Rizal · 8:00 AM", right: "38 / 40" },
      { left: "Section Bonifacio", right: "41 / 41" },
      { left: "Late arrivals", right: "3 flagged" },
    ],
  },
  {
    key: "scheduling",
    label: "Class scheduling",
    icon: CalendarCheck,
    headline: "Timetable builder",
    body: "Drag subjects onto the week grid with conflict detection for rooms and teachers.",
    rows: [
      { left: "Mon 09:00 · Math", right: "Rm 204" },
      { left: "Mon 10:00 · Science", right: "Lab B" },
      { left: "Conflicts", right: "0" },
    ],
  },
  {
    key: "library",
    label: "Library catalog",
    icon: Library,
    headline: "Circulation desk",
    body: "Catalog, borrow, and return flows owned by the librarian role.",
    rows: [
      { left: "Titles catalogued", right: "1,284" },
      { left: "On loan", right: "96" },
      { left: "Overdue", right: "7" },
    ],
  },
  {
    key: "announcements",
    label: "Announcements",
    icon: Megaphone,
    headline: "Broadcast center",
    body: "Principal-level posts fan out to selected roles, sections, or the whole school.",
    rows: [
      { left: "Foundation Day", right: "All roles" },
      { left: "Exam schedule", right: "Students" },
      { left: "Faculty meeting", right: "Teachers" },
    ],
  },
];

export function NowCreatingSection() {
  const [activeKey, setActiveKey] = useState(modules[0].key);
  const active = modules.find((m) => m.key === activeKey)!;
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yFront = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yBack = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section ref={sectionRef} id="now-creating" className="relative mx-auto max-w-6xl px-6 py-24">
      <motion.div
        style={{ y: yBack }}
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-10 -z-10 h-72 rounded-[3rem] bg-primary/5 blur-3xl"
      />

      <Reveal>
        <div className="mb-10 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
          </span>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Now Creating</p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <motion.div
          style={{ y: yFront }}
          className="grid gap-6 overflow-hidden rounded-3xl border border-border bg-surface md:grid-cols-[1.05fr_1fr]"
        >
          {/* Left: identity + module switcher */}
          <div className="flex flex-col justify-between gap-8 p-8 md:p-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                In active development
              </div>
              <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">SCHOOL OS</h2>
              <p className="mt-2 text-sm font-medium text-primary">A School Operating System</p>
              <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
                A multi-tenant platform where principals spin up their own school,
                invite teachers, students, registrars, and librarians, and lay out
                the school's structure through an isomorphic, Canva-style blueprint
                editor.
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Explore the modules
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {modules.map((m) => (
                  <button
                    key={m.key}
                    onMouseEnter={uiSound.hover}
                    onClick={() => {
                      setActiveKey(m.key);
                      uiSound.click();
                    }}
                    className={`relative rounded-full border px-3 py-1.5 text-xs transition-smooth ${
                      activeKey === m.key
                        ? "border-primary/60 text-primary"
                        : "border-border bg-background/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {activeKey === m.key && (
                      <motion.span
                        layoutId="module-pill"
                        className="absolute inset-0 rounded-full bg-primary/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: interactive blueprint preview */}
          <div className="flex flex-col gap-6 border-t border-border bg-background/30 p-8 md:border-l md:border-t-0 md:p-10">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-surface">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <img src={schoolOsLogo.url} alt="SCHOOL OS logo" className="h-5 w-5 object-contain" />
                <span className="font-mono text-[11px] text-muted-foreground">
                  schoolos · {active.key}
                </span>
              </div>

              <motion.div
                key={active.key}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="p-5"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/60 text-primary">
                    <active.icon className="h-4 w-4" />
                  </span>
                  <p className="text-sm font-semibold text-foreground">{active.headline}</p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{active.body}</p>

                <ul className="mt-4 space-y-2">
                  {active.rows.map((r, i) => (
                    <motion.li
                      key={r.left}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 * i }}
                      className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-3 py-2 text-xs"
                    >
                      <span className="text-muted-foreground">{r.left}</span>
                      <span className="font-mono text-foreground">{r.right}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
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
        </motion.div>
      </Reveal>
    </section>
  );
}
