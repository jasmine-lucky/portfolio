"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "./ImageLightbox";

const accounts = [
  { id: 1, title: "菲鹿儿 TikTok 官号", subtitle: "百万级矩阵 · 85.7万+播放", image: "/images/accounts/overseas-account-1.png", link: "https://www.tiktok.com/@focallure.beauty" },
  { id: 2, title: "海外社媒账号 2", subtitle: "TikTok矩阵运营", image: "/images/accounts/overseas-account-2.png", link: "https://www.tiktok.com/@focallure_makeup" },
  { id: 3, title: "海外社媒账号 3", subtitle: "Instagram + TikTok", image: "/images/accounts/overseas-account-3.png", link: "https://www.tiktok.com/@focallure_lips.com" },
];

const viralCovers = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `爆款 ${i + 1}`,
  image: `/images/viral-covers/cover-${i + 1}.png`,
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

  const nextCard = useCallback(() => setCurrentCard((prev) => (prev + 1) % accounts.length), []);
  const prevCard = useCallback(() => setCurrentCard((prev) => (prev - 1 + accounts.length) % accounts.length), []);

  useEffect(() => {
    const timer = setInterval(nextCard, 3500);
    return () => clearInterval(timer);
  }, [nextCard]);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src); setLightboxAlt(alt); setLightboxOpen(true);
  };

  return (
    <section id="overseas" className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F0E8]/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-mint/30 to-transparent" />
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <span className="text-xs tracking-widest text-mint bg-mint/10 px-3 py-1 rounded-full inline-block mb-3">海外运营</span>
          <h2 className="section-title">海外社媒运营</h2>
          <p className="section-subtitle mt-2">菲鹿儿 · TikTok百万级矩阵操盘 · 跨国内容运营实战</p>
        </motion.div>

        {/* Card Swap Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 mb-14">
          {/* Left: Annotations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55 }}
            className="md:col-span-2 flex flex-col justify-center space-y-5"
          >
            <div>
              <h3 className="text-base font-medium text-ink tracking-wide mb-2">{accounts[currentCard].title}</h3>
              <p className="text-sm text-ink-secondary leading-relaxed">{accounts[currentCard].subtitle}</p>
              <a
                href={accounts[currentCard].link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs mint-link mt-2"
              >
                <span>🔗 访问主页</span><span>→</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {achievements.map((a) => (
                <div key={a.label} className="bg-[#ECE3D5]/60 rounded-lg p-3 text-center">
                  <div className="text-lg font-bold text-mint" style={{ fontFamily: "var(--font-display)" }}>{a.value}</div>
                  <div className="text-[10px] text-ink-secondary tracking-widest mt-0.5">{a.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={prevCard} className="w-9 h-9 rounded-full border border-mint/40 flex items-center justify-center text-mint hover:bg-mint hover:text-white transition-all text-sm">←</button>
              <button onClick={nextCard} className="w-9 h-9 rounded-full border border-mint/40 flex items-center justify-center text-mint hover:bg-mint hover:text-white transition-all text-sm">→</button>
              <span className="text-[10px] text-ink-secondary/50 self-center ml-2">{currentCard + 1} / {accounts.length}</span>
            </div>
          </motion.div>

          {/* Right: Card Swap — images shown full with object-contain */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="md:col-span-3 relative"
            style={{ minHeight: "420px" }}
          >
            {[0, 1].map((offset) => (
              <div key={`s-${offset}`}
                className="absolute top-0 left-2 right-2 rounded-xl bg-[#D9CCB8]/8"
                style={{ height: "calc(100% - 24px)", transform: `translateY(${(offset+1)*6}px) scale(${1-(offset+1)*0.03})`, zIndex: 0 }}
              />
            ))}
            {accounts.map((card, i) => {
              const isActive = i === currentCard;
              const prevIdx = (currentCard - 1 + accounts.length) % accounts.length;
              const nextIdx = (currentCard + 1) % accounts.length;
              let exitDir = 0;
              if (!isActive && i === prevIdx) exitDir = -1;
              if (!isActive && i === nextIdx) exitDir = 1;

              return (
                <motion.div
                  key={card.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    x: isActive ? 0 : exitDir * 50,
                    scale: isActive ? 1 : 0.93,
                    zIndex: isActive ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0 card overflow-hidden cursor-pointer"
                  onClick={() => window.open(card.link, "_blank")}
                >
                  <div className="w-full aspect-[4/3] bg-[#ECE3D5]/50 flex items-center justify-center overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-ink tracking-wide">{card.title}</h4>
                    <p className="text-xs text-ink-secondary mt-1">{card.subtitle}</p>
                    <span className="inline-flex items-center gap-1 text-[10px] text-mint mt-2">
                      <span>🔗 访问主页</span><span>→</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* 12 Viral covers — horizontal auto-scroll */}
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
          <div className="relative overflow-hidden group/scroll">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F5F0E8]/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F5F0E8]/80 to-transparent z-10 pointer-events-none" />
            <div className="flex gap-3 animate-scroll-horizontal group-hover/scroll:[animation-play-state:paused]">
              {[...viralCovers, ...viralCovers].map((cover, i) => (
                <div key={`${cover.id}-${i}`}
                  onClick={() => openLightbox(cover.image, cover.title)}
                  className="flex-shrink-0 w-[140px] md:w-[180px] card cursor-pointer group/card"
                >
                  <div className="aspect-[9/16] bg-[#D9CCB8]/15 rounded-t-xl overflow-hidden">
                    <img src={cover.image} alt={cover.title} className="w-full h-full object-cover group-hover/card:scale-[1.03] transition-transform duration-400" />
                  </div>
                  <div className="p-3">
                    <h4 className="text-xs font-medium text-ink tracking-wide">{cover.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }} className="mt-8 text-center">
          <p className="text-xs text-ink-secondary/50 tracking-wide">📌 素材来源：菲鹿儿海外TikTok矩阵账号</p>
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes scrollHorizontal { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-scroll-horizontal { animation: scrollHorizontal 40s linear infinite; }
      `}</style>
      <ImageLightbox src={lightboxSrc} alt={lightboxAlt} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
