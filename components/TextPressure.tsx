"use client";

import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";

interface TextPressureProps {
  text: string;
  className?: string;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  maxFontSize?: number;
  fontFamily?: string;
  pressureRadius?: number;
}

export default function TextPressure({
  text,
  className = "",
  minFontSize = 24,
  maxFontSize = 200,
  fontFamily = "var(--font-serif)",
  textColor = "#1D1D1D",
  pressureRadius = 180,
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos(null);
  }, []);

  // Resize observer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    ro.observe(container);
    setContainerSize({
      width: container.offsetWidth,
      height: container.offsetHeight,
    });
    return () => ro.disconnect();
  }, []);

  // Calculate dynamic font size based on container width
  const charCount = text.length;
  const targetFontSize = Math.min(
    maxFontSize,
    Math.max(minFontSize, (containerSize.width * 0.85) / (charCount * 0.55))
  );

  // Split text into characters
  const chars = text.split("");

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ minHeight: `${targetFontSize * 1.4}px` }}
    >
      <div
        className="flex flex-wrap justify-center items-center"
        style={{ gap: `${targetFontSize * 0.02}px` }}
      >
        {chars.map((char, i) => {
          // Calculate position-based pressure if mouse is tracked
          let scale = 1;
          let translateY = 0;
          let opacity = 1;
          let weight = 400;

          if (mousePos && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            // Estimate character position based on index
            const charWidth = targetFontSize * 0.55;
            const totalWidth = charCount * charWidth;
            const startX = (containerRect.width - totalWidth) / 2;
            const charX = startX + i * charWidth;
            const charY = containerRect.height / 2;

            const dx = mousePos.x - charX;
            const dy = mousePos.y - charY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < pressureRadius) {
              const strength = 1 - dist / pressureRadius;
              const easedStrength = strength * strength; // quadratic ease
              scale = 1 + easedStrength * 0.25;
              translateY = -easedStrength * targetFontSize * 0.12;
              opacity = 1 - easedStrength * 0.15;
              weight = 400 + easedStrength * 300;
            }
          }

          return (
            <span
              key={i}
              className="inline-block transition-transform duration-100 ease-out"
              style={{
                fontSize: `${targetFontSize}px`,
                fontFamily,
                color: textColor,
                lineHeight: 1.2,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                opacity,
                fontWeight: weight,
                fontVariationSettings: `"wght" ${weight}`,
                transition: "transform 0.15s ease-out, opacity 0.15s ease-out, font-weight 0.15s ease-out",
              }}
            >
              {char === " " ? " " : char}
            </span>
          );
        })}
      </div>
    </div>
  );
}
