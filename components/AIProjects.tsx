"use client";

import { motion } from "framer-motion";

const projects = [
  {
    name: "专注小助手",
    subtitle: "ADHD克星",
    problem: "我注意力很容易分散，于是我用NoCode搭了一个专注工具",
    description:
      "独立开发的基于AI的专注力管理工具。运用自然语言处理技术，将模糊任务智能拆解为具体步骤，并通过动态提醒机制和未来激励可视化帮助用户保持专注。",
    link: "https://focus-alert-toolkit.nocode.host",
    image: "/images/ai/focus.png",
  },
  {
    name: "朋友圈文案生成器",
    subtitle: "圈圈文案",
    problem: "我想发朋友圈但不知道写什么，于是我搭了这个文案工具",
    description:
      "基于大语言模型API开发的智能文案生成工具。用户输入简单关键词即可一键生成多场景、多风格的朋友圈文案，支持治愈系、搞怪风、日常记录风等多种风格切换。",
    link: "https://9elmi3ikyk.youware.app",
    image: "/images/ai/youware.png",
  },
];

export default function AIProjects() {
  return (
    <section className="py-20 md:py-28 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-6"
        >
          <h2 className="section-title mb-3">
            用AI解决我遇到的真问题
          </h2>
          <p className="section-subtitle">
            不是技术背景，但我愿意用工具让工作更高效
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                delay: i * 0.2 + 0.3,
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="card p-6 md:p-8 cursor-pointer group block"
            >
              {/* Image placeholder */}
              <div className="w-full aspect-[16/10] bg-[#D9CCB8]/20 rounded-lg mb-5 flex items-center justify-center overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <span className="text-ink-secondary/25 text-sm tracking-widest">
                    {project.subtitle}
                  </span>
                )}
              </div>

              <h3 className="text-lg font-medium text-ink tracking-wide">
                {project.name}
              </h3>
              <p className="text-xs text-mint mt-1 tracking-wide">
                {project.subtitle}
              </p>

              <p className="text-sm text-ink-secondary/80 italic mt-3 mb-3 leading-relaxed">
                &ldquo;{project.problem}&rdquo;
              </p>

              <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                {project.description}
              </p>

              <div className="flex items-center gap-1 text-sm text-mint group-hover:text-mint-dark transition-colors">
                <span>🔗 试玩体验</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center text-xs text-ink-secondary/60 mt-8 tracking-wider"
        >
          Built with NoCode + LLM API · 一个人完成
        </motion.p>
      </div>
    </section>
  );
}
