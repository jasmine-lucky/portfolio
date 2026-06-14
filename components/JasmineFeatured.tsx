"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "./ImageLightbox";

const stats = [
  { value: "540万+", label: "总曝光" },
  { value: "5,959", label: "粉丝" },
  { value: "19.9万", label: "获赞与收藏" },
  { value: "16+篇", label: "爆款笔记" },
];

const coverSlots = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: `爆款封面 ${i + 1}`,
  image: `/images/accounts/jasmine-${Math.min(i + 1, 3)}.png`,
  link: "",
}));

export default function JasmineFeatured() {
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = (src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
    setLightboxOpen(true);
  };

  return (
    <section id="jasmine" className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F0E8]/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-mint/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
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

        {/* Stats dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
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
        </motion.div>

        {/* === Full-width viral covers row (6 slots) === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
            <span>🎬</span> 爆款作品封面
            <span className="text-[10px] text-ink-secondary font-normal ml-auto">
              点击查看大图
            </span>
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {coverSlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => openLightbox(slot.image, slot.title)}
                className="card cursor-pointer group aspect-[3/4] bg-[#D9CCB8]/15 rounded-xl overflow-hidden flex items-center justify-center hover:border-mint/50 transition-all"
              >
                <img
                  src={slot.image}
                  alt={slot.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-400"
                />
              </div>
            ))}
          </div>
          <p className="text-[10px] text-ink-secondary/50 text-center mt-3 tracking-wide">
            ▲ 请替换为Jasmine账号最优质的6条爆款笔记封面
          </p>
        </motion.div>

        {/* Content strategy + Video side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.45 }}
            className="card p-5 md:p-6"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.45 }}
            className="card p-4 md:p-6"
          >
            <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
              <span>📺</span> 账号视频
            </h3>
            <div className="relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden">
              <video
                controls
                playsInline
                className="w-full h-full object-contain"
                poster="/images/accounts/jasmine-1.png"
              >
                <source src="/videos/jasmine-showcase.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>

        {/* Bottom quote */}
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

      <ImageLightbox
        src={lightboxSrc}
        alt={lightboxAlt}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
