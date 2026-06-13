"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "①",
    title: "AI选题",
    main: "GPT分析热点",
    sub: "千瓜选词",
    hasAI: true,
  },
  {
    number: "②",
    title: "批量制作",
    main: "剪映批量产出",
    sub: "模板化生产",
    hasAI: true,
  },
  {
    number: "③",
    title: "发布优化",
    main: "定时发布",
    sub: "AB测试",
    hasAI: false,
  },
  {
    number: "④",
    title: "数据复盘",
    main: "千瓜/灰豚分析",
    sub: "迭代策略",
    hasAI: true,
  },
];

export default function Methodology() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F0E8]/50">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14"
        >
          <h2 className="section-title mb-3">
            不只是做号，是建立系统
          </h2>
          <p className="section-subtitle">
            每个环节都可以被优化，AI让优化更快
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                delay: i * 0.15,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="card p-6 relative"
            >
              {/* Step number */}
              <div
                className="text-4xl mb-4"
                style={{ fontFamily: "var(--font-serif)", color: "#7EBBB8" }}
              >
                {step.number}
              </div>

              <h3 className="text-lg font-medium text-ink mb-2 tracking-wide">
                {step.title}
              </h3>
              <p className="text-sm text-ink-secondary leading-relaxed">
                {step.main}
              </p>
              <p className="text-xs text-ink-secondary/60 mt-1">
                {step.sub}
              </p>

              {/* AI badge */}
              {step.hasAI && (
                <span className="mint-tag mt-4">
                  🤖 AI辅助
                </span>
              )}

              {/* Connector arrow (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-mint text-xl z-10">
                  →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom insight */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-sm text-ink-secondary mt-10 tracking-wide"
        >
          <span className="mint-tag mr-2">🤖 AI辅助</span>
          标注的环节是我目前在内容工作流中融入AI工具的地方，
          未来我希望在更多环节探索AI的可能性
        </motion.p>
      </div>
    </section>
  );
}
