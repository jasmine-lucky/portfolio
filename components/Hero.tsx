"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollToAccounts = () => {
    const el = document.querySelector("#accounts");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Left accent line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-8 md:left-16 top-1/3 w-[2px] h-[120px] bg-mint origin-top hidden md:block"
      />

      <div className="max-w-4xl mx-auto px-6 md:px-16 w-full">
        {/* Background decorative text */}
        <div
          className="absolute right-8 md:right-16 top-1/4 text-[10rem] md:text-[16rem] font-bold text-[#D9CCB8]/15 select-none pointer-events-none leading-none"
          style={{ fontFamily: "var(--font-display)" }}
        >
          W
        </div>

        <div className="relative z-10">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl tracking-widest text-ink mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            温 梓 清
          </motion.h1>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <p
              className="text-xl md:text-3xl text-ink leading-relaxed tracking-wide"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              我做了540万次曝光，
            </p>
            <p
              className="text-xl md:text-3xl text-mint leading-relaxed tracking-wide mt-1"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              现在想用AI把它变成5400万
            </p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-base text-ink-secondary tracking-widest mb-10"
          >
            内容运营人 · 2026届应届生
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={scrollToAccounts}
              className="px-8 py-3 bg-mint text-white rounded-full text-sm tracking-widest hover:bg-mint-dark transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-mint/20"
            >
              查看我的作品 ↓
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-3 border border-mint text-mint rounded-full text-sm tracking-widest hover:bg-mint hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              直接联系 →
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-ink-secondary tracking-widest">
          向下滚动
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-mint/60"
        />
      </motion.div>
    </section>
  );
}
