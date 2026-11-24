"use client";

import { useEffect, useRef } from "react";

// The "Signal" background from the Lion Switch dashboard sign-in page: a slow
// network of points (phones) with orange sparks travelling between them (calls
// connecting). Decoration only. It fills its positioned parent, pauses when
// scrolled out of view or in a background tab, and draws a single still frame
// for people who prefer reduced motion.

export function SignalNetwork({ className = "", density = 18 }: { className?: string; density?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const g = c?.getContext("2d");
    if (!c || !g) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type Pt = { x: number; y: number; vx: number; vy: number };
    type Spark = { a: Pt; b: Pt; t: number };
    let W = 0, H = 0, D = 1;
    let pts: Pt[] = [];
    let sparks: Spark[] = [];
    let raf = 0;
    let visible = true;
    let running = false;

    function size() {
      const box = c!.getBoundingClientRect();
      D = Math.min(2, window.devicePixelRatio || 1);
      W = c!.width = Math.max(1, Math.round(box.width * D));
      H = c!.height = Math.max(1, Math.round(box.height * D));
      const n = Math.min(110, Math.round(box.width / density));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25 * D,
        vy: (Math.random() - 0.5) * 0.25 * D,
      }));
      sparks = [];
      if (still || !running) draw(false);
    }

    function draw(loop = true) {
      g!.clearRect(0, 0, W, H);
      const R = 150 * D;
      if (!still) {
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
      }
      g!.lineWidth = D;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < R) {
            g!.strokeStyle = `rgba(160,175,200,${0.12 * (1 - d / R)})`;
            g!.beginPath();
            g!.moveTo(a.x, a.y);
            g!.lineTo(b.x, b.y);
            g!.stroke();
          }
        }
      }
      g!.fillStyle = "rgba(200,210,225,.55)";
      for (const p of pts) {
        g!.beginPath();
        g!.arc(p.x, p.y, 1.6 * D, 0, 7);
        g!.fill();
      }
      sparks = sparks.filter((s) => s.t <= 1);
      for (const s of sparks) {
        s.t += 0.012;
        const x = s.a.x + (s.b.x - s.a.x) * s.t, y = s.a.y + (s.b.y - s.a.y) * s.t;
        g!.strokeStyle = `rgba(245,138,11,${0.35 * (1 - s.t)})`;
        g!.beginPath();
        g!.moveTo(s.a.x, s.a.y);
        g!.lineTo(x, y);
        g!.stroke();
        g!.fillStyle = "#ffb547";
        g!.shadowColor = "#f58a0b";
        g!.shadowBlur = 14;
        g!.beginPath();
        g!.arc(x, y, 2.6 * D, 0, 7);
        g!.fill();
        g!.shadowBlur = 0;
      }
      if (loop && running) raf = requestAnimationFrame(() => draw());
    }

    function update() {
      const shouldRun = !still && visible && document.visibilityState === "visible";
      if (shouldRun && !running) {
        running = true;
        raf = requestAnimationFrame(() => draw());
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    }

    const spawn = still
      ? 0
      : window.setInterval(() => {
          if (!running) return;
          const a = pts[Math.floor(Math.random() * pts.length)], b = pts[Math.floor(Math.random() * pts.length)];
          if (a && b && a !== b && sparks.length < 12) sparks.push({ a, b, t: 0 });
        }, 450);

    const ro = new ResizeObserver(size);
    ro.observe(c);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      update();
    });
    io.observe(c);
    document.addEventListener("visibilitychange", update);
    size();
    update();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearInterval(spawn);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [density]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}

/** The orange logo tile with rings spreading out like a signal (also from the sign-in page). */
export function SignalBeacon({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative h-[84px] w-[84px] ${className}`}>
      <span className="sig-ring" />
      <span className="sig-ring" />
      <span className="sig-ring" />
      <span className="absolute inset-0 z-[2] grid place-items-center rounded-[24px] bg-orange shadow-[0_0_50px_rgba(245,138,11,0.55)]">
        <svg viewBox="0 0 24 24" width="34" height="34" focusable="false">
          <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <g transform="translate(0 -1.5)">
              <circle cx="12" cy="10" r="2" fill="#fff" stroke="none" />
              <path d="M8.5 13.5a5 5 0 0 1 0-7M15.5 6.5a5 5 0 0 1 0 7M5.6 16.4a9 9 0 0 1 0-12.8M18.4 3.6a9 9 0 0 1 0 12.8" />
            </g>
            <path d="M12 10.5V18.5" />
          </g>
        </svg>
      </span>
    </div>
  );
}
