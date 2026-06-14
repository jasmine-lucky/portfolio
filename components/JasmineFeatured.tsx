"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "./ImageLightbox";

const stats = [
  { value: "550w+", label: "总曝光" },
  { value: "全网1w", label: "粉丝" },
  { value: "20w+", label: "获赞与收藏" },
  { value: "16+篇", label: "爆款笔记" },
];

const coverImages = Array.from({ length: 6 }, (_, i) => ({
  src: `/images/accounts/jasmine-cover-${i + 1}.png`,
  title: `爆款封面 ${i + 1}`,
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10"
        >
          <span className="text-xs tracking-widest text-mint bg-mint/10 px-3 py-1 rounded-full inline-block mb-3">
            专栏 · 深度解析
          </span>
          <h2 className="section-title">Jasmine清清</h2>
          <p className="section-subtitle mt-2">
            小红书时尚区 · 从0到全网1w粉丝 · 用内容力验证「素人0成本起号」可行性
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="card p-4 md:p-5 text-center">
              <div className="text-2xl md:text-3xl font-bold text-mint mb-1 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs text-ink-secondary tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Full-width viral covers row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
            <span>🎬</span> 爆款作品封面
            <span className="text-[10px] text-ink-secondary font-normal ml-auto">点击查看大图</span>
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
            {coverImages.map((cover, i) => (
              <motion.div
                key={cover.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.45 }}
                onClick={() => openLightbox(cover.src, cover.title)}
                className="card cursor-pointer group aspect-[3/4] bg-[#D9CCB8]/15 rounded-xl overflow-hidden hover:border-mint/50 transition-all"
              >
                <img
                  src={cover.src}
                  alt={cover.title}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-400"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content strategy + Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="card p-5 md:p-6"
          >
            <h3 className="text-sm font-medium text-ink tracking-wide mb-3">🎯 内容定位 &amp; 赛道选择</h3>
            <p className="text-sm text-ink-secondary leading-relaxed mb-3">
              主打「菱形脸 + 短发」的发型与拍照技巧，核心解决高颧骨、头型不流畅、上镜显脸大等痛点。
            </p>
            <div className="bg-[#ECE3D5]/50 rounded-lg p-4 space-y-2 mb-3">
              <p className="text-xs text-ink-secondary leading-relaxed">
                <span className="font-medium text-ink">📊 为什么选这个赛道？</span><br />
                通过千瓜数据对时尚区头部博主进行系统性分析后发现：发型教程领域的内容供给远低于穿搭和美妆，
                竞争尚未饱和，存在明显的流量洼地。结合AI工具（ChatGPT）抓取小红书当下热点话题与用户高频搜索词，
                验证了「菱形脸发型改造」这一细分方向具有高搜索量+低竞争度的蓝海特征，于是精准切入。
              </p>
            </div>
            <div className="bg-[#ECE3D5]/50 rounded-lg p-4">
              <p className="text-xs text-ink-secondary leading-relaxed">
                <span className="font-medium text-ink">🤖 AI在创作中的角色</span><br />
                用ChatGPT分析同类爆款笔记的高频关键词与情感节奏，辅助优化标题和开头钩子；
                用AI拆解热门话题标签的关联图谱，发现「山羊角自救」「菱形脸短发」等长尾关键词，
                将其融入内容矩阵，使选题精准度与爆款率显著提升。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {["菱形脸", "发型教程", "原相机", "数据选赛道", "AI辅助选题"].map((tag) => (
                <span key={tag} className="mint-tag">{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="card p-4 md:p-6"
          >
            <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
              <span>📺</span> 账号视频
            </h3>
            <div className="relative w-full aspect-[16/9] bg-black rounded-lg overflow-hidden">
              <video controls playsInline className="w-full h-full object-contain" poster="/images/accounts/jasmine-1.png">
                <source src="/videos/jasmine-showcase.mp4" type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>

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

      <ImageLightbox src={lightboxSrc} alt={lightboxAlt} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </section>
  );
}
