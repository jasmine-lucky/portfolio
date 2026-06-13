"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { label: "作品", href: "#accounts" },
  { label: "经历", href: "#experience" },
  { label: "联系", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 60);
  });

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-[#ECE3D5]/80 backdrop-blur-md border-b border-[#D9CCB8]/40"
          : "bg-transparent"
      }`}
    >
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="font-serif text-lg tracking-wider text-ink hover:text-mint transition-colors"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        温梓清
      </button>

      <div className="flex items-center gap-6 md:gap-10">
        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="relative text-sm tracking-widest text-ink-secondary hover:text-ink transition-colors group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-mint group-hover:w-full transition-all duration-300 ease-out" />
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
