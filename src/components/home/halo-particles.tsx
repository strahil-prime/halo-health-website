'use client';

import { useEffect, useRef } from 'react';

/**
 * Dust motes drifting around the halo. Canvas 2D, DPR-aware,
 * paused off screen, and a single still frame for reduced motion.
 */
export function HaloParticles({ count = 90 }: { count?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const particles = Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      // Fraction of the ring radius: clustered on the ring, some strays.
      radius:
        0.86 +
        Math.pow(Math.random(), 2) * 0.34 * (Math.random() > 0.5 ? 1 : -0.6),
      speed: (0.02 + Math.random() * 0.06) * (Math.random() > 0.2 ? 1 : -1),
      size: 0.4 + Math.random() * 1.4,
      phase: Math.random() * Math.PI * 2,
    }));

    let width = 0;
    let height = 0;
    let frame = 0;
    let running = false;
    let last = performance.now();

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas!.clientWidth;
      height = canvas!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      context!.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      // The canvas is 130% of the ring, so the ring radius is half / 1.3.
      const ring = Math.min(width, height) / 2 / 1.3;
      for (const p of particles) {
        p.angle += p.speed * dt;
        const twinkle = 0.35 + 0.65 * Math.abs(Math.sin(now / 1400 + p.phase));
        const r = ring * p.radius;
        context!.beginPath();
        context!.arc(
          cx + Math.cos(p.angle) * r,
          cy + Math.sin(p.angle) * r,
          p.size,
          0,
          Math.PI * 2,
        );
        context!.fillStyle = `rgba(251, 230, 204, ${0.7 * twinkle})`;
        context!.fill();
      }
      if (running) frame = requestAnimationFrame(draw);
    }

    resize();
    draw(performance.now());

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!running) draw(performance.now());
    });
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      const shouldRun = Boolean(entry?.isIntersecting) && !reduced;
      if (shouldRun && !running) {
        running = true;
        last = performance.now();
        frame = requestAnimationFrame(draw);
      } else if (!shouldRun) {
        running = false;
        cancelAnimationFrame(frame);
      }
    });
    visibility.observe(canvas);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
    };
  }, [count]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 size-[130%] -translate-x-1/2 -translate-y-1/2"
    />
  );
}
