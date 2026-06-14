"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import ImageLightbox from "./ImageLightbox";

interface AccountCardProps {
  name: string;
  platform: string;
  followers: string;
  metric: string;
  description: string;
  tags: string[];
  images: string[];
  link: string;
  index: number;
}

export default function AccountCard({
  name,
  platform,
  followers,
  metric,
  description,
  tags,
  images,
  link,
  index,
}: AccountCardProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, [images.length]);

  // Auto-rotate covers
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [images.length, nextImage]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{
          delay: index * 0.12,
          duration: 0.55,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="card cursor-default group"
      >
        {/* Image carousel area — click to open full-size */}
        <div
          className="relative w-full aspect-[4/3] bg-[#D9CCB8]/30 rounded-t-xl overflow-hidden cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              {img ? (
                <img
                  src={img}
                  alt={`${name} - ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-ink-secondary/30 text-sm bg-[#D9CCB8]/20">
                  <span className="tracking-widest">封面待补充</span>
                </div>
              )}
            </div>
          ))}

          {/* Click to enlarge hint */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <span className="bg-dark/60 text-white/80 text-[10px] px-2 py-1 rounded-full tracking-wider">
              🔍 查看大图
            </span>
          </div>

          {/* Image dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentImage
                      ? "bg-mint w-4"
                      : "bg-white/60 hover:bg-white/90"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-medium text-ink tracking-wide">
                {name}
              </h3>
              <p className="text-sm text-ink-secondary mt-0.5">
                {platform} · {followers}
              </p>
            </div>
          </div>

          <p className="text-sm text-ink-secondary leading-relaxed mt-3 mb-4">
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span key={tag} className="mint-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Metric highlight */}
          <div
            className="text-2xl font-bold text-mint tracking-tight mt-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {metric}
          </div>

          {/* Visit link — only link that navigates */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1 text-sm mint-link group/link"
            onClick={(e) => e.stopPropagation()}
          >
            <span>访问主页</span>
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </motion.div>

      {/* Lightbox for full-size image viewing */}
      {images[currentImage] && (
        <ImageLightbox
          src={images[currentImage]}
          alt={`${name} - ${currentImage + 1}`}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
