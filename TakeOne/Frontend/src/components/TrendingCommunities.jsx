// ✅ Created for Capstone Concept: "Created frontend components in React"
import React from "react";

const communities = [
  {
    name: "Tarantino’s Crazy Timelines",
    description: "Discuss nonlinear storytelling and Tarantino's wild plots.",
    imageUrl:
      "https://s.studiobinder.com/wp-content/uploads/2020/02/Best-Tarantino-Movies-StudioBinder.jpg",
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
      "https://images.fastcompany.com/image/upload/f_auto,q_auto,c_fit/wp-cms/uploads/2020/09/p-1-129-indie-films-that-prove-movie-posters-can-be-high-art.jpg",
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