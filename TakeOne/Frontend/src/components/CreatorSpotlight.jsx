// ✅ Created for Capstone Concept: "Created frontend components in React"
import React from "react";

const creators = [
  {
    name: "Mani Ratnam",
    role: "Director",
    imageUrl: "https://th.bing.com/th/id/OIP.xh0urxNM0nomznKrkqCuAQHaEC?rs=1&pid=ImgDetMain", // 🖼️ Added Image
  },
  {
    name: "David Fincher",
    role: "Director",
    imageUrl: "https://th.bing.com/th/id/OIP.qBkO05R0Pa36IJsaTt788gHaEK?rs=1&pid=ImgDetMain", // 🖼️ Added Image
  },
  {
    name: "David Lynch",
    role: "Writer,Director and producer",
    imageUrl: "https://api.floodmagazine.com/wp-content/uploads/2022/06/David-Lynch-2560x1676.jpg", // 🖼️ Added Image
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
