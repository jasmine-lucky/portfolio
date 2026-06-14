"use client";

import { useRef, useState, useCallback } from "react";

interface MenuItem {
  link: string;
  text: string;
}

interface FlowingMenuProps {
  items: MenuItem[];
  textColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  speed?: number;
}

export default function FlowingMenu({
  items,
  textColor = "#1D1D1D",
  marqueeBgColor = "#7EBBB8",
  marqueeTextColor = "#FFFFFF",
  borderColor = "#D9CCB8",
  speed = 15,
}: FlowingMenuProps) {
  return (
    <nav className="w-full overflow-hidden border-y" style={{ borderColor }}>
      <div className="flex flex-row">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            index={index}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
            speed={speed}
          />
        ))}
      </div>
    </nav>
  );
}

function MenuItem({
  item,
  index,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
  speed,
}: {
  item: MenuItem;
  index: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
  speed: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [origin, setOrigin] = useState<"top" | "bottom">("bottom");

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    setOrigin(mouseY < rect.height / 2 ? "top" : "bottom");
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const scrollToSection = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.querySelector(item.link);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, [item.link]);

  return (
    <a
      href={item.link}
      onClick={scrollToSection}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 overflow-hidden cursor-pointer block border-r last:border-r-0"
      style={{ borderColor }}
    >
      {/* Normal text */}
      <div
        className="relative z-10 flex items-center justify-center px-3 md:px-6 py-4 md:py-7 transition-opacity duration-300"
        style={{ color: textColor, opacity: isHovered ? 0 : 1 }}
      >
        <span
          className="text-xs md:text-sm tracking-widest font-medium"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {item.text}
        </span>
        <span className="ml-1.5 text-[10px] md:text-xs opacity-40">0{index + 1}</span>
      </div>

      {/* Marquee overlay */}
      <div
        className="absolute inset-0 z-20 flex items-center overflow-hidden"
        style={{
          backgroundColor: marqueeBgColor,
          transform: isHovered
            ? "translateY(0)"
            : `translateY(${origin === "top" ? "-101%" : "101%"})`,
          transition: `transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: isHovered ? `marqueeFlow ${speed}s linear infinite` : "none",
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3" style={{ color: marqueeTextColor }}>
              <span
                className="text-xs md:text-sm tracking-widest font-medium whitespace-nowrap"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.text}
              </span>
              <span className="text-[10px] md:text-xs opacity-60">0{index + 1}</span>
              <span className="mx-1.5 opacity-30 text-[10px]">·</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marqueeFlow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </a>
  );
}
