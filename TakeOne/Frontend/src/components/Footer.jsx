import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 text-sm p-6 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-white font-bold text-lg">TakeOne</p>
        
        <div className="flex space-x-4 my-2">
          <a href="#" className="hover:text-white">Platform</a>
          <a href="#" className="hover:text-white">Resources</a>
          <a href="#" className="hover:text-white">Help</a>
        </div>

        <p>© 2025 TakeOne. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
