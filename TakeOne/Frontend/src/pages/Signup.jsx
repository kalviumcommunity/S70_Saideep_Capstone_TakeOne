import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import useAuth from "../context/useAuth"; 

const Signup = () => {
  const { signup } = useAuth(); // Extract signup function from context

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.fullName, formData.email, formData.password);
      console.log("User signed up successfully");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <Navbar /> {/* ✅ Navbar stays the same */}

      <div className="flex-grow flex justify-center items-center">
        <div className="bg-gray-800 p-8 rounded-md shadow-lg w-96">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Backstage Pass
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 text-sm mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-600"
            >
              Join the Crew
            </button>
          </form>

          <p className="text-gray-400 text-sm mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-yellow-400">
              Enter the Set
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;