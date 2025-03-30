import React from "react";

const communities = [
  { name: "Tarantino’s Crazy Timelines", description: "Discuss nonlinear storytelling and Tarantino's wild plots." },
  { name: "Sci-Fi Junkies", description: "Explore the mind-bending universe of science fiction cinema." },
  { name: "Indie Spotlight", description: "Celebrate the art of independent filmmaking." },
];

const TrendingCommunities = () => {
  return (
    <div className="p-10 bg-gray-900">
      <h2 className="text-2xl font-bold mb-4">Trending Communities</h2>
      <div className="grid grid-cols-3 gap-4">
        {communities.map((community, index) => (
          <div key={index} className="p-5 bg-gray-800 rounded">
            <h3 className="font-semibold">{community.name}</h3>
            <p className="text-sm text-gray-400">{community.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCommunities;
