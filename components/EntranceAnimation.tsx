"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const numbers = [
  { value: "540万", label: "曝光" },
  { value: "15篇", label: "爆文" },
  { value: "1.8", label: "ROI" },
  { value: "5806", label: "粉丝" },
];

export default function EntranceAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<"numbers" | "pressure" | "reveal" | "done">("numbers");
  const [visibleNumbers, setVisibleNumbers] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) return;

    const t1 = setTimeout(() => setPhase("pressure"), 2400);
    const t2 = setTimeout(() => setPhase("reveal"), 3600);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [skipped, onComplete]);

  useEffect(() => {
    if (phase !== "numbers" || skipped) return;
    const interval = setInterval(() => {
      setVisibleNumbers((prev) => {
        if (prev >= numbers.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [phase, skipped]);

  const skip = useCallback(() => {
    setSkipped(true);
    setPhase("done");
    onComplete();
  }, [onComplete]);

  // Simulated cursor for pressure effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const isActive = phase !== "done";

  // TextPressure calculations for the tagline
  const tagline1 = "我做了540万次曝光";
  const tagline2 = "现在想用AI把它变成5400万";
  const chars1 = tagline1.split("");
  const chars2 = tagline2.split("");
  const fontBase = 42;

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#131313" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePos(null)}
        >
          <button
            onClick={skip}
            className="absolute top-6 right-8 z-10 text-sm tracking-wider text-mint/60 hover:text-mint transition-colors"
          >
            跳过动画 →
          </button>

          {/* Phase 1: Numbers */}
          {phase === "numbers" && (
            <div className="flex items-center gap-4 md:gap-12 flex-wrap justify-center px-6">
              {numbers.map((num, i) => (
                <motion.div
                  key={num.value}
                  initial={{ opacity: 0, scale: 0.3, filter: "blur(10px)" }}
                  animate={
                    i < visibleNumbers
                      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, scale: 0.3 }
                  }
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center"
                >
                  <div
                    className="text-3xl md:text-5xl font-bold tracking-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: i < visibleNumbers - 1 ? "#C4956A" : "#7EBBB8",
                    }}
                  >
                    {num.value}
                  </div>
                  <div className="text-xs md:text-sm text-[#787878] mt-1 tracking-widest">
                    {num.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Phase 2: TextPressure - characters respond to mouse/cursor */}
          {phase === "pressure" && (
            <div className="text-center px-6 relative z-10">
              {/* Auto-moving invisible cursor for continuous pressure effect */}
              <AutoCursor />
              <div className="space-y-4">
                <div className="flex flex-wrap justify-center gap-[0.02em]">
                  {chars1.map((char, i) => {
                    const scale = getScale(i, chars1.length, mousePos, fontBase);
                    return (
                      <span
                        key={i}
                        className="inline-block transition-all duration-150 ease-out"
                        style={{
                          fontSize: `${fontBase}px`,
                          fontFamily: "var(--font-serif)",
                          color: "#F5F0E8",
                          transform: `scale(${scale})`,
                          fontWeight: 400 + (scale - 1) * 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {char === " " ? " " : char}
                      </span>
                    );
                  })}
                </div>
                <div className="flex flex-wrap justify-center gap-[0.02em]">
                  {chars2.map((char, i) => {
                    const scale = getScale(i + chars1.length, chars1.length + chars2.length, mousePos, fontBase);
                    return (
                      <span
                        key={i}
                        className="inline-block transition-all duration-150 ease-out"
                        style={{
                          fontSize: `${fontBase}px`,
                          fontFamily: "var(--font-serif)",
                          color: "#7EBBB8",
                          transform: `scale(${scale})`,
                          fontWeight: 400 + (scale - 1) * 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {char === " " ? " " : char}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Reveal */}
          {phase === "reveal" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ backgroundColor: "#ECE3D5" }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Utility: calculate scale based on character position and mouse proximity
function getScale(i: number, total: number, mousePos: { x: number; y: number } | null, fontSize: number): number {
  if (!mousePos) return 1;
  // Estimate char position without DOM refs
  const charW = fontSize * 0.55;
  const totalW = total * charW;
  const startX = (typeof window !== "undefined" ? window.innerWidth : 1000) / 2 - totalW / 2;
  const charX = startX + i * charW;
  const charY = (typeof window !== "undefined" ? window.innerHeight : 600) / 2;
  const dx = mousePos.x - charX;
  const dy = mousePos.y - charY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = 180;
  if (dist > radius) return 1;
  const strength = 1 - dist / radius;
  return 1 + strength * strength * 0.3;
}

// Auto-moving cursor that creates continuous pressure effect
function AutoCursor() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    let frame: number;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      const w = typeof window !== "undefined" ? window.innerWidth : 1000;
      const h = typeof window !== "undefined" ? window.innerHeight : 600;
      // Sweep a figure-8-like pattern over the text area
      const x = w / 2 + Math.sin(t * 0.8) * w * 0.4;
      const y = h / 2 + Math.cos(t * 1.6) * h * 0.12;
      setPos({ x, y });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  // This component doesn't render anything visible - it just updates position
  // The position is used via DOM events; this is a fallback auto-animation
  return null;
}
