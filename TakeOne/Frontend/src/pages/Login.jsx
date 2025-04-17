import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useAuth from "../context/useAuth"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from context

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user); // Save user data to context
        navigate("/"); // Redirect to home after login
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar /> {/* ✅ Navbar added back */}

      <div className="flex-grow flex justify-center items-center">
        <div className="bg-gray-800 p-8 rounded shadow-lg w-96">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600"
            >
              Login
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-yellow-400 cursor-pointer"
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
