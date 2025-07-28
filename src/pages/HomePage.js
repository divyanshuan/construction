import React from "react";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import FeaturesSection from "../components/FeaturesSection";
import CommunitySection from "../components/CommunitySection";
import Footer from "../common/Footer";

const HomePage = () => {
  return (
    <div className="font-sans">
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CommunitySection />
      <Footer />
    </div>
  );
};

export default HomePage;
