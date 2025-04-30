import React, { useState } from "react";
import Navbar from "../components/Navbar";
import PostItem from "../components/postItem";// Dynamic post component

const Communities = () => {
  const [posts, setPosts] = useState([
    {
      _id: "1",
      text: "🎬 Inception is overrated. Change my mind.",
      meta: "234 comments • 5k views",
    },
  ]);

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post._id !== id));
  };

  const handleUpdate = (id, newText) => {
    setPosts(posts.map((post) => (post._id === id ? { ...post, text: newText } : post)));
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <div className="bg-gray-900 text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-yellow-400">"You talkin' to me?"</h1>
        <p className="text-gray-300 mt-2">Start a discussion & be heard!</p>
        <button className="mt-4 px-6 py-3 bg-yellow-500 rounded font-bold">Create Post</button>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-3 gap-6 max-w-5xl mx-auto py-10">
        <div className="bg-gray-800 p-6 rounded">
          <h2 className="text-xl font-bold text-yellow-400">Director Fan Clubs</h2>
          <p className="text-gray-300">Christopher Nolan • 4.2k members</p>
          <p className="text-gray-300">Quentin Tarantino • 3.8k members</p>
          <p className="text-gray-300">Stanley Kubrick • 2.9k members</p>
        </div>

        <div className="bg-gray-800 p-6 rounded">
          <h2 className="text-xl font-bold text-yellow-400">Genre Discussions</h2>
          <p className="text-gray-300">Horror Freaks • 5.4k members</p>
          <p className="text-gray-300">Sci-Fi Junkies • 3.2k members</p>
          <p className="text-gray-300">Indie Film Lovers • 2.9k members</p>
        </div>

        <div className="bg-gray-800 p-6 rounded">
          <h2 className="text-xl font-bold text-yellow-400">Behind the Scenes</h2>
          <p className="text-gray-300">Cinematography • 2.8k members</p>
          <p className="text-gray-300">VFX & Editing • 2.3k members</p>
          <p className="text-gray-300">Sound Design • 1.9k members</p>
        </div>
      </div>

      {/* Hot Takes & Discussions */}
      <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-yellow-400">Hot Takes & Discussions</h2>

        {/* Editable Dynamic Post */}
        {posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}

        {/* Keep the rest of the layout static */}
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <p className="font-bold text-white">Poll: Who's the greatest director of all time?</p>
          <div className="mt-2">
            <p className="text-yellow-400">Stanley Kubrick (75%)</p>
            <div className="bg-gray-700 h-2 rounded w-3/4"></div>
            <p className="text-yellow-400 mt-2">Martin Scorsese (50%)</p>
            <div className="bg-gray-700 h-2 rounded w-1/2"></div>
            <p className="text-yellow-400 mt-2">Christopher Nolan (25%)</p>
            <div className="bg-gray-700 h-2 rounded w-1/4"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 mt-10 p-6 text-center text-gray-400">
        <p>Join the community of film enthusiasts and share your passion for cinema.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-white">Guidelines</a>
          <a href="#" className="hover:text-white">FAQ</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
        <div className="mt-4">© 2025 TakeOne. All rights reserved.</div>
      </footer>
    </div>
  );
};

export default Communities;