"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const numbers = [
  { value: "540万", label: "曝光" },
  { value: "15篇", label: "爆文" },
  { value: "5959", label: "粉丝" },
  { value: "19.9万", label: "赞藏" },
];

export default function EntranceAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<"hello" | "explode" | "numbers" | "tagline" | "reveal" | "done">("hello");
  const [visibleNumbers, setVisibleNumbers] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [viewSize, setViewSize] = useState({ w: 1200, h: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const update = () => setViewSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (skipped) return;
    const t1 = setTimeout(() => setPhase("explode"), 2000);
    const t2 = setTimeout(() => setPhase("numbers"), 2800);
    const t3 = setTimeout(() => setPhase("tagline"), 4400);
    const t4 = setTimeout(() => setPhase("reveal"), 5400);
    const t5 = setTimeout(() => { setPhase("done"); onComplete(); }, 6200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [skipped, onComplete]);

  useEffect(() => {
    if (phase !== "numbers" || skipped) return;
    const interval = setInterval(() => {
      setVisibleNumbers((prev) => {
        if (prev >= numbers.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [phase, skipped]);

  // Auto-cursor for Hello phase — dramatic sweeps
  useEffect(() => {
    if (phase !== "hello") return;
    let frame: number;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      // Dramatic sweep: left to right, then figure-8
      const x = t < 0.6
        ? viewSize.w * 0.15 + (t / 0.6) * viewSize.w * 0.7  // sweep across
        : viewSize.w / 2 + Math.sin((t - 0.6) * 1.2) * viewSize.w * 0.35;
      const y = viewSize.h / 2 + Math.cos(t * 0.8) * viewSize.h * 0.08;
      setMousePos({ x, y });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, viewSize]);

  // Auto-cursor for tagline phase
  useEffect(() => {
    if (phase !== "tagline") return;
    let frame: number;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      const x = viewSize.w / 2 + Math.sin(t * 0.7) * viewSize.w * 0.4;
      const y = viewSize.h / 2 + Math.cos(t * 1.3) * viewSize.h * 0.08;
      setMousePos({ x, y });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, viewSize]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const skip = useCallback(() => {
    setSkipped(true);
    setPhase("done");
    onComplete();
  }, [onComplete]);

  const isActive = phase !== "done";

  // TextPressure: render characters with pressure-based scaling
  const renderPressureText = (
    text: string,
    baseSize: number,
    color: string,
    offset: number,
    total: number,
  ) =>
    text.split("").map((char, i) => {
      const absI = offset + i;
      const scale = computePressure(absI, total, mousePos, baseSize, viewSize);
      return (
        <span
          key={offset + i}
          className="inline-block transition-all duration-[100ms] ease-out"
          style={{
            fontSize: `${baseSize * scale}px`,
            fontFamily: "var(--font-display)",
            color,
            fontWeight: 400 + (scale - 1) * 800,
            lineHeight: 1.1,
            padding: "0 0.005em",
            textShadow: scale > 1.08 ? `0 0 ${(scale - 1) * 80}px ${color}40` : "none",
          }}
        >
          {char === " " ? " " : char}
        </span>
      );
    });

  const charCountHello = 6; // "Hello!"
  const tagline1 = "我做了540万次曝光";
  const tagline2 = "现在想用AI把它变成5400万";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "#131313" }}
          onMouseMove={handleMouseMove}
        >
          <button
            onClick={skip}
            className="absolute top-4 right-4 md:top-6 md:right-8 z-10 text-xs md:text-sm tracking-wider text-white/30 hover:text-white/70 transition-colors"
          >
            跳过 →
          </button>

          {/* Phase 1: MASSIVE HELLO with TextPressure */}
          {phase === "hello" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center z-10 flex flex-wrap justify-center items-center px-4"
            >
              {renderPressureText("Hello!", 60, "#F5F0E8", 0, 6)}
            </motion.div>
          )}

          {/* Phase 2: EXPLODE */}
          {phase === "explode" && (
            <motion.div
              initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              animate={{ opacity: 0, scale: 1.8, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: "easeIn" }}
              className="text-center z-10 flex flex-wrap justify-center items-center px-4"
              style={{ fontSize: "60px", fontFamily: "var(--font-display)", color: "#F5F0E8" }}
            >
              Hello!
            </motion.div>
          )}

          {/* Phase 3: Numbers */}
          {phase === "numbers" && (
            <div className="flex items-center gap-3 md:gap-10 flex-wrap justify-center px-4 z-10">
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
                  <div className="text-[10px] md:text-sm text-[#787878] mt-1 tracking-widest">
                    {num.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Phase 4: Tagline with TextPressure */}
          {phase === "tagline" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4 z-10"
            >
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-wrap justify-center">
                  {renderPressureText(tagline1, 30, "#F5F0E8", 0, tagline1.length + tagline2.length)}
                </div>
                <div className="flex flex-wrap justify-center">
                  {renderPressureText(tagline2, 30, "#7EBBB8", tagline1.length, tagline1.length + tagline2.length)}
                </div>
              </div>
            </motion.div>
          )}

          {/* Phase 5: Reveal */}
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

function computePressure(
  i: number, total: number,
  mousePos: { x: number; y: number } | null,
  baseSize: number, viewSize: { w: number; h: number },
): number {
  if (!mousePos) return 1;
  const charW = baseSize * 0.6;
  const totalW = total * charW;
  const startX = (viewSize.w - totalW) / 2;
  const charX = startX + i * charW;
  const charY = viewSize.h / 2;
  const dx = mousePos.x - charX;
  const dy = mousePos.y - charY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const radius = viewSize.w * 0.22;
  if (dist > radius) return 1;
  const strength = 1 - dist / radius;
  return 1 + strength * strength * 0.4;
}
