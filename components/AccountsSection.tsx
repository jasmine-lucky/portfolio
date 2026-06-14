"use client";

import { motion } from "framer-motion";
import AccountCard from "./AccountCard";

const accounts = [
  {
    name: "Jasmine清清",
    platform: "小红书 · 时尚区",
    followers: "5,806 粉丝",
    metric: "540万 曝光",
    description:
      "从0粉做到5800+粉丝，单篇笔记最高播放量破百万，累计产出15+篇爆文笔记。通过数据分析和内容策略持续优化，在时尚穿搭赛道建立个人IP。",
    tags: ["数据驱动", "爆款内容", "个人IP"],
    images: [
      "/images/accounts/jasmine-1.png",
      "/images/accounts/jasmine-2.png",
      "/images/accounts/jasmine-3.png",
    ],
    link: "https://www.xiaohongshu.com/user/profile/65524ed00000000002013808?xsec_token=ABXEoqwjGTpn_ddtr_R6NKzJUNT5Ho_DQbHByzZx-hUdk%3D&xsec_source=pc_search",
  },
  {
    name: "情绪号",
    platform: "小红书 · 情感区",
    followers: "500+ 粉丝",
    metric: "AI辅助·从0孵化",
    description:
      "运用ChatGPT生成情绪洞察文案，AI辅助选题和脚本创作，是我真正把AI融入内容创作流程的实验田。从0到1完整经历账号冷启过程。",
    tags: ["AI辅助", "GPT写文案", "从0起号"],
    images: [
      "/images/accounts/emotion-1.png",
      "/images/accounts/emotion-2.png",
    ],
    link: "https://www.xiaohongshu.com/user/profile/686c7500000000001d009f05?xsec_token=ABvJJ_h0f_e5U-Vc3oLAXyt8UW1ETIvLtJpOzS5ippoS0%3D&xsec_source=pc_search",
  },
  {
    name: "书书日记",
    platform: "小红书 · 美妆区",
    followers: "710 粉丝",
    metric: "18万 曝光",
    description:
      "美妆测评类账号，5+篇爆文笔记，在美妆内容高度内卷的赛道中通过差异化选题和真实测评内容获得用户信任。",
    tags: ["美妆测评", "差异化选题"],
    images: [
      "/images/accounts/shushu-1.png",
      "/images/accounts/shushu-2.png",
    ],
    link: "https://www.xiaohongshu.com/user/profile/65a0178000000000220092a4?xsec_token=ABv_fwBFE8oHevDSFq6KY3xvjKzQ8nnmTT_DaP49jkr6E%3D&xsec_source=pc_search",
  },
];

export default function AccountsSection() {
  return (
    <section id="accounts" className="py-24 md:py-32 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12"
        >
          <h2 className="section-title mb-3">内容是我的基本功</h2>
          <p className="section-subtitle">从0到1，数据为证</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {accounts.map((account, i) => (
            <AccountCard key={account.name} {...account} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
