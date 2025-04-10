// ✅ Created for Capstone Concept: "Created frontend components in React"
import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); 

  return (
    <div 
      className="text-center py-20 bg-cover bg-center relative h-screen flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: "url('https://unsplash.com/photos/2FPjlAyMQTA/download?force=true&w=1920')" }}
    >
      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 bg-black opacity-60"></div> 

      {/* Content Overlapping the Background Image */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-5xl font-bold drop-shadow-lg">Where Every Story Begins!</h1>
        <p className="text-lg italic my-4 drop-shadow-lg">"Say your name & start your journey!"</p>
        <div className="mt-6">
          <button 
            onClick={() => navigate("/login")} 
            className="bg-yellow-500 px-6 py-3 rounded mx-2 font-semibold shadow-lg hover:bg-yellow-600 transition"
          >
            Join the Cast
          </button>
          <button 
            onClick={() => navigate("/signup")} 
            className="border border-yellow-500 px-6 py-3 rounded mx-2 font-semibold shadow-lg hover:bg-yellow-500 hover:text-black transition"
          >
            Watch Magic
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
