"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface MenuItem {
  link: string;
  text: string;
}

interface FlowingMenuProps {
  items: MenuItem[];
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
  speed?: number;
}

export default function FlowingMenu({
  items,
  textColor = "#1D1D1D",
  bgColor = "transparent",
  marqueeBgColor = "#7EBBB8",
  marqueeTextColor = "#FFFFFF",
  borderColor = "#D9CCB8",
  speed = 15,
}: FlowingMenuProps) {
  return (
    <nav
      className="w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="flex flex-col md:flex-row"
        style={{ borderColor }}
      >
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
  const containerRef = useRef<HTMLAnchorElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [origin, setOrigin] = useState<"top" | "bottom">("bottom");
  const marqueeContentRef = useRef<HTMLDivElement>(null);
  const [repeatCount, setRepeatCount] = useState(3);

  // Calculate how many repeats needed to fill width
  useEffect(() => {
    const updateRepeats = () => {
      if (marqueeContentRef.current && containerRef.current) {
        const contentWidth = marqueeContentRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const needed = Math.ceil((containerWidth * 2) / contentWidth) + 1;
        setRepeatCount(Math.max(needed, 3));
      }
    };
    updateRepeats();
    window.addEventListener("resize", updateRepeats);
    return () => window.removeEventListener("resize", updateRepeats);
  }, []);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseY = e.clientY - rect.top;
      const edge = mouseY < rect.height / 2 ? "top" : "bottom";
      setOrigin(edge);
      setIsHovered(true);
    },
    []
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      setIsHovered(false);
    },
    []
  );

  const scrollToSection = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const el = document.querySelector(item.link);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    [item.link]
  );

  return (
    <a
      ref={containerRef}
      href={item.link}
      onClick={scrollToSection}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex-1 overflow-hidden cursor-pointer group block"
      style={{
        borderBottom: `1px solid ${borderColor}`,
        borderRight: `1px solid ${borderColor}`,
      }}
    >
      {/* Normal text */}
      <div
        className="relative z-10 flex items-center justify-center px-6 py-5 md:py-7 transition-opacity duration-300"
        style={{
          color: textColor,
          opacity: isHovered ? 0 : 1,
        }}
      >
        <span
          className="text-sm md:text-base tracking-widest font-medium"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {item.text}
        </span>
        <span className="ml-2 text-xs opacity-40">0{index + 1}</span>
      </div>

      {/* Marquee overlay */}
      <div
        ref={marqueeRef}
        className="absolute inset-0 z-20 flex items-center overflow-hidden"
        style={{
          backgroundColor: marqueeBgColor,
          transform: isHovered ? "translateY(0)" : `translateY(${origin === "top" ? "-101%" : "101%"})`,
          transition: `transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)`,
        }}
      >
        <div
          className="flex items-center whitespace-nowrap"
          style={{
            animation: isHovered ? `marquee ${speed}s linear infinite` : "none",
          }}
        >
          {Array.from({ length: repeatCount }).map((_, i) => (
            <div
              key={i}
              ref={i === 0 ? marqueeContentRef : undefined}
              className="flex items-center gap-2 px-4"
              style={{ color: marqueeTextColor }}
            >
              <span
                className="text-sm md:text-base tracking-widest font-medium whitespace-nowrap"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {item.text}
              </span>
              <span className="text-xs opacity-60 whitespace-nowrap">0{index + 1}</span>
              <span className="mx-2 opacity-30">·</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </a>
  );
}
