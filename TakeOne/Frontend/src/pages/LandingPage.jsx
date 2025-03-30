import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import TrendingCommunities from "../components/TrendingCommunities";
import CreatorSpotlight from "../components/CreatorSpotlight";
import Workshops from "../components/Workshops";

const LandingPage = () => {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <HeroSection />
      <TrendingCommunities />
      <CreatorSpotlight />
      <Workshops />
      <Footer />
    </div>
  );
};

export default LandingPage;
