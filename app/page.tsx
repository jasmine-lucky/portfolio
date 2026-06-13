"use client";

import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import EntranceAnimation from "@/components/EntranceAnimation";
import Hero from "@/components/Hero";
import AccountsSection from "@/components/AccountsSection";
import Methodology from "@/components/Methodology";
import WorkExperience from "@/components/WorkExperience";
import AIProjects from "@/components/AIProjects";
import CreativeWall from "@/components/CreativeWall";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setShowContent(true);
  }, []);

  return (
    <>
      {/* Entrance animation — covers everything until complete */}
      <EntranceAnimation onComplete={handleAnimationComplete} />

      {/* Main content — fades in after animation */}
      <main
        className={`transition-opacity duration-700 ${
          showContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <Hero />
        <AccountsSection />
        <Methodology />
        <WorkExperience />
        <AIProjects />
        <CreativeWall />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
