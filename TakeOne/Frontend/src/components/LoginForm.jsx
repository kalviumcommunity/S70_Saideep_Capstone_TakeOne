import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg text-white w-96">
      <div className="flex justify-center mb-4">
        <span className="text-red-500 text-4xl">🎬</span>
      </div>

      <h2 className="text-2xl font-bold text-center">VIP Entrance</h2>
      
      <form className="mt-4">
        <label className="block text-sm">Email Address</label>
        <input type="email" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded-md" />

        <label className="block text-sm mt-3">Password</label>
        <input type="password" className="w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded-md" />

        <div className="mt-4 flex items-center justify-between">
          <input type="checkbox" id="robot-check" />
          <label htmlFor="robot-check" className="text-xs">I'm not a robot</label>
        </div>

        <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 rounded-md">
          Step into the World of Cinema
        </button>
      </form>

      <div className="text-center mt-4 text-sm">
        Don't have an account? <Link to="/signup" className="text-red-400 hover:underline">Get a Backstage Pass</Link>
      </div>
    </div>
  );
};

export default LoginForm;
