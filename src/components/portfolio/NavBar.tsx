import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Command, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { uiSound } from "./SoundToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function NavBar() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);
  const [active, setActive] = useState<string>("#about");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setIsMac(/Mac|iPhone|iPad|iPod/.test(navigator.platform));
  }, []);

  // Scroll spy for the indicator pill
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const onScroll = () => {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(`#${current}`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const openPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: isMac,
        ctrlKey: !isMac,
        bubbles: true,
      }),
    );
  };

  return (
    <div className="pointer-events-none sticky top-0 z-50 px-4 pt-4">
      <nav className="pointer-events-auto mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background/70 px-4 backdrop-blur-xl shadow-glow">
        <Link to="/" className="text-lg font-black tracking-tight" onClick={uiSound.click}>
          <span className="text-primary">CAR</span>
          <span className="text-foreground">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onMouseEnter={uiSound.hover}
              onClick={uiSound.click}
              className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-smooth ${
                active === l.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-primary/10 ring-1 ring-primary/25"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={openPalette}
            aria-label="Open command palette"
            className="hidden items-center gap-2 rounded-full border border-border bg-surface px-2.5 py-1.5 text-xs text-muted-foreground transition-smooth hover:border-primary/60 hover:text-primary md:inline-flex"
          >
            <Command className="h-3.5 w-3.5" />
            <kbd className="font-mono">{isMac ? "⌘" : "Ctrl"} K</kbd>
          </button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-surface border-border">
              <div className="mt-12 flex flex-col gap-6">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-primary"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}
