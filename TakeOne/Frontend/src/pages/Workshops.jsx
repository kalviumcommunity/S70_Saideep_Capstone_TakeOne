import React from "react";
import Navbar from "../components/Navbar";

const Workshops = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Header Section */}
      <header className="text-center py-16 bg-gray-900">
        <h1 className="text-4xl font-bold">Workshops You Can't Afford to Miss!</h1>
        <p className="mt-4 text-gray-300">
          Learn from industry experts, master your craft, and transform your filmmaking journey 
          through interactive workshops and masterclasses.
        </p>
        <button className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400">
          Explore Workshops
        </button>
      </header>

      {/* Featured Workshops Section */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Workshops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshops.map((workshop, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <img src={workshop.image} alt={workshop.title} className="w-full h-40 object-cover rounded-lg" />
              <div className="mt-4">
                <h3 className="text-xl font-bold">{workshop.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{workshop.instructor}</p>
                <p className="text-gray-300 text-sm mt-2">{workshop.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-yellow-400 font-bold">${workshop.price}</span>
                  <button className="bg-yellow-500 px-4 py-1 rounded font-semibold hover:bg-yellow-400">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Our Workshops? */}
      <section className="bg-gray-900 py-16 text-center">
        <h2 className="text-3xl font-bold">Why Choose Our Workshops?</h2>
        <div className="flex justify-center mt-8 space-x-8">
          {features.map((feature, index) => (
            <div key={index} className="w-64 text-center">
              <div className="text-yellow-500 text-4xl">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-16">
        <h2 className="text-2xl font-bold">Ready to Transform Your Filmmaking Journey?</h2>
        <p className="mt-4 text-gray-300">Join our community of passionate filmmakers and learn from the best in the industry.</p>
        <div className="mt-6 space-x-4">
          <button className="bg-gray-700 px-6 py-2 rounded font-semibold hover:bg-gray-600">Browse All Workshops</button>
          <button className="bg-yellow-500 px-6 py-2 rounded font-semibold hover:bg-yellow-400">Get Started</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <p>&copy; 2025 TakeOne. All rights reserved.</p>
      </footer>
    </div>
  );
};

const workshops = [
  {
    title: "Scriptwriting Deep Dive",
    instructor: "Alex Johnson",
    description: "Master the art of storytelling with industry experts.",
    price: "199",
    image: "https://source.unsplash.com/300x200/?scriptwriting,film",
  },
  {
    title: "Acting for the Camera",
    instructor: "Sarah Lee",
    description: "Learn on-camera techniques from professional actors.",
    price: "249",
    image: "https://source.unsplash.com/300x200/?acting,film",
  },
  {
    title: "DIY Filmmaking Hacks",
    instructor: "Mike Chen",
    description: "Create cinematic content with minimal gear.",
    price: "149",
    image: "https://source.unsplash.com/300x200/?filmmaking,camera",
  },
  {
    title: "Networking & Pitching",
    instructor: "Emma Thompson",
    description: "Learn how to sell your ideas in the film industry.",
    price: "179",
    image: "https://source.unsplash.com/300x200/?networking,business",
  },
];

const features = [
  { icon: "🎥", title: "Live Interactive Sessions", description: "Engage directly with instructors through Zoom-like sessions." },
  { icon: "❓", title: "Exclusive Q&A", description: "Get your questions answered by industry professionals." },
  { icon: "📜", title: "Certification", description: "Receive industry-recognized certification upon completion." },
];

export default Workshops;
