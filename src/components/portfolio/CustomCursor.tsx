import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor on desktop while this component is mounted
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    if (!desktop) return;

    document.documentElement.classList.add("cursor-none");

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const isInteractive =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("[role='button']") !== null;

      setIsPointer(isInteractive);
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
    <>
      {/* Crisp dot */}
      <div
        className={cn(
          "fixed pointer-events-none z-[100] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-75",
          isVisible ? "opacity-100" : "opacity-0"
        )}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* Glowing ring follower */}
      <div
        className={cn(
          "fixed pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-primary/5 transition-all duration-300 ease-out",
          isVisible ? "opacity-100" : "opacity-0",
          isPointer
            ? "h-12 w-12 scale-125 bg-primary/10"
            : "h-8 w-8 scale-100"
        )}
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
    </>
  );
}
