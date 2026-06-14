"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "./ImageLightbox";

const stats = [
  { value: "540万+", label: "总曝光" },
  { value: "5,959", label: "粉丝" },
  { value: "19.9万", label: "获赞与收藏" },
  { value: "16+篇", label: "爆款笔记" },
];

// Placeholder covers — user to replace with real video cover screenshots
const videoCovers = [
  { src: "/images/accounts/jasmine-1.png", title: "发型改造教程" },
  { src: "/images/accounts/jasmine-2.png", title: "菱形脸穿搭" },
  { src: "/images/accounts/jasmine-3.png", title: "短发造型" },
];

export default function JasmineFeatured() {
  const [currentCover, setCurrentCover] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextCover = useCallback(() => {
    setCurrentCover((prev) => (prev + 1) % videoCovers.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextCover, 3500);
    return () => clearInterval(interval);
  }, [nextCover]);

  return (
    <section id="jasmine" className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F0E8]/50 relative overflow-hidden">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-mint/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs tracking-widest text-mint bg-mint/10 px-3 py-1 rounded-full">
              专栏 · 深度解析
            </span>
          </div>
          <h2 className="section-title">Jasmine清清</h2>
          <p className="section-subtitle mt-2">
            小红书时尚区 · 从0到5959粉丝 · 用内容力验证「素人0成本起号」可行性
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Left: Stats dashboard + Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="card p-4 md:p-5 text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold text-mint mb-1 tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] md:text-xs text-ink-secondary tracking-widest">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Content strategy */}
            <div className="card p-5 md:p-6">
              <h3 className="text-sm font-medium text-ink tracking-wide mb-3">
                🎯 内容定位
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                主打「菱形脸 + 短发」的发型与拍照技巧，核心解决高颧骨、头型不流畅、上镜显脸大等痛点。
                面向18-28岁学生与职场新人，用原相机真实教程建立信任，差异化于精修棚拍类时尚内容。
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["菱形脸", "发型教程", "原相机", "真实感"].map((tag) => (
                  <span key={tag} className="mint-tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Video cover carousel + Video embed */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="lg:col-span-3 space-y-5"
          >
            {/* Cover carousel */}
            <div className="card p-4 md:p-6">
              <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
                <span>🎬</span> 精选内容轮播
                <span className="text-[10px] text-ink-secondary font-normal ml-auto">
                  点击查看大图
                </span>
              </h3>
              <div
                className="relative w-full aspect-[16/9] bg-[#D9CCB8]/20 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setLightboxOpen(true)}
              >
                {videoCovers.map((cover, i) => (
                  <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-600 ${
                      i === currentCover ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={cover.src}
                      alt={cover.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {/* Overlay info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark/70 to-transparent p-4">
                  <p className="text-white text-sm tracking-wide">
                    {videoCovers[currentCover].title}
                  </p>
                </div>
                {/* Dots */}
                <div className="absolute top-3 right-3 flex gap-1.5">
                  {videoCovers.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setCurrentCover(i); }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentCover ? "bg-mint w-5" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Video embed placeholder */}
            <div className="card p-4 md:p-6">
              <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
                <span>📺</span> 账号视频
              </h3>
              <div className="relative w-full aspect-[16/9] bg-[#D9CCB8]/20 rounded-lg flex items-center justify-center overflow-hidden">
                {/* Placeholder — replace with actual video embed */}
                <div className="text-center">
                  <div className="text-4xl mb-3">🎥</div>
                  <p className="text-sm text-ink-secondary tracking-wider">
                    视频素材待补充
                  </p>
                  <p className="text-xs text-ink-secondary/50 mt-1">
                    请将视频文件放入 public/videos/ 文件夹
                  </p>
                </div>
                {/* Uncomment when video is ready:
                <video
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  poster="/images/accounts/jasmine-1.png"
                >
                  <source src="/videos/jasmine-showcase.mp4" type="video/mp4" />
                </video>
                */}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom insight quote */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="inline-block card px-6 py-4">
            <p className="text-sm text-ink-secondary italic tracking-wide">
              &ldquo;素人0成本起号，靠的不是运气，是每一篇笔记背后对用户痛点的精准洞察。&rdquo;
            </p>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <ImageLightbox
        src={videoCovers[currentCover].src}
        alt={videoCovers[currentCover].title}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
