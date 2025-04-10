// ✅ Created for Capstone Concept: "Created frontend components in React"
import React from "react";

const creators = [
  {
    name: "James Anderson",
    role: "Director & Cinematographer",
    imageUrl: "path/to/james-anderson.jpg",
  },
  {
    name: "Sarah Chen",
    role: "Indie Film Critic",
    imageUrl: "path/to/sarah-chen.jpg",
  },
  {
    name: "Marcus Wright",
    role: "Writer & Screenplay Specialist",
    imageUrl: "path/to/marcus-wright.jpg",
  },
];

const CreatorSpotlight = () => {
  return (
    <div className="p-10 bg-black">
      <h2 className="text-2xl font-bold mb-4">Creator Spotlight</h2>
      <div className="grid grid-cols-3 gap-4">
        {creators.map((creator, index) => (
          <div key={index} className="p-5 bg-gray-800 rounded">
            <img
              src={creator.imageUrl}
              alt={creator.name}
              className="w-full h-32 object-cover rounded mb-4"
            />
            <h3 className="font-semibold">{creator.name}</h3>
            <p className="text-sm text-gray-400">{creator.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorSpotlight;