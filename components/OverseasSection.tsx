"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "./ImageLightbox";

const accounts = [
  { id: 1, title: "菲鹿儿 TikTok 官号", subtitle: "百万级矩阵 · 85.7万+播放", image: "/images/accounts/overseas-account-1.png" },
  { id: 2, title: "海外社媒账号 2", subtitle: "TikTok矩阵运营", image: "/images/accounts/overseas-account-2.png" },
  { id: 3, title: "海外社媒账号 3", subtitle: "Instagram + TikTok", image: "/images/accounts/overseas-account-3.png" },
];

const viralCovers = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `爆款 ${i + 1}`,
  image: `/images/viral-covers/cover-${i + 1}.png`,
  videoLink: "",
}));

const achievements = [
  { label: "总播放", value: "85.7万+" },
  { label: "百万爆款", value: "15支" },
  { label: "最高CVR", value: "28.6%" },
  { label: "投放ROI", value: "3.6" },
];

export default function OverseasSection() {
  const [currentCard, setCurrentCard] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const nextCard = useCallback(() => {
    setCurrentCard((prev) => (prev + 1) % accounts.length);
  }, []);

  const prevCard = useCallback(() => {
    setCurrentCard((prev) => (prev - 1 + accounts.length) % accounts.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(nextCard, 3000);
    return () => clearInterval(timer);
  }, [nextCard]);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  return (
    <section id="overseas" className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F0E8]/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-mint/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <span className="text-xs tracking-widest text-mint bg-mint/10 px-3 py-1 rounded-full inline-block mb-3">
            海外运营
          </span>
          <h2 className="section-title">海外社媒运营</h2>
          <p className="section-subtitle mt-2">
            菲鹿儿 · TikTok百万级矩阵操盘 · 跨国内容运营实战
          </p>
        </motion.div>

        {/* === Card Swap with left annotations === */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 mb-14">
          {/* Left: Annotations + Achievements */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="md:col-span-2 flex flex-col justify-center space-y-5"
          >
            <div>
              <h3 className="text-base font-medium text-ink tracking-wide mb-2">
                {accounts[currentCard].title}
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {accounts[currentCard].subtitle}
              </p>
            </div>

            {/* Achievement mini stats */}
            <div className="grid grid-cols-2 gap-2">
              {achievements.map((a) => (
                <div key={a.label} className="bg-[#ECE3D5]/60 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-mint" style={{ fontFamily: "var(--font-display)" }}>
                    {a.value}
                  </div>
                  <div className="text-[10px] text-ink-secondary tracking-widest mt-0.5">{a.label}</div>
                </div>
              ))}
            </div>

            {/* Nav buttons */}
            <div className="flex gap-2">
              <button onClick={prevCard} className="w-10 h-10 rounded-full border border-mint/30 flex items-center justify-center text-mint hover:bg-mint hover:text-white transition-all text-sm">←</button>
              <button onClick={nextCard} className="w-10 h-10 rounded-full border border-mint/30 flex items-center justify-center text-mint hover:bg-mint hover:text-white transition-all text-sm">→</button>
              <span className="text-[10px] text-ink-secondary/50 self-center ml-2 tracking-wider">
                {currentCard + 1} / {accounts.length}
              </span>
            </div>
          </motion.div>

          {/* Right: Card Swap */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="md:col-span-3 relative"
            style={{ minHeight: "340px" }}
          >
            {/* Stack shadow cards */}
            {[0, 1].map((offset) => (
              <div
                key={`shadow-${offset}`}
                className="absolute top-0 left-2 right-2 rounded-xl bg-[#D9CCB8]/8"
                style={{
                  height: "calc(100% - 20px)",
                  transform: `translateY(${(offset + 1) * 6}px) scale(${1 - (offset + 1) * 0.03})`,
                  zIndex: 0,
                }}
              />
            ))}

            {/* Active card */}
            {accounts.map((card, i) => (
              <motion.div
                key={card.id}
                initial={false}
                animate={{
                  opacity: i === currentCard ? 1 : 0,
                  x: i === currentCard ? 0 : i > currentCard || (currentCard === accounts.length - 1 && i === 0) ? 40 : -40,
                  scale: i === currentCard ? 1 : 0.95,
                  zIndex: i === currentCard ? 10 : 0,
                  pointerEvents: i === currentCard ? "auto" : "none",
                }}
                transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 card overflow-hidden cursor-pointer"
                onClick={() => openLightbox(card.image, card.title)}
              >
                <div className="w-full aspect-[16/10] bg-[#D9CCB8]/20 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-ink tracking-wide">{card.title}</h4>
                  <p className="text-xs text-ink-secondary mt-1">{card.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* === Horizontal auto-scrolling viral covers (12) === */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
            <span>🔥</span> 海外爆款作品（12个）
            <span className="text-[10px] text-ink-secondary font-normal ml-auto">自动滚动 · 悬停暂停</span>
          </h3>

          {/* Horizontal scroll container */}
          <div className="relative overflow-hidden group/scroll">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F5F0E8]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F5F0E8]/80 to-transparent z-10 pointer-events-none" />

            <div className="flex gap-3 animate-scroll-horizontal group-hover/scroll:[animation-play-state:paused]">
              {/* Double the items for seamless loop */}
              {[...viralCovers, ...viralCovers].map((cover, i) => (
                <div
                  key={`${cover.id}-${i}`}
                  onClick={() => openLightbox(cover.image, cover.title)}
                  className="flex-shrink-0 w-[140px] md:w-[180px] card cursor-pointer group/card"
                >
                  <div className="aspect-[9/16] bg-[#D9CCB8]/15 rounded-t-xl overflow-hidden">
                    <img
                      src={cover.image}
                      alt={cover.title}
                      className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-400"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-medium text-ink tracking-wide truncate">{cover.title}</h4>
                    {cover.videoLink ? (
                      <a href={cover.videoLink} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] mint-link mt-1 inline-block"
                        onClick={(e) => e.stopPropagation()}>
                        ▶ 观看 →
                      </a>
                    ) : (
                      <span className="text-[10px] text-ink-secondary/30 mt-1 block">链接待补充</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-ink-secondary/50 tracking-wide">
            📌 素材来源：菲鹿儿海外TikTok矩阵账号
          </p>
        </motion.div>
      </div>

      {/* Scroll animation keyframes */}
      <style jsx>{`
        @keyframes scrollHorizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-horizontal {
          animation: scrollHorizontal 40s linear infinite;
        }
      `}</style>

      <ImageLightbox src={lightboxSrc} alt={lightboxAlt} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
