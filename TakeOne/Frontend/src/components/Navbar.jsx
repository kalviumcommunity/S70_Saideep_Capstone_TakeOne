import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Convert to boolean (true if token exists)
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from storage
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-black text-white">
      <h1 className="text-2xl font-bold">TakeOne</h1>
      <div className="space-x-4">
        <a onClick={() => navigate("/discover")} className="hover:text-gray-400 cursor-pointer">Discover</a>
        <a onClick={() => navigate("/communities")} className="hover:text-gray-400 cursor-pointer">Communities</a>
        <a onClick={() => navigate("/workshops")} className="hover:text-gray-400 cursor-pointer">Workshops</a>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded">Logout</button>
        ) : (
          <>
            <a onClick={() => navigate("/login")} className="hover:text-gray-400 cursor-pointer">Login</a>
            <button onClick={() => navigate("/signup")} className="bg-yellow-500 px-4 py-2 rounded">Join</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
