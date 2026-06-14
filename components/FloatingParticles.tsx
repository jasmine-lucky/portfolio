"use client";

import { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulse: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animFrame: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
      const count = Math.min(30, Math.floor((canvas.width * canvas.height) / 80000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.03,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.height = document.documentElement.scrollHeight;

      const now = Date.now() / 1000;
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const alpha = p.opacity + Math.sin(now + p.pulse) * 0.04;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(126, 187, 184, ${Math.max(0.01, alpha)})`;
        ctx.fill();
      });
      animFrame = requestAnimationFrame(animate);
    };

    init();
    animFrame = requestAnimationFrame(animate);
    window.addEventListener("resize", init);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
