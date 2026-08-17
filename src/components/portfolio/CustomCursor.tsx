import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor on desktop while this component is mounted
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!desktop) return;

    document.documentElement.classList.add("cursor-none");

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 font-mono text-lg leading-none text-primary transition-opacity duration-75",
        isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        textShadow: "0 0 10px hsl(160 84% 55% / 0.6)",
      }}
      aria-hidden
    >
      *
    </div>
  );
}

