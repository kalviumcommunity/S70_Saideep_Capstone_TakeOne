import React from "react";

const communities = [
  {
    name: "Tarantino’s Crazy Timelines",
    description: "Discuss nonlinear storytelling and Tarantino's wild plots.",
    imageUrl:
      "https://images.unsplash.com/photo-1585128792020-96646d1e90ad?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sci-Fi Junkies",
    description: "Explore the mind-bending universe of science fiction cinema.",
    imageUrl:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Indie Spotlight",
    description: "Celebrate the art of independent filmmaking.",
    imageUrl:
      "https://images.unsplash.com/photo-1620912189865-1d7769fc285f?auto=format&fit=crop&w=800&q=80",
  },
];

const TrendingCommunities = () => {
  return (
    <div className="p-10 bg-gray-900">
      <h2 className="text-2xl font-bold mb-4 text-white">Trending Communities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {communities.map((community, index) => (
          <div key={index} className="p-5 bg-gray-800 rounded">
            <img
              src={community.imageUrl}
              alt={community.name}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="font-semibold text-white">{community.name}</h3>
            <p className="text-sm text-gray-400">{community.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCommunities;