import { useEffect, useState } from "react";
import { ChevronDown, Download, FolderGit2, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ParticleField } from "./ParticleField";
import { CodeWidget } from "./CodeWidget";
import { LocalTimeCard } from "./LocalTimeCard";
import { MagneticButton } from "./MagneticButton";
import { uiSound } from "./SoundToggle";

const roles = ["Full-Stack Engineer", "Product Engineer", "Canvas Developer", "UI Engineer"];

export function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <header id="top" className="relative overflow-hidden bg-gradient-hero">
      <div className="pointer-events-none absolute inset-0">
        <ParticleField className="absolute inset-0 h-full w-full" />
        <div className="absolute -top-32 left-1/3 h-[480px] w-[480px] rounded-full bg-primary/15 blur-[130px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-primary-glow/10 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 78%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-28 md:pt-28">
        <div className="grid gap-4 md:grid-cols-3 md:grid-rows-[auto_auto]">
          {/* Card 1 — intro */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border bg-surface/60 p-8 backdrop-blur-md shadow-glow md:col-span-2 md:row-span-2 md:p-10"
          >
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Available for freelance
            </p>
            <h1 className="text-5xl font-black leading-[1.03] tracking-tight md:text-6xl">
              Christian Andre
              <br />
              <span className="text-muted-foreground">C. Reston</span>
            </h1>
            <p className="mt-5 flex h-9 items-center overflow-hidden text-xl font-semibold text-primary md:text-2xl">
              <motion.span
                key={roleIdx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {roles[roleIdx]}
              </motion.span>
              <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-primary" />
            </p>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              I craft pragmatic, performant web products end-to-end. From data
              models to pixel-perfect interfaces, I help teams ship software that
              people actually want to use.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <MagneticButton
                onMouseEnter={uiSound.hover}
                onClick={() => {
                  uiSound.click();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-11 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-colors hover:bg-primary-glow"
              >
                <FolderGit2 className="mr-2 h-4 w-4" /> View Projects
              </MagneticButton>
              <MagneticButton
                onMouseEnter={uiSound.hover}
                onClick={() => {
                  uiSound.click();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex h-11 items-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Download className="mr-2 h-4 w-4" /> Download CV
              </MagneticButton>
            </div>
          </motion.div>

          {/* Card 2 — interactive editor */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="rounded-3xl border border-border bg-surface/70 backdrop-blur-md shadow-glow"
          >
            <CodeWidget className="h-full min-h-[240px]" />
          </motion.div>

          {/* Card 3 — local time */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="rounded-3xl border border-border bg-surface/70 p-6 backdrop-blur-md shadow-glow"
          >
            <LocalTimeCard />
            <p className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Usually replies within a day
            </p>
          </motion.div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-6 w-6 animate-bounce-soft" />
      </a>
    </header>
  );
}
