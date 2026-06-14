"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

const numbers = [
  { value: "550w+", label: "曝光" },
  { value: "海外+国内", label: "运营经验" },
  { value: "全网1w", label: "粉丝" },
  { value: "20w+", label: "赞藏" },
];

export default function EntranceAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<"hello" | "explode" | "numbers" | "cta" | "reveal" | "done">("hello");
  const [visibleNumbers, setVisibleNumbers] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [viewSize, setViewSize] = useState({ w: 1200, h: 800 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => setViewSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Phase timing — user-controlled after numbers
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("explode"), 1400);   // Hello fast in/out
    const t2 = setTimeout(() => setPhase("numbers"), 2100);    // Explode quick
    // Numbers appear with stagger internally, then after all shown → cta
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Stagger numbers — slower, one per 500ms
  useEffect(() => {
    if (phase !== "numbers") return;
    setVisibleNumbers(0);
    const interval = setInterval(() => {
      setVisibleNumbers((prev) => {
        if (prev >= numbers.length) {
          clearInterval(interval);
          // After all numbers shown, wait 800ms then show CTA
          setTimeout(() => setPhase("cta"), 800);
          return prev;
        }
        return prev + 1;
      });
    }, 500); // slower timing
    return () => clearInterval(interval);
  }, [phase]);

  // Auto-cursor for Hello phase — quick dramatic sweep
  useEffect(() => {
    if (phase !== "hello") return;
    let frame: number;
    const start = Date.now();
    const animate = () => {
      const t = (Date.now() - start) / 1000;
      const x = viewSize.w * 0.1 + (t / 1.4) * viewSize.w * 0.8; // sweep full width
      const y = viewSize.h / 2 + Math.sin(t * 2.5) * viewSize.h * 0.06;
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

  const handleClickEnter = useCallback(() => {
    setPhase("reveal");
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 900);
  }, [onComplete]);

  const isActive = phase !== "done";

  const renderPressureText = (
    text: string, baseSize: number, color: string,
    offset: number, total: number,
  ) =>
    text.split("").map((char, i) => {
      const absI = offset + i;
      const scale = computePressure(absI, total, mousePos, baseSize, viewSize);
      return (
        <span
          key={offset + i}
          className="inline-block transition-all duration-[80ms] ease-out"
          style={{
            fontSize: `${baseSize * scale}px`,
            fontFamily: "var(--font-display)",
            color,
            fontWeight: 500 + (scale - 1) * 900,
            lineHeight: 1.05,
            padding: "0 0.003em",
            textShadow: scale > 1.06 ? `0 0 ${(scale-1)*100}px ${color}50` : "none",
          }}
        >
          {char === " " ? " " : char}
        </span>
      );
    });

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          ref={containerRef}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "#131313" }}
          onMouseMove={handleMouseMove}
        >
          {/* Phase 1: MASSIVE HELLO — bigger, faster */}
          {phase === "hello" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center z-10 flex flex-wrap justify-center items-center px-4"
            >
              {renderPressureText("Hello!", 80, "#F5F0E8", 0, 6)}
            </motion.div>
          )}

          {/* Phase 2: EXPLODE — quick blur out */}
          {phase === "explode" && (
            <motion.div
              initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              animate={{ opacity: 0, scale: 2, filter: "blur(10px)" }}
              transition={{ duration: 0.55, ease: "easeIn" }}
              className="text-center z-10 flex flex-wrap justify-center items-center px-4"
              style={{ fontSize: "80px", fontFamily: "var(--font-display)", color: "#F5F0E8" }}
            >
              Hello!
            </motion.div>
          )}

          {/* Phase 3: Numbers — slower stagger with pause */}
          {phase === "numbers" && (
            <div className="flex items-center gap-3 md:gap-10 flex-wrap justify-center px-4 z-10">
              {numbers.map((num, i) => (
                <motion.div
                  key={num.value}
                  initial={{ opacity: 0, scale: 0.3, filter: "blur(8px)" }}
                  animate={
                    i < visibleNumbers
                      ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                      : { opacity: 0, scale: 0.3, filter: "blur(8px)" }
                  }
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  className="text-center"
                >
                  <div
                    className="text-4xl md:text-6xl font-bold tracking-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: i < visibleNumbers - 1 ? "#C4956A" : i === visibleNumbers - 1 ? "#7EBBB8" : "#7EBBB8",
                    }}
                  >
                    {num.value}
                  </div>
                  <div className="text-[10px] md:text-sm text-[#787878] mt-1.5 tracking-widest">
                    {num.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Phase 4: CTA — "点击了解我" button */}
          {phase === "cta" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center z-10"
            >
              {/* Keep numbers visible but dimmed */}
              <div className="flex items-center gap-3 md:gap-10 flex-wrap justify-center px-4 mb-8 opacity-60">
                {numbers.map((num) => (
                  <div key={num.value} className="text-center">
                    <div className="text-4xl md:text-6xl font-bold tracking-tight text-[#F5F0E8]"
                      style={{ fontFamily: "var(--font-display)" }}>
                      {num.value}
                    </div>
                    <div className="text-[10px] md:text-sm text-[#787878] mt-1.5 tracking-widest">
                      {num.label}
                    </div>
                  </div>
                ))}
              </div>
              {/* CTA Button — pulsing */}
              <motion.button
                onClick={handleClickEnter}
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="px-10 py-4 bg-mint text-white rounded-full text-base md:text-lg tracking-widest hover:bg-mint-dark transition-colors shadow-lg shadow-mint/20 hover:shadow-xl hover:shadow-mint/30 font-medium"
              >
                点击了解我 →
              </motion.button>
            </motion.div>
          )}

          {/* Phase 5: Reveal to homepage */}
          {phase === "reveal" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
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
  const radius = viewSize.w * 0.25;
  if (dist > radius) return 1;
  const strength = 1 - dist / radius;
  return 1 + strength * strength * 0.45;
}
