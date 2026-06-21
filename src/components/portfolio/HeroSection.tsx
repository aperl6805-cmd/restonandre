import { useEffect, useState } from "react";
import { ChevronDown, Download, FolderGit2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const roles = ["Product Engineer", "Full-Stack Engineer", "Frontend Engineer", "UI Engineer"];

export function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <header id="top" className="relative overflow-hidden bg-gradient-hero">
      {/* Animated background mesh */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-32 left-1/3 h-[480px] w-[480px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-primary-glow/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pt-20 pb-32 md:grid-cols-[3fr_2fr] md:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary align-middle" />
            Available for freelance
          </p>
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Christian Andre
            <br />
            <span className="text-muted-foreground">C. Reston</span>
          </h1>
          <p className="mt-4 flex h-8 items-center text-xl font-semibold text-primary md:text-2xl">
            <motion.span
              key={roleIdx}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.4 }}
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
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow"
            >
              <a href="#projects">
                <FolderGit2 className="mr-2 h-4 w-4" /> View Projects
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border bg-surface hover:border-primary/60 hover:text-primary"
            >
              <a href="#" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
          <svg viewBox="0 0 200 200" className="relative h-full w-full">
            <g fill="none" strokeWidth="1.5">
              <circle cx="100" cy="100" r="90" stroke="hsl(160 84% 39% / 0.4)" className="origin-center animate-spin-slow" style={{ transformOrigin: "100px 100px" }} strokeDasharray="4 8" />
              <circle cx="100" cy="100" r="70" stroke="hsl(160 84% 55% / 0.5)" className="origin-center animate-spin-reverse" style={{ transformOrigin: "100px 100px" }} strokeDasharray="2 6" />
              <circle cx="100" cy="100" r="50" stroke="hsl(160 84% 39% / 0.7)" />
              <polygon points="100,55 145,145 55,145" stroke="hsl(160 84% 55%)" className="origin-center animate-spin-slow" style={{ transformOrigin: "100px 100px" }} />
              <circle cx="100" cy="100" r="6" fill="hsl(160 84% 55%)" stroke="none" />
            </g>
          </svg>
        </motion.div>
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
