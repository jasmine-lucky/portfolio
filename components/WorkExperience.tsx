"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "唯品会（中国）有限公司",
    role: "传播运营实习生",
    period: "2025.11 — 2026.03",
    highlights: [
      {
        label: "AI内容生产",
        detail:
          "运用ChatGPT分析近3周小红书热门话题趋势，生成汉服妆造类选题脚本，AI辅助产出文案使单篇笔记平均播放量提升180%",
      },
      {
        label: "数据驱动运营",
        detail:
          "独立运营品牌小红书/抖音账号，累计发布30+条垂类内容，引导到店客户关注账号100+人",
      },
      {
        label: "门店数字化",
        detail:
          "月度完成60+组汉服妆造服务，单组客单价300+元，月度妆造板块营收达1.8万+元，服务好评率100%",
      },
      {
        label: "用户洞察",
        detail:
          "梳理50+人次妆造用户来源及需求偏好，形成用户需求分析报告，反哺AI内容策划方向",
      },
    ],
    aiTags: ["ChatGPT", "AI内容分析", "用户洞察"],
    featured: true,
  },
  {
    company: "广州朗圣药业有限公司",
    role: "内容运营实习生",
    period: "2025.06 — 2025.10",
    highlights: [
      {
        label: "AI辅助起号",
        detail:
          "运用GPT-4生成健康科普类选题与文案，完成品牌账号0→1搭建，首月涨粉400+，账号数据表现超99%同类创作者",
      },
      {
        label: "爆款内容生产",
        detail:
          "通过AI分析热门话题标签，策划健康科普笔记60余篇，AB测试优化后单周账号观看提升313%，粉丝增速提升233%",
      },
      {
        label: "达人AI赋能",
        detail:
          "制作KOC沟通话术模板，独立审核优化40+位达人的脚本文案，运用AI辅助降低2位达人投放成本2000+元",
      },
      {
        label: "ROI优化",
        detail:
          "抖音/B站达人合作视频打造多款爆款，新品传播ROI达1.8+，超行业平均水平",
      },
    ],
    aiTags: ["GPT-4", "AI辅助起号", "KOC管理", "ROI优化"],
    featured: false,
  },
  {
    company: "天津异乡好居网络科技有限公司",
    role: "渠道运营实习生",
    period: "2024.12 — 2025.01",
    highlights: [
      {
        label: "AI选题策略",
        detail:
          "运用ChatGPT分析租房领域热门内容，AI生成选题方向，2个月发布30篇小红书笔记，总阅读量达7000+",
      },
      {
        label: "私域转化",
        detail:
          "持续优化引流策略，成功引导70名用户添加微信，平均每月引流35人，转化成功率提升30%",
      },
    ],
    aiTags: ["ChatGPT", "AI选题", "私域转化"],
    featured: false,
  },
];

export default function WorkExperience() {
  return (
    <section id="experience" className="py-24 md:py-32 px-6 md:px-12 bg-[#F5F0E8]/50">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14"
        >
          <h2 className="section-title mb-3">工作经历</h2>
          <p className="section-subtitle">
            每一次实习都在积累让AI落地的实战经验
          </p>
        </motion.div>

        {/* Experience list */}
        <div className="relative">
          {/* Timeline line (desktop) */}
          <div className="hidden md:block absolute left-[19px] top-0 bottom-0 w-[2px] bg-mint/30" />

          <div className="space-y-10 md:space-y-14">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  delay: i * 0.2,
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="md:pl-12 relative"
              >
                {/* Timeline dot (desktop) */}
                <div
                  className={`hidden md:flex absolute left-[12px] top-2 w-[15px] h-[15px] rounded-full border-2 items-center justify-center transition-all duration-300 ${
                    exp.featured
                      ? "border-mint bg-mint shadow-lg shadow-mint/30"
                      : "border-mint/50 bg-warm-bg"
                  }`}
                >
                  {exp.featured && (
                    <div className="w-[5px] h-[5px] rounded-full bg-white" />
                  )}
                </div>

                {/* Card */}
                <div className={`card p-6 md:p-8 ${exp.featured ? "border-l-[3px] border-l-mint" : ""}`}>
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-5">
                    <div>
                      <h3 className="text-xl font-medium text-ink tracking-wide">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-ink-secondary mt-1">
                        {exp.role} <span className="mx-2">·</span> {exp.period}
                      </p>
                    </div>
                    {/* Mobile timeline dot indicator */}
                    <div className="flex md:hidden items-center gap-2 mt-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          exp.featured ? "bg-mint" : "bg-mint/40"
                        }`}
                      />
                      <span className="text-xs text-mint tracking-widest">
                        {i === 0 ? "最近" : `第${i + 1}段`}
                      </span>
                    </div>
                  </div>

                  {/* AI tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {exp.aiTags.map((tag) => (
                      <span key={tag} className="mint-tag">
                        🤖 {tag}
                      </span>
                    ))}
                  </div>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {exp.highlights.map((h) => (
                      <div
                        key={h.label}
                        className="group/item pl-4 border-l-2 border-transparent hover:border-mint transition-colors duration-300"
                      >
                        <span className="text-sm font-medium text-ink block mb-0.5">
                          🏷️ {h.label}
                        </span>
                        <p className="text-sm text-ink-secondary leading-relaxed">
                          {h.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
