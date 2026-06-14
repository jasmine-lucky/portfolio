"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const [viewSize, setViewSize] = useState({ w: 1200, h: 800 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [skipped, setSkipped] = useState(false);

  // Track viewport size
  useEffect(() => {
    const update = () => setViewSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Phase timing
  useEffect(() => {
    if (skipped) return;
    const t1 = setTimeout(() => setPhase("pressure"), 2400);
    const t2 = setTimeout(() => setPhase("reveal"), 4000);
    const t3 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [skipped, onComplete]);

  // Stagger numbers
  useEffect(() => {
    if (phase !== "numbers" || skipped) return;
    const interval = setInterval(() => {
      setVisibleNumbers((prev) => {
        if (prev >= numbers.length) { clearInterval(interval); return prev; }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [phase, skipped]);

  // Auto-moving cursor for TextPressure effect — sweeps across text
  useEffect(() => {
    if (phase !== "pressure") return;
    let frame: number;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      const x = viewSize.w / 2 + Math.sin(t * 0.7) * viewSize.w * 0.42;
      const y = viewSize.h / 2 + Math.cos(t * 1.4) * viewSize.h * 0.1;
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

  // TextPressure: chars for pressure phase
  const tagline1 = "我做了540万次曝光";
  const tagline2 = "现在想用AI把它变成5400万";
  const wrapChars = (text: string, offset: number, baseSize: number) =>
    text.split("").map((char, i) => {
      const absI = offset + i;
      const totalChars = tagline1.length + tagline2.length;
      const scale = computePressure(absI, totalChars, mousePos, baseSize, viewSize);
      return { char, scale, key: offset + i };
    });

  const chars1 = wrapChars(tagline1, 0, 36);
  const chars2 = wrapChars(tagline2, tagline1.length, 36);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#131313" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => phase === "pressure" ? null : setMousePos(null)}
        >
          <button
            onClick={skip}
            className="absolute top-4 md:top-6 right-4 md:right-8 z-10 text-xs md:text-sm tracking-wider text-mint/60 hover:text-mint transition-colors"
          >
            跳过动画 →
          </button>

          {/* Phase 1: Numbers */}
          {phase === "numbers" && (
            <div className="flex items-center gap-3 md:gap-10 flex-wrap justify-center px-4">
              {numbers.map((num, i) => (
                <motion.div
                  key={num.value}
                  initial={{ opacity: 0, scale: 0.3, filter: "blur(8px)" }}
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

          {/* Phase 2: TextPressure — characters respond to cursor proximity */}
          {phase === "pressure" && (
            <div className="text-center px-4 relative z-10 select-none">
              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-wrap justify-center">
                  {chars1.map(({ char, scale, key }) => (
                    <span
                      key={key}
                      className="inline-block transition-all duration-[120ms] ease-out"
                      style={{
                        fontSize: `${36 * scale}px`,
                        fontFamily: "var(--font-serif)",
                        color: "#F5F0E8",
                        fontWeight: 400 + (scale - 1) * 600,
                        lineHeight: 1.3,
                        padding: "0 0.01em",
                      }}
                    >
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center">
                  {chars2.map(({ char, scale, key }) => (
                    <span
                      key={key}
                      className="inline-block transition-all duration-[120ms] ease-out"
                      style={{
                        fontSize: `${36 * scale}px`,
                        fontFamily: "var(--font-serif)",
                        color: "#7EBBB8",
                        fontWeight: 400 + (scale - 1) * 600,
                        lineHeight: 1.3,
                        padding: "0 0.01em",
                      }}
                    >
                      {char === " " ? " " : char}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Phase 3: Reveal to main page */}
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

// Compute pressure scale: characters near cursor get bigger/bolder
function computePressure(
  i: number,
  total: number,
  mousePos: { x: number; y: number } | null,
  baseSize: number,
  viewSize: { w: number; h: number },
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
  const radius = Math.min(viewSize.w, viewSize.h) * 0.28;
  if (dist > radius) return 1;
  const strength = 1 - dist / radius;
  return 1 + strength * strength * 0.35;
}
