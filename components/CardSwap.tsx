"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CardItem {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  link?: string;
}

interface CardSwapProps {
  items: CardItem[];
  interval?: number;
  className?: string;
}

export default function CardSwap({ items, interval = 3000, className = "" }: CardSwapProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  // Auto-rotate
  useEffect(() => {
    if (items.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [items.length, interval, next]);

  if (!items.length) return null;

  const card = items[currentIndex];

  const swipeVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      rotate: dir > 0 ? 8 : -8,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      rotate: dir > 0 ? -8 : 8,
      scale: 0.9,
    }),
  };

  return (
    <div className={`relative ${className}`}>
      {/* Stack indicator */}
      <div className="absolute -top-1 left-0 right-0 flex justify-center gap-1 z-10">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-6 bg-mint" : "w-1.5 bg-[#D9CCB8] hover:bg-mint/40"
            }`}
          />
        ))}
      </div>

      {/* Card stack visual */}
      <div className="relative pt-6" style={{ minHeight: "380px" }}>
        {/* Background stacked cards (decorative) */}
        {items.slice(0, 3).map((_, i) => (
          <div
            key={`bg-${i}`}
            className="absolute top-8 left-2 right-2 rounded-xl bg-[#D9CCB8]/10"
            style={{
              height: "calc(100% - 40px)",
              transform: `translateY(${i * 4}px) scale(${1 - i * 0.03})`,
              zIndex: 0,
            }}
          />
        ))}

        {/* Active card */}
        <div className="relative z-10" style={{ minHeight: "360px" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={swipeVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
              className="card overflow-hidden cursor-pointer"
              onClick={() => {
                if (card.link) window.open(card.link, "_blank");
              }}
            >
              {/* Image */}
              <div className="w-full aspect-[16/10] bg-[#D9CCB8]/20 overflow-hidden">
                {card.image ? (
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-secondary/25 text-sm">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📱</div>
                      <span className="tracking-widest">截图待补充</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Text */}
              <div className="p-4 md:p-5">
                <h4 className="text-base font-medium text-ink tracking-wide">
                  {card.title}
                </h4>
                {card.subtitle && (
                  <p className="text-xs text-ink-secondary mt-1 tracking-wide">
                    {card.subtitle}
                  </p>
                )}
                {card.link && (
                  <span className="inline-flex items-center gap-1 text-xs text-mint mt-3 group">
                    <span>查看详情</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Manual nav arrows */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); goTo((currentIndex - 1 + items.length) % items.length); }}
            className="w-8 h-8 rounded-full bg-white/80 border border-[#D9CCB8] flex items-center justify-center text-ink-secondary hover:bg-mint hover:text-white hover:border-mint transition-all text-sm"
          >
            ←
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="w-8 h-8 rounded-full bg-white/80 border border-[#D9CCB8] flex items-center justify-center text-ink-secondary hover:bg-mint hover:text-white hover:border-mint transition-all text-sm"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
