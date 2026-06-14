import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "温梓清 · 内容运营人",
  description:
    "我做了550w+次曝光，现在想用AI把它变成5500w — 温梓清的个人作品集",
  openGraph: {
    title: "温梓清 · 内容运营人",
    description: "我做了550w+次曝光，现在想用AI把它变成5500w",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
