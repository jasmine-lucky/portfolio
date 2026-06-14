"use client";

import { motion } from "framer-motion";

const tagsBehind = [
  { text: "5G冲浪高手 🏄", angle: -50, distance: 160, delay: 0.5 },
  { text: "AI工具收藏家 🤖", angle: 75, distance: 165, delay: 0.65 },
  { text: "从0到1专业户 🚀", angle: 200, distance: 155, delay: 0.8 },
];

const tagsFront = [
  { text: "毕业即拥有1年工作经验 🎓", angle: -20, distance: 162, delay: 0.55 },
  { text: "数据复盘狂魔 📊", angle: 40, distance: 170, delay: 0.7 },
  { text: "爆款制造机 💥", angle: 120, distance: 158, delay: 0.85 },
  { text: "小红书起号小能手 📱", angle: 240, distance: 165, delay: 1.0 },
];

function getTagPosition(angle: number, distance: number) {
  const rad = (angle * Math.PI) / 180;
  return { x: Math.cos(rad) * distance, y: Math.sin(rad) * distance };
}

export default function Hero() {
  const scrollToJasmine = () => {
    const el = document.querySelector("#jasmine");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden py-16 md:py-0">
      {/* Background W */}
      <div
        className="absolute right-0 top-1/4 text-[12rem] md:text-[18rem] font-bold text-[#D9CCB8]/8 select-none pointer-events-none leading-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        W
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

          {/* === LEFT: Text content === */}
          <div className="md:w-1/2 text-center md:text-left relative z-10">
            {/* Accent line */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="hidden md:block absolute -left-5 top-0 w-[2px] h-[80px] bg-mint origin-top"
            />

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.65 }}
              className="text-4xl md:text-6xl tracking-widest text-ink mb-5"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              温 梓 清
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.55 }}
              className="mb-4"
            >
              <p
                className="text-lg md:text-xl text-ink leading-relaxed tracking-wide"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                我做了550w+次曝光，
              </p>
              <p
                className="text-lg md:text-xl text-mint leading-relaxed tracking-wide mt-0.5"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                现在想用AI把它变成5500w
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              className="text-sm text-ink-secondary tracking-widest mb-7"
            >
              内容运营人 · 2026届应届生
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="flex flex-wrap gap-3 justify-center md:justify-start"
            >
              <button
                onClick={scrollToJasmine}
                className="px-7 py-3 bg-mint text-white rounded-full text-sm tracking-widest hover:bg-mint-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/20"
              >
                查看专栏 ↓
              </button>
              <button
                onClick={scrollToContact}
                className="px-7 py-3 border border-mint text-mint rounded-full text-sm tracking-widest hover:bg-mint hover:text-white transition-all duration-300 hover:-translate-y-0.5"
              >
                直接联系 →
              </button>
            </motion.div>
          </div>

          {/* === RIGHT: Large photo + orbiting tags === */}
          <div className="md:w-1/2 relative flex items-center justify-end md:pr-6">
            <div className="relative w-[320px] h-[320px] md:w-[440px] md:h-[440px] flex items-center justify-center">
              {/* Behind layer */}
              {tagsBehind.map((tag) => {
                const { x, y } = getTagPosition(tag.angle, tag.distance);
                return (
                  <motion.div
                    key={tag.text}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    transition={{ delay: tag.delay, duration: 0.5, type: "spring", stiffness: 160, damping: 13 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 animate-tag-float"
                    style={{
                      filter: "brightness(0.8) blur(0.8px)",
                      animationDelay: `${tag.delay + 0.3}s`,
                      animationDuration: `${3.5 + Math.random() * 2}s`,
                    }}
                  >
                    <span className="inline-block px-3 py-1.5 bg-[#EDE4D6] border border-[#D9CCB8]/30 rounded-full text-[10px] md:text-xs text-ink-secondary/70 shadow-sm hover:shadow-md hover:border-mint/30 transition-all duration-300 cursor-default tracking-wide">
                      {tag.text}
                    </span>
                  </motion.div>
                );
              })}

              {/* Photo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative z-10"
              >
                <div className="absolute -inset-8 rounded-full bg-mint/5 blur-3xl" />
                <div className="w-60 h-60 md:w-80 md:h-80 relative ml-4 md:ml-8">
                  <img
                    src="/images/photo.png"
                    alt="温梓清"
                    className="w-full h-full object-contain"
                    style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.12))" }}
                  />
                </div>
              </motion.div>

              {/* Front layer */}
              {tagsFront.map((tag) => {
                const { x, y } = getTagPosition(tag.angle, tag.distance);
                return (
                  <motion.div
                    key={tag.text}
                    initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    transition={{ delay: tag.delay, duration: 0.5, type: "spring", stiffness: 190, damping: 12 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-20 animate-tag-float"
                    style={{
                      animationDelay: `${tag.delay + 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  >
                    <span className="inline-block px-3 py-1.5 bg-[#F5F0E8] border border-mint/25 rounded-full text-[10px] md:text-xs text-ink shadow-md hover:shadow-lg hover:border-mint/60 transition-all duration-300 cursor-default tracking-wide">
                      {tag.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
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
