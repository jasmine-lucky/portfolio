"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onComplete: () => void;
}

// The four core numbers to display
const numbers = [
  { value: "540万", label: "曝光" },
  { value: "15篇", label: "爆文" },
  { value: "1.8", label: "ROI" },
  { value: "5806", label: "粉丝" },
];

export default function EntranceAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<"cursor" | "numbers" | "shatter" | "reveal" | "done">("cursor");
  const [visibleNumbers, setVisibleNumbers] = useState<number>(0);
  const [skipped, setSkipped] = useState(false);

  // Phase timing
  useEffect(() => {
    if (skipped) return;

    const t1 = setTimeout(() => setPhase("numbers"), 800);
    const t2 = setTimeout(() => setPhase("shatter"), 2400);
    const t3 = setTimeout(() => setPhase("reveal"), 3200);
    const t4 = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [skipped, onComplete]);

  // Stagger number appearance
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
    }, 350);
    return () => clearInterval(interval);
  }, [phase, skipped]);

  const skip = useCallback(() => {
    setSkipped(true);
    setPhase("done");
    onComplete();
  }, [onComplete]);

  const isActive = phase !== "done";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#131313" }}
        >
          {/* Skip button */}
          <button
            onClick={skip}
            className="absolute top-6 right-8 z-10 text-sm tracking-wider text-mint/60 hover:text-mint transition-colors"
          >
            跳过动画 →
          </button>

          {/* Phase 1: Cursor line */}
          {phase === "cursor" && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute left-[10%] right-[10%] h-[2px] bg-mint origin-left"
              style={{ top: "50%" }}
            />
          )}

          {/* Phase 2: Numbers appear one by one */}
          {phase === "numbers" && (
            <div className="flex items-center gap-6 md:gap-12 flex-wrap justify-center px-6">
              {numbers.map((num, i) => (
                <motion.div
                  key={num.value}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={
                    i < visibleNumbers
                      ? {
                          opacity: 1,
                          scale: 1,
                          color: i < visibleNumbers - 1 ? "#C4956A" : "#7EBBB8",
                        }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="text-center"
                >
                  <div
                    className="text-4xl md:text-6xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
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

          {/* Phase 3: Shatter & reassemble */}
          {phase === "shatter" && (
            <div className="text-center px-6">
              {/* Particle field — simplified as fading squares */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 0.8, times: [0, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="grid grid-cols-8 gap-3 opacity-30">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 1 }}
                      animate={{
                        opacity: 0,
                        x: (Math.random() - 0.5) * 200,
                        y: (Math.random() - 0.5) * 200,
                        rotate: Math.random() * 180,
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="w-3 h-3 bg-mint rounded-sm"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Reassembled text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative z-10"
              >
                <p
                  className="text-2xl md:text-4xl text-[#F5F0E8] tracking-wider leading-relaxed"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  我做了540万次曝光
                </p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-xl md:text-3xl text-mint tracking-wider leading-relaxed mt-3"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  现在想用AI把它变成5400万
                </motion.p>
              </motion.div>
            </div>
          )}

          {/* Phase 4: Reveal — background transition */}
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
