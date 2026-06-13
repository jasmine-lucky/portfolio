"use client";

import { motion } from "framer-motion";

const creativeWorks = [
  { title: "海报设计 1", image: "/images/creative/poster-1.png", category: "海报" },
  { title: "海报设计 2", image: "/images/creative/poster-2.png", category: "海报" },
  { title: "红包封面设计 1", image: "/images/creative/hongbao-1.png", category: "品牌" },
  { title: "红包封面设计 2", image: "/images/creative/hongbao-2.png", category: "品牌" },
  { title: "文创设计 1", image: "/images/creative/culture-1.png", category: "文创" },
  { title: "文创设计 2", image: "/images/creative/culture-2.png", category: "文创" },
  { title: "泡面包装设计 1", image: "/images/creative/noodle-1.png", category: "包装" },
  { title: "泡面包装设计 2", image: "/images/creative/noodle-2.png", category: "包装" },
  { title: "日昼时钟设计 1", image: "/images/creative/clock-1.png", category: "产品" },
  { title: "日昼时钟设计 2", image: "/images/creative/clock-2.png", category: "产品" },
  { title: "公众号设计", image: "/images/creative/gongzhonghao.png", category: "品牌" },
];

export default function CreativeWall() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F0E8]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <h2 className="section-title mb-3">运营人的审美修养</h2>
          <p className="section-subtitle">
            会看数据，也会做设计 — 审美判断力是内容运营的隐形竞争力
          </p>
        </motion.div>

        {/* Masonry-like grid */}
        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {creativeWorks.map((work, i) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: (i % 6) * 0.08,
                duration: 0.45,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="break-inside-avoid mb-4 md:mb-6 group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl bg-[#D9CCB8]/20">
                {/* Image */}
                <div className="w-full min-h-[120px] flex items-center justify-center bg-[#D9CCB8]/15 group-hover:bg-[#D9CCB8]/25 transition-colors duration-300">
                  {work.image ? (
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-ink-secondary/20 text-xs tracking-widest py-16">
                      {work.category}
                    </span>
                  )}
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <p className="text-white text-sm font-medium tracking-wide">
                      {work.title}
                    </p>
                    <p className="text-white/60 text-xs mt-0.5">
                      {work.category}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
