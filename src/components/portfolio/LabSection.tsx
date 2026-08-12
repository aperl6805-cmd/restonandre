import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Play, Loader2, ShieldCheck, Chrome, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./Reveal";
import { uiSound } from "./SoundToggle";
import { cn } from "@/lib/utils";
import relexLogo from "@/assets/relex-logo.png.asset.json";
import tailscanLogo from "@/assets/tailscan-logo.png.asset.json";
import deepfocusLogo from "@/assets/deepfocus-logo.png.asset.json";

/* ------------------------------- Relex card ------------------------------ */

const samples: Record<string, string> = {
  "hello.rx": 'let greet = "hello" + " world";\nprint greet;',
  "math.rx": "let x = 6 * 7;\nlet y = x - 2;\nprint y;",
  "chain.rx": "let a = 1 + 2 * 3;\nprint a + 10;",
};

type Token = { type: string; value: string };

function tokenize(src: string): Token[] {
  const spec: [string, RegExp][] = [
    ["keyword", /^(let|print)\b/],
    ["string", /^"[^"]*"/],
    ["number", /^\d+(\.\d+)?/],
    ["ident", /^[A-Za-z_]\w*/],
    ["op", /^[+\-*/=]/],
    ["punct", /^;/],
  ];
  const out: Token[] = [];
  let s = src;
  let guard = 0;
  while (s.trim().length && guard++ < 500) {
    s = s.replace(/^\s+/, "");
    if (!s.length) break;
    const hit = spec.find(([, re]) => re.test(s));
    if (!hit) {
      out.push({ type: "error", value: s[0] });
      s = s.slice(1);
      continue;
    }
    const m = s.match(hit[1])!;
    out.push({ type: hit[0], value: m[0] });
    s = s.slice(m[0].length);
  }
  return out;
}

function buildAst(tokens: Token[]): string[] {
  const lines: string[] = ["Program"];
  let i = 0;
  const peek = () => tokens[i];
  const expr = (depth: number) => {
    const parts: Token[] = [];
    while (peek() && peek().type !== "punct") parts.push(tokens[i++]);
    const pad = "  ".repeat(depth);
    if (parts.length === 1) {
      lines.push(`${pad}└─ ${parts[0].type === "ident" ? "Identifier" : "Literal"}(${parts[0].value})`);
      return;
    }
    const opIdx = parts.findIndex((p) => p.type === "op");
    if (opIdx > 0) {
      lines.push(`${pad}└─ BinaryExpr(${parts[opIdx].value})`);
      parts
        .filter((p) => p.type !== "op")
        .forEach((p) =>
          lines.push(
            `${pad}    ├─ ${p.type === "ident" ? "Identifier" : "Literal"}(${p.value})`,
          ),
        );
    } else if (parts.length) {
      lines.push(`${pad}└─ Expr(${parts.map((p) => p.value).join(" ")})`);
    }
  };
  while (i < tokens.length) {
    const t = tokens[i];
    if (t.type === "keyword" && t.value === "let") {
      i++;
      const name = tokens[i]?.value ?? "?";
      i++;
      if (tokens[i]?.value === "=") i++;
      lines.push(`├─ VarDecl "${name}"`);
      expr(1);
    } else if (t.type === "keyword" && t.value === "print") {
      i++;
      lines.push("├─ PrintStmt");
      expr(1);
    } else {
      i++;
      continue;
    }
    if (peek()?.type === "punct") i++;
  }
  return lines.length > 1 ? lines : ["Program", "└─ (empty)"];
}

function RelexCard() {
  const [file, setFile] = useState("hello.rx");
  const [src, setSrc] = useState(samples["hello.rx"]);
  const [view, setView] = useState<"tokens" | "ast">("ast");
  const tokens = useMemo(() => tokenize(src), [src]);
  const ast = useMemo(() => buildAst(tokens), [tokens]);

  return (
    <article className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6 md:col-span-2">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <img
              src={relexLogo.url}
              alt="Relex logo"
              className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
            />
            <div>
              <h3 className="text-xl font-bold text-foreground">Relex</h3>
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Custom compiler language
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            A hand-rolled compiler/interpreter for a small expressive language — lexer, recursive
            descent parser, AST construction, and evaluation. Try it: edit the source on the right
            and watch tokens and the syntax tree rebuild live.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Python", "AST Parsing", "Lexer", "Interpreter"].map((t) => (
              <Badge key={t} variant="outline" className="border-border bg-background/40 text-muted-foreground">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {Object.keys(samples).map((s) => (
              <button
                key={s}
                onClick={() => {
                  uiSound.click();
                  setFile(s);
                  setSrc(samples[s]);
                }}
                className={cn(
                  "rounded-md border px-2.5 py-1 font-mono text-[11px] transition-smooth",
                  file === s
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <a
            href="https://github.com/kusarithegorgon-eng/Relex.git"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-smooth hover:border-primary/60 hover:text-primary"
          >
            <Github className="h-3.5 w-3.5" /> View source on GitHub
          </a>
        </div>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background/50">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2">
            <span className="font-mono text-[11px] text-muted-foreground">{file}</span>
            <span className="ml-auto flex gap-1">
              {(["tokens", "ast"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => {
                    uiSound.click();
                    setView(v);
                  }}
                  className={cn(
                    "rounded-md px-2 py-1 font-mono text-[11px] transition-smooth",
                    view === v
                      ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {v === "tokens" ? "tokens" : "AST"}
                </button>
              ))}
            </span>
          </div>
          <textarea
            value={src}
            spellCheck={false}
            onChange={(e) => setSrc(e.target.value)}
            className="h-28 resize-none bg-transparent px-3 py-2 font-mono text-[12.5px] leading-relaxed text-foreground outline-none"
          />
          <div className="border-t border-border px-3 py-2 font-mono text-[11.5px] leading-relaxed">
            {view === "tokens" ? (
              <div className="flex max-h-32 flex-wrap gap-1 overflow-y-auto">
                {tokens.map((t, i) => (
                  <motion.span
                    key={`${i}-${t.value}`}
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "rounded border px-1.5 py-0.5",
                      t.type === "error"
                        ? "border-destructive/50 text-destructive"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    <span className="text-primary">{t.type}</span>:{t.value}
                  </motion.span>
                ))}
              </div>
            ) : (
              <pre className="max-h-32 overflow-y-auto whitespace-pre text-muted-foreground">
                {ast.join("\n")}
              </pre>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Tailscan card ---------------------------- */

const scanReport = [
  "Detected 14 CSS rules",
  "0 JS framework dependencies",
  "Clean semantic HTML — 9 landmarks",
  "3 unused utility classes",
];

function TailscanCard() {
  const [state, setState] = useState<"idle" | "scanning" | "done">("idle");

  const run = () => {
    uiSound.click();
    setState("scanning");
    setTimeout(() => setState("done"), 1100);
  };

  return (
    <article className="relative overflow-hidden rounded-3xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <img
          src={tailscanLogo.url}
          alt="Tailscan logo"
          className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
        />
        <div>
          <h3 className="text-lg font-bold text-foreground">Tailscan</h3>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            HTML / CSS detector extension
          </p>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-background/60">
        <div className="flex items-center gap-2 border-b border-border px-3 py-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted" />
          </span>
          <span className="flex flex-1 items-center gap-1.5 truncate rounded-md border border-border bg-surface px-2 py-1 font-mono text-[11px] text-muted-foreground">
            <Globe className="h-3 w-3 text-primary" /> https://example-store.com
          </span>
        </div>
        <div className="px-3 py-3">
          <button
            onClick={run}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-primary transition-smooth hover:border-primary/60"
          >
            {state === "scanning" ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Play className="h-3 w-3" />
            )}
            {state === "scanning" ? "scanning…" : state === "done" ? "run scan again" : "run scan"}
          </button>

          <AnimatePresence mode="wait">
            {state === "done" && (
              <motion.ul
                key="report"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 space-y-1.5 overflow-hidden"
              >
                {scanReport.map((r, i) => (
                  <motion.li
                    key={r}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-2 font-mono text-[11.5px] text-muted-foreground"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {r}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
          <Chrome className="h-3.5 w-3.5 text-primary" /> Chrome Web Store
        </span>
        <a
          href="https://github.com/kusarithegorgon-eng/tailscan.git"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-smooth hover:border-primary/60 hover:text-primary"
        >
          <Github className="h-3.5 w-3.5" /> GitHub source
        </a>
      </div>
    </article>
  );
}

/* ----------------------------- Deep focus card --------------------------- */

const blocked = ["twitter.com", "reddit.com", "youtube.com"];

function DeepFocusCard() {
  const [on, setOn] = useState(false);

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-3xl border p-6 transition-colors duration-500",
        on ? "border-primary/50 bg-primary/5" : "border-border bg-surface",
      )}
    >
      <div className="flex items-center gap-3">
        <img
          src={deepfocusLogo.url}
          alt="Deep Focus logo"
          className="h-10 w-10 rounded-lg object-cover ring-1 ring-border"
        />
        <div>
          <h3 className="text-lg font-bold text-foreground">Deep Focus</h3>
          <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
            Distraction prevention extension
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3">
        <span className="font-mono text-[12px] text-muted-foreground">Deep Focus Mode</span>
        <button
          role="switch"
          aria-checked={on}
          aria-label="Toggle deep focus mode"
          onClick={() => {
            uiSound.click();
            setOn((v) => !v);
          }}
          className={cn(
            "relative h-7 w-13 shrink-0 rounded-full border px-1 transition-colors duration-300",
            on ? "border-primary/60 bg-primary/25" : "border-border bg-muted/30",
          )}
          style={{ width: "3.25rem" }}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className={cn(
              "block h-5 w-5 rounded-full",
              on ? "ml-auto bg-primary" : "mr-auto bg-muted-foreground/60",
            )}
          />
        </button>
      </div>

      <div className="mt-4 min-h-[104px]">
        <AnimatePresence mode="wait">
          {on ? (
            <motion.div
              key="on"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="space-y-2"
            >
              <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Local service worker active
              </p>
              {blocked.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="flex items-center justify-between rounded-lg border border-primary/25 bg-background/50 px-3 py-1.5 font-mono text-[11.5px] text-muted-foreground"
                >
                  <span>Blocked: {b}</span>
                  <span className="text-primary">×{i + 2}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="off"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[11.5px] leading-relaxed text-muted-foreground"
            >
              Off — all sites reachable. Flip the switch to simulate a locked-down session with
              on-device blocking rules.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <a
        href="https://github.com/kusarithegorgon-eng/deepfocus.git"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-border bg-background/40 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-smooth hover:border-primary/60 hover:text-primary"
      >
        <Github className="h-3.5 w-3.5" /> Repository & install guide
      </a>
    </article>
  );
}

export function LabSection() {
  return (
    <section id="lab" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Tools & Experiments
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Playable side builds
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            Each card runs a miniature version of the real thing — type, scan, and toggle right here.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Reveal className="md:col-span-2">
            <RelexCard />
          </Reveal>
          <Reveal>
            <TailscanCard />
          </Reveal>
          <Reveal delay={0.08}>
            <DeepFocusCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
