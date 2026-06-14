"use client";

import { motion } from "framer-motion";

const socialLinks = [
  {
    label: "小红书",
    sub: "时尚号",
    desc: "Jasmine清清",
    link: "https://www.xiaohongshu.com/user/profile/65524ed00000000002013808?xsec_token=ABXEoqwjGTpn_ddtr_R6NKzJUNT5Ho_DQbHByzZx-hUdk%3D&xsec_source=pc_search",
  },
  {
    label: "小红书",
    sub: "美妆号",
    desc: "书书日记",
    link: "https://www.xiaohongshu.com/user/profile/65a0178000000000220092a4?xsec_token=ABv_fwBFE8oHevDSFq6KY3xvjKzQ8nnmTT_DaP49jkr6E%3D&xsec_source=pc_search",
  },
  {
    label: "小红书",
    sub: "情绪号",
    desc: "AI辅助起号",
    link: "https://www.xiaohongshu.com/user/profile/686c7500000000001d009f05?xsec_token=ABvJJ_h0f_e5U-Vc3oLAXyt8UW1ETIvLtJpOzS5ippoS0%3D&xsec_source=pc_search",
  },
  {
    label: "公众号",
    sub: "账号",
    desc: "内容设计",
    link: "#",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 bg-dark">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2
              className="text-3xl md:text-4xl text-[#F5F0E8] mb-6 tracking-wider"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              聊一聊？
            </h2>
            <p className="text-[#787878] text-sm mb-10 tracking-wider">
              期待与您交流
            </p>

            <div className="space-y-5 text-sm tracking-wide">
              <div className="flex items-center gap-3">
                <span className="text-mint text-base">📧</span>
                <span className="text-[#F5F0E8]/80">1479776219@qq.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-mint text-base">📱</span>
                <span className="text-[#F5F0E8]/80">135-4229-3584</span>
              </div>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-3 text-mint hover:text-mint-light transition-colors mt-2"
              >
                <span>📄</span>
                <span>下载简历 →</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <p className="text-[#787878] text-xs tracking-widest mb-6 uppercase">
              我的自媒体矩阵
            </p>
            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label + link.sub}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-xl border border-[#1A1A1A] hover:border-mint/50 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-mint/5 group animate-breathe hover:animate-none"
                >
                  <p className="text-mint text-sm font-medium tracking-wider group-hover:text-mint-light transition-colors">
                    {link.label}
                  </p>
                  <p className="text-[#787878] text-xs mt-1">{link.sub}</p>
                  <p className="text-[#F5F0E8]/50 text-xs mt-0.5">{link.desc}</p>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
