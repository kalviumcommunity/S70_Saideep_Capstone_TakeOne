import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import TrendingCommunities from "../components/TrendingCommunities";
import CreatorSpotlight from "../components/CreatorSpotlight";
import Workshops from "../components/Workshops";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // If no token, don't fetch user data

        const response = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); // Store user data in state
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-black text-white">
      <Navbar user={user} /> {/* Pass user data to Navbar if needed */}
      <HeroSection />
      <TrendingCommunities />
      <CreatorSpotlight />
      <Workshops />
      <Footer />
    </div>
  );
};

export default LandingPage;