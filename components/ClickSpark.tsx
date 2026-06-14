"use client";

import { useRef, useEffect, useCallback, type ReactNode } from "react";

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

interface ClickSparkProps {
  children: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: "linear" | "ease-in" | "ease-out" | "ease-in-out";
}

const easeFuncs = {
  linear: (t: number) => t,
  "ease-in": (t: number) => t * t,
  "ease-out": (t: number) => t * (2 - t),
  "ease-in-out": (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
};

export default function ClickSpark({
  children,
  sparkColor = "#7EBBB8",
  sparkSize = 10,
  sparkRadius = 20,
  sparkCount = 8,
  duration = 450,
  easing = "ease-out",
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animFrameRef = useRef<number>(0);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const now = performance.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = now - spark.startTime;
      if (elapsed >= duration) return false;

      const progress = elapsed / duration;
      const eased = easeFuncs[easing](progress);
      const distance = eased * sparkRadius;
      const alpha = 1 - eased;
      const lineLength = sparkSize * (1 - eased);

      const rad = (spark.angle * Math.PI) / 180;
      const dx = Math.cos(rad) * distance;
      const dy = Math.sin(rad) * distance;
      const x1 = spark.x + dx;
      const y1 = spark.y + dy;
      const x2 = spark.x + dx + Math.cos(rad) * lineLength;
      const y2 = spark.y + dy + Math.sin(rad) * lineLength;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = sparkColor;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1.8;
      ctx.lineCap = "round";
      ctx.stroke();

      return true;
    });

    ctx.globalAlpha = 1;
    animFrameRef.current = requestAnimationFrame(animate);
  }, [sparkColor, sparkSize, sparkRadius, duration, easing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (360 / sparkCount) * i,
        startTime: performance.now(),
      }));

      sparksRef.current.push(...newSparks);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("click", handleClick);
    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("click", handleClick);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [sparkCount, animate]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[9999]"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
