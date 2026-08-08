import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = {
  active: string | null;
  setActive: (s: string | null) => void;
};

const SkillHighlightContext = createContext<Ctx>({ active: null, setActive: () => {} });

export function SkillHighlightProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<string | null>(null);
  const value = useMemo(() => ({ active, setActive }), [active]);
  return (
    <SkillHighlightContext.Provider value={value}>{children}</SkillHighlightContext.Provider>
  );
}

export function useSkillHighlight() {
  return useContext(SkillHighlightContext);
}

/** Loose match so "React" highlights "React", "Web Audio API" matches "WebAudio", etc. */
export function matchesSkill(tech: string[], skill: string | null) {
  if (!skill) return true;
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z]/g, "");
  const k = norm(skill);
  return tech.some((t) => {
    const n = norm(t);
    return n.includes(k) || k.includes(n);
  });
}
