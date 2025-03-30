import React from "react";
import Navbar from "../components/Navbar";

const Discover = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <header className="text-center py-16 bg-gray-900">
        <h1 className="text-4xl font-bold">"This is the beginning of a beautiful friendship"</h1>
        <p className="mt-4 text-gray-300">Showcase your work & find collaborations in the world's most creative community.</p>
        <div className="mt-6 space-x-4">
          <button className="bg-red-600 px-6 py-2 rounded font-semibold hover:bg-red-500">Upload Your Work</button>
          <button className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600">Watch Showcases</button>
        </div>
      </header>

      {/* Featured Short Films */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Short Films</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shortFilms.map((film, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src={film.image} alt={film.title} className="w-full h-40 object-cover rounded-lg" />
              <div className="mt-4">
                <h3 className="text-lg font-bold">{film.title}</h3>
                <p className="text-gray-400 text-sm">{film.creator}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Scripts */}
      <section className="bg-gray-900 py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Scripts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scripts.map((script, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">{script.title} <span className="text-red-500 text-sm">NEW</span></h3>
              <p className="text-gray-400 mt-2">{script.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-gray-500">{script.writer}</span>
                <button className="bg-red-600 px-4 py-1 rounded font-semibold hover:bg-red-500">Connect</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Active Collaboration Requests */}
      <section className="py-16 px-10">
        <h2 className="text-3xl font-bold text-center mb-8">Active Collaboration Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collaborations.map((collab, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">{collab.title}</h3>
              <p className="text-gray-400 mt-2">{collab.description}</p>
              <div className="mt-4 text-sm text-gray-500">Posted {collab.timeAgo}</div>
              <button className="mt-4 bg-gray-700 px-4 py-1 rounded font-semibold hover:bg-gray-600">Apply</button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <p>&copy; 2025 TakeOne. All rights reserved.</p>
      </footer>
    </div>
  );
};

const shortFilms = [
  { title: "The Last Letter", creator: "James Wilson", image: "https://source.unsplash.com/300x200/?film,cinema" },
  { title: "Neo-Tokyo Dreams", creator: "Brian Cook", image: "https://source.unsplash.com/300x200/?cyberpunk,city" },
  { title: "Earth's Whispers", creator: "Maya Patel", image: "https://source.unsplash.com/300x200/?nature,documentary" },
];

const scripts = [
  { title: "The Midnight Train", description: "A mysterious journey turns deadly when passengers start disappearing one by one.", writer: "Samuel Richards" },
  { title: "Echoes of Tomorrow", description: "In 2075, a critical past move prevents a catastrophe that hasn’t happened yet.", writer: "Eliza Morgan" },
];

const collaborations = [
  { title: "Looking for Cinematographer", description: "Need an experienced cinematographer for a short film shooting in NYC.", timeAgo: "2 days ago" },
  { title: "Composer Needed", description: "Seeking a composer who can create an atmospheric score for psychological horror.", timeAgo: "1 week ago" },
  { title: "Script-Editor Available", description: "Award-winning editor with 5+ years experience available for consultation.", timeAgo: "3 days ago" },
];

export default Discover;
