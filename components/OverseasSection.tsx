"use client";

import { motion } from "framer-motion";
import CardSwap from "./CardSwap";

const overseasCards = [
  {
    id: 1,
    image: "",
    title: "TikTok官号矩阵 · 菲鹿儿",
    subtitle: "百万级账号定位 · 85.7万+总播放",
  },
  {
    id: 2,
    image: "",
    title: "爆款短视频 · 15支百万播放",
    subtitle: "CVR 28.6% · CTR 4.99% · ROI 3.6",
  },
  {
    id: 3,
    image: "",
    title: "单视频GMV 156→1470元",
    subtitle: "爆款复制闭环 · 投放ROI 2.8",
  },
  {
    id: 4,
    image: "",
    title: "150+篇产品脚本产出",
    subtitle: "编导-模特-剪辑高效协作模式",
  },
  {
    id: 5,
    image: "",
    title: "人效提升50% · 日产2→3条",
    subtitle: "爆款脚本溯源库 · 素材模块化沉淀",
  },
  {
    id: 6,
    image: "",
    title: "海外社媒内容运营全流程",
    subtitle: "TikTok · Instagram · 东南亚市场",
  },
];

const viralSlots = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: `海外爆款 ${i + 1}`,
  desc: "待补充描述",
  image: "",
  videoLink: "",
}));

export default function OverseasSection() {
  return (
    <section id="overseas" className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F0E8]/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-mint/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs tracking-widest text-mint bg-mint/10 px-3 py-1 rounded-full">
              海外运营
            </span>
          </div>
          <h2 className="section-title">海外社媒运营</h2>
          <p className="section-subtitle mt-2">
            菲鹿儿 · TikTok百万级矩阵操盘 · 跨国内容运营实战
          </p>
        </motion.div>

        {/* Card Swap auto-rotating showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-14"
        >
          <CardSwap
            items={overseasCards}
            interval={3500}
            className="max-w-md mx-auto"
          />
          <p className="text-[10px] text-ink-secondary/50 text-center mt-4 tracking-wide">
            📌 请将海外账号截图放入对应卡片的 image 字段
          </p>
        </motion.div>

        {/* 6 Viral post slots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-sm font-medium text-ink tracking-wide mb-4 flex items-center gap-2">
            <span>🔥</span> 海外爆款作品
            <span className="text-[10px] text-ink-secondary font-normal ml-auto">
              待补充封面 + 视频链接
            </span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {viralSlots.map((slot) => (
              <div key={slot.id} className="card p-4 space-y-3">
                {/* Cover placeholder */}
                <div className="w-full aspect-[9/16] bg-[#D9CCB8]/15 rounded-lg flex items-center justify-center">
                  {slot.image ? (
                    <img
                      src={slot.image}
                      alt={slot.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="text-2xl mb-2">🎬</div>
                      <span className="text-[10px] text-ink-secondary/40 tracking-wide">
                        封面待补充
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-ink tracking-wide">{slot.title}</h4>
                  <p className="text-[11px] text-ink-secondary mt-0.5">{slot.desc}</p>
                </div>
                <div>
                  {slot.videoLink ? (
                    <a href={slot.videoLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs mint-link">
                      <span>▶ 观看视频</span><span>→</span>
                    </a>
                  ) : (
                    <span className="text-[10px] text-ink-secondary/30 tracking-wider">视频链接待补充</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-ink-secondary/50 tracking-wide">
            📌 请将海外账号截图和爆款视频素材放入「作品集网站素材」对应文件夹
          </p>
        </motion.div>
      </div>
    </section>
  );
}
