import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return (
    <div className="text-center py-20 bg-cover bg-center relative"
         style={{ backgroundImage: "url('/public/hero-bg.jpg')" }}>
      <h1 className="text-4xl font-bold">Where Every Story Begins!</h1>
      <p className="text-lg italic my-4">"Say your name & start your journey!"</p>
      <div className="mt-6">
        <button onClick={() => navigate("/login")} className="bg-yellow-500 px-6 py-3 rounded mx-2">
          Join the Cast
        </button>
        <button onClick={() => navigate("/signup")} className="border border-yellow-500 px-6 py-3 rounded mx-2">
          Watch Magic
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
