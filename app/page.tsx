"use client";

import { useState, useCallback } from "react";
import ClickSpark from "@/components/ClickSpark";
import FloatingParticles from "@/components/FloatingParticles";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Navbar from "@/components/Navbar";
import EntranceAnimation from "@/components/EntranceAnimation";
import Hero from "@/components/Hero";
import FlowingMenu from "@/components/FlowingMenu";
import JasmineFeatured from "@/components/JasmineFeatured";
import OverseasSection from "@/components/OverseasSection";
import AccountsSection from "@/components/AccountsSection";
import Methodology from "@/components/Methodology";
import WorkExperience from "@/components/WorkExperience";
import AIProjects from "@/components/AIProjects";
import CreativeWall from "@/components/CreativeWall";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const menuItems = [
  { link: "#jasmine", text: "专栏" },
  { link: "#overseas", text: "海外" },
  { link: "#accounts", text: "作品" },
  { link: "#experience", text: "经历" },
  { link: "#contact", text: "联系" },
];

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <ClickSpark sparkColor="#7EBBB8" sparkCount={8} sparkRadius={20} duration={400}>
      <EntranceAnimation onComplete={handleAnimationComplete} />

      <main
        className={`transition-opacity duration-700 relative ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <FloatingParticles />
        <ScrollProgress />
        <Navbar />
        <Hero />
        <FlowingMenu
          items={menuItems}
          textColor="#1D1D1D"
          marqueeBgColor="#7EBBB8"
          marqueeTextColor="#FFFFFF"
          borderColor="#D9CCB8"
          speed={18}
        />
        <JasmineFeatured />
        <OverseasSection />
        <AccountsSection />
        <Methodology />
        <WorkExperience />
        <AIProjects />
        <CreativeWall />
        <Contact />
        <Footer />
        <BackToTop />
      </main>
    </ClickSpark>
  );
}
