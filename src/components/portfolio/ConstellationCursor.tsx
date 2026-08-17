import { useEffect, useRef } from "react";

const MAX_POINTS = 60;
const MAX_DIST = 120;
const LIFETIME = 90;

class Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age = 0;
  life: number;
  radius: number;
  twinklePhase: number;

  constructor(x: number, y: number, burst = false) {
    this.x = x;
    this.y = y;
    this.life = LIFETIME + Math.random() * 30;
    this.radius = 1.2 + Math.random() * 1.8;
    this.twinklePhase = Math.random() * Math.PI * 2;
    if (burst) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 3;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
    } else {
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
    }
  }

  update() {
    this.age++;
    this.x += this.vx;
    this.y += this.vy;
    this.vx *= 0.98;
    this.vy *= 0.98;
  }

  get alpha() {
    const t = this.age / this.life;
    if (t > 1) return 0;
    return t < 0.15 ? t / 0.15 : 1 - (t - 0.15) / 0.85;
  }

  get dead() {
    return this.age > this.life;
  }
}

export function ConstellationCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let W = 0;
    let H = 0;
    let raf = 0;
    let points: Star[] = [];
    const mouse = { x: 0, y: 0, active: false };
    let lastSpawn = 0;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();

    const spawn = (x: number, y: number) => {
      points.push(new Star(x + (Math.random() - 0.5) * 6, y + (Math.random() - 0.5) * 6));
      if (points.length > MAX_POINTS) points.shift();
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
      const now = performance.now();
      if (now - lastSpawn > 30) {
        lastSpawn = now;
        spawn(mouse.x, mouse.y);
      }
    };

    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouse.x = t.clientX;
      mouse.y = t.clientY;
      mouse.active = true;
      spawn(mouse.x, mouse.y);
    };

    const onLeave = () => {
      mouse.active = false;
    };

    const onClick = (e: MouseEvent) => {
      for (let i = 0; i < 18; i++) points.push(new Star(e.clientX, e.clientY, true));
      if (points.length > MAX_POINTS + 18) {
        points.splice(0, points.length - (MAX_POINTS + 18));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, W, H);

      points.forEach((p) => p.update());
      points = points.filter((p) => !p.dead);

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * Math.min(a.alpha, b.alpha) * 0.6;
            ctx.strokeStyle = `rgba(140, 180, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((p) => {
        const twinkle = 0.7 + 0.3 * Math.sin(p.age * 0.2 + p.twinklePhase);
        const alpha = p.alpha * twinkle;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
        grad.addColorStop(0, `rgba(200, 220, 255, ${alpha})`);
        grad.addColorStop(1, "rgba(200, 220, 255, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("touchmove", onTouch, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchmove", onTouch);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[98] h-full w-full"
    />
  );
}
