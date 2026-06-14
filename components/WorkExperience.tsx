"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "广州菲鹿儿商贸有限公司",
    role: "海外社媒内容运营",
    period: "2026.02 — 2026.05",
    highlights: [
      {
        label: "TikTok账号矩阵规划",
        detail:
          "多款美妆新品同期上市，担任新品首发操盘手，负责百万级TikTok矩阵账号定位，定制「利他教程+痛点场景」垂直内容策略。靠自制内容冷启动，首发期间撬动官号85.7万+总播放；单视频最高CVR达28.6%、CTR达4.99%，跑通商业化扩量视频投放ROI达3.6",
      },
      {
        label: "爆款短视频编导",
        detail:
          "作为海外美妆短视频选题与脚本编导，产出150+篇产品痛点分析与教程脚本，优化视频开头强视觉钩子与互动反转。成功打造15支百万级播放爆款，带动核心视频曝光量环比提升120%",
      },
      {
        label: "拍摄流程项目管理",
        detail:
          "将传统「模特兼剪辑」模式重组为「编导-模特-剪辑」高效协作模式，建立「爆款脚本溯源库」进行批量化创意复制。单人拍摄产出人效提升50%（单模特日产2条→3条），每周额外沉淀10+条优质素材用于二次混剪与矩阵分发",
      },
      {
        label: "数据驱动迭代",
        detail:
          "每日监控往期视频GMV捕捉转化信号，深度拆解高转化视频脚本结构进行复刻。成功跑通爆款复制闭环，单视频GMV从156元精准复刻放大近10倍至1,470元，投放ROI达2.8",
      },
    ],
    aiTags: ["AI脚本辅助", "TikTok矩阵", "数据驱动", "海外运营"],
    featured: true,
  },
  {
    company: "唯品会（中国）有限公司",
    role: "传播运营实习生",
    period: "2025.10 — 2026.02",
    highlights: [
      {
        label: "门店运营",
        detail:
          "针对汉服妆造线下门店开业初期品牌认知度低、获客渠道单一的痛点，统筹日常运营并搭建「线下体验+线上引流」闭环，实现月度服务60+组客户，客单价300+元，月度营收1.8万+元，服务好评率100%",
      },
      {
        label: "达人投放策略",
        detail:
          "面对门店冷启动期预算1.5万元，独立策划小红书达人投放全案，制定《投放规划表》与《达人brief》，设计「素人互勉+付费素人+腰部达人」三级矩阵覆盖4大垂类；将单达人预估成本精细化控制在277元，从0到1交付全套达人营销体系方案，获业务团队100%评审通过并采纳",
      },
      {
        label: "达人执行管理",
        detail:
          "搭建博主精细化跟进表与稿件全链验收体系，全流程规划9位首批达人管理链路，使前端触达与内容前置审核人效提升50%，方案及SOP已作为团队后续达人转化的标准模板",
      },
    ],
    aiTags: ["达人营销", "全案策划", "SOP搭建"],
    featured: false,
  },
  {
    company: "广州朗圣药业有限公司",
    role: "内容运营实习生",
    period: "2025.06 — 2025.10",
    highlights: [
      {
        label: "品牌账号0-1冷启动",
        detail:
          "面对健康类新品上市、账号从0起步、内容同质化严重的困境，通过竞品调研与用户画像分析定位差异化内容方向，首月涨粉400+，账号数据表现超99%同类创作者，沉淀《健康类品牌账号起号方法论》",
      },
      {
        label: "达人投放优化",
        detail:
          "针对KOC沟通成本高、稿件质量不稳定的痛点，制作标准化沟通话术模板，统筹100+件样品寄送，独立审核优化40+位达人脚本文案并推行内容前置审核，成功降低2位达人投放成本2000+元，稿件一次性通过率提升至75%",
      },
      {
        label: "新品传播项目",
        detail:
          "为提升新品ROI，对接抖音/B站达人（大胡子有货、辣个芝士等）打造爆款视频，对接KOL近50位，深度参与达人筛选、脚本共创与数据复盘全流程",
      },
    ],
    aiTags: ["竞品调研", "0-1起号", "KOC管理"],
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
                <div
                  className={`card p-6 md:p-8 ${
                    exp.featured ? "border-l-[3px] border-l-mint" : ""
                  }`}
                >
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
                    {/* Mobile indicator */}
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
