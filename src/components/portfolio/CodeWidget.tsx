import { useState } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["about.ts", "stack.ts", "ship.ts"] as const;
type Tab = (typeof tabs)[number];

const code: Record<Tab, { line: string; accent?: "key" | "str" | "num" }[]> = {
  "about.ts": [
    { line: "const me = {" },
    { line: '  name: "Christian Andre C. Reston",', accent: "str" },
    { line: '  role: "Product Engineer",', accent: "str" },
    { line: '  based: "Cebu, Philippines",', accent: "str" },
    { line: "};" },
  ],
  "stack.ts": [
    { line: "export const stack = [" },
    { line: '  "TypeScript", "React", "Node.js",', accent: "str" },
    { line: '  "PostgreSQL", "Canvas", "WebAudio",', accent: "str" },
    { line: "] as const;" },
  ],
  "ship.ts": [
    { line: "async function ship(idea: Idea) {" },
    { line: "  const spec = await design(idea);" },
    { line: "  return deploy(build(spec));" },
    { line: "}" },
  ],
};

const output: Record<Tab, string> = {
  "about.ts": "> Product engineer, shipping since day one.",
  "stack.ts": "> 6 tools loaded. 0 yak shaves.",
  "ship.ts": "> deployed in 42ms ✓",
};

/** Tiny interactive editor widget: switch tabs, hit run, see output. */
export function CodeWidget({ className }: { className?: string }) {
  const [tab, setTab] = useState<Tab>("about.ts");
  const [ran, setRan] = useState(false);

  return (
    <div className={cn("flex flex-col overflow-hidden", className)}>
      <div className="flex items-center gap-1 border-b border-border px-3 py-2">
        <span className="mr-2 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted" />
        </span>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setRan(false);
            }}
            className={cn(
              "relative rounded-md px-2.5 py-1 font-mono text-[11px] transition-smooth",
              tab === t ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab === t && (
              <motion.span
                layoutId="code-tab"
                className="absolute inset-0 rounded-md bg-primary/10 ring-1 ring-primary/30"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{t}</span>
          </button>
        ))}
      </div>

      <pre className="flex-1 overflow-x-auto px-4 py-3 font-mono text-[12.5px] leading-relaxed">
        {code[tab].map((l, i) => (
          <motion.div
            key={`${tab}-${i}`}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={l.accent === "str" ? "text-primary" : "text-muted-foreground"}
          >
            <span className="mr-3 select-none text-muted-foreground/40">{i + 1}</span>
            {l.line}
          </motion.div>
        ))}
      </pre>

      <div className="flex items-center justify-between gap-3 border-t border-border px-3 py-2">
        <span className="truncate font-mono text-[11px] text-muted-foreground">
          {ran ? output[tab] : "> ready"}
        </span>
        <button
          onClick={() => setRan((r) => !r)}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-[11px] text-primary transition-smooth hover:border-primary/60"
        >
          {ran ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {ran ? "reset" : "run"}
        </button>
      </div>
    </div>
  );
}
