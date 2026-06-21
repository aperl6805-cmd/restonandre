import { ChevronDown, Download, FolderGit2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <header className="relative overflow-hidden bg-gradient-hero">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pt-20 pb-32 md:grid-cols-[3fr_2fr] md:pt-28">
        <div className="animate-fade-up">
          <p className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
            Available for freelance
          </p>
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight md:text-6xl">
            Christian Andre
            <br />
            <span className="text-muted-foreground">C. Reston</span>
          </h1>
          <p className="mt-4 text-xl font-semibold text-primary md:text-2xl">
            Software Developer
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
            I craft pragmatic, performant web products end-to-end. From data
            models to pixel-perfect interfaces, I help teams ship software that
            people actually want to use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary-glow shadow-glow">
              <a href="#projects">
                <FolderGit2 className="mr-2 h-4 w-4" /> View Projects
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border bg-surface hover:border-primary/60 hover:text-primary">
              <a href="#" download>
                <Download className="mr-2 h-4 w-4" /> Download CV
              </a>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-sm items-center justify-center">
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
