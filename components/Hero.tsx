"use client";

import { motion } from "framer-motion";

// Tags with depth: negative z = behind person, positive z = in front
const tagsBehind = [
  { text: "5G冲浪高手 🏄", angle: -55, distance: 145, delay: 0.5 },
  { text: "AI工具收藏家 🤖", angle: 70, distance: 150, delay: 0.65 },
  { text: "从0到1专业户 🚀", angle: 195, distance: 140, delay: 0.8 },
];

const tagsFront = [
  { text: "毕业即拥有1年工作经验 🎓", angle: -25, distance: 148, delay: 0.55 },
  { text: "数据复盘狂魔 📊", angle: 35, distance: 155, delay: 0.7 },
  { text: "爆款制造机 💥", angle: 110, distance: 142, delay: 0.85 },
  { text: "小红书起号小能手 📱", angle: 235, distance: 150, delay: 1.0 },
];

function getTagPosition(angle: number, distance: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * distance, y: Math.sin(rad) * distance };
}

export default function Hero() {
  const scrollToAccounts = () => {
    const el = document.querySelector("#jasmine");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-24 md:py-0">
      {/* Background W letter */}
      <div
        className="absolute right-8 md:right-16 top-1/4 text-[10rem] md:text-[16rem] font-bold text-[#D9CCB8]/10 select-none pointer-events-none leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        W
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Photo + Tags orbit with depth */}
        <div className="relative inline-flex items-center justify-center mb-10 md:mb-14">
          {/* Behind layer — rendered first, lower z-index */}
          {tagsBehind.map((tag) => {
            const { x, y } = getTagPosition(tag.angle, tag.distance);
            return (
              <motion.div
                key={tag.text}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                transition={{
                  delay: tag.delay,
                  duration: 0.55,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0"
                style={{ filter: "brightness(0.85) blur(0.5px)" }}
              >
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-[#EDE4D6] border border-[#D9CCB8]/40 rounded-full text-[10px] md:text-xs text-ink-secondary/80 shadow-sm hover:shadow-md hover:border-mint/40 hover:-translate-y-0.5 transition-all duration-300 cursor-default tracking-wide">
                  {tag.text}
                </span>
              </motion.div>
            );
          })}

          {/* Central photo — middle z-index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10"
          >
            {/* Soft shadow behind person */}
            <div className="absolute -inset-4 rounded-full bg-mint/5 blur-2xl" />
            <div className="w-36 h-36 md:w-48 md:h-48 relative">
              <img
                src="/images/photo.png"
                alt="温梓清"
                className="w-full h-full object-contain"
                style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.12))" }}
              />
            </div>
            {/* Ring accent */}
            <div className="absolute inset-0 rounded-full ring-2 ring-mint/15 ring-offset-6 ring-offset-transparent pointer-events-none" />
          </motion.div>

          {/* Front layer — rendered last, higher z-index */}
          {tagsFront.map((tag) => {
            const { x, y } = getTagPosition(tag.angle, tag.distance);
            return (
              <motion.div
                key={tag.text}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ opacity: 1, scale: 1, x, y }}
                transition={{
                  delay: tag.delay,
                  duration: 0.55,
                  type: "spring",
                  stiffness: 200,
                  damping: 13,
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-20"
              >
                <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-[#F5F0E8] border border-mint/25 rounded-full text-[10px] md:text-xs text-ink shadow-md hover:shadow-lg hover:border-mint/60 hover:-translate-y-1 transition-all duration-300 cursor-default tracking-wide">
                  {tag.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Name + Tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-4xl md:text-6xl tracking-widest text-ink mb-6"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          温 梓 清
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="mb-5"
        >
          <p
            className="text-lg md:text-2xl text-ink leading-relaxed tracking-wide"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            我做了540万次曝光，
          </p>
          <p
            className="text-lg md:text-2xl text-mint leading-relaxed tracking-wide mt-1"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            现在想用AI把它变成5400万
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          className="text-sm text-ink-secondary tracking-widest mb-8"
        >
          内容运营人 · 2026届应届生
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={scrollToAccounts}
            className="px-8 py-3 bg-mint text-white rounded-full text-sm tracking-widest hover:bg-mint-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/20"
          >
            查看专栏 ↓
          </button>
          <button
            onClick={scrollToContact}
            className="px-8 py-3 border border-mint text-mint rounded-full text-sm tracking-widest hover:bg-mint hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            直接联系 →
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] md:text-xs text-ink-secondary tracking-widest">向下滚动</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-mint/60"
        />
      </motion.div>
    </section>
  );
}
