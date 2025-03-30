import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg text-white w-96">
      <div className="flex justify-center mb-4">
        <span className="text-red-500 text-4xl">🎬</span>
      </div>

      <h2 className="text-2xl font-bold text-center">Backstage Pass</h2>
      
      <form className="mt-4">
        <label className="block text-sm">Full Name</label>
        <input type="text" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded-md" />

        <label className="block text-sm mt-3">Email Address</label>
        <input type="email" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded-md" />

        <label className="block text-sm mt-3">Password</label>
        <input type="password" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded-md" />

        <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
          Join the Crew
        </button>
      </form>

      <div className="text-center mt-4 text-sm">
        Already have an account? <Link to="/login" className="text-red-400 hover:underline">Enter the Set</Link>
      </div>
    </div>
  );
};

export default SignupForm;
