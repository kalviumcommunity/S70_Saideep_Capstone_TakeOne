import React from "react";

const workshops = [
  {
    title: "Mastering Digital Cinematography",
    type: "Premium",
    date: "March 25, 2025",
    price: "$129",
    buttonText: "Reserve Your Spot",
    buttonStyle: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    title: "Screenplay Writing Basics",
    type: "Free",
    date: "March 30, 2025",
    price: "FREE",
    buttonText: "Join Workshop",
    buttonStyle: "bg-green-500 hover:bg-green-600",
  },
];

const Workshops = () => {
  return (
    <section className="bg-black text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Upcoming Workshops</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {workshops.map((workshop, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <p className="text-yellow-400 text-sm font-semibold">
                {workshop.type}
              </p>
              <h3 className="text-xl font-bold my-2">{workshop.title}</h3>
              <p className="text-gray-400 text-sm">{workshop.date}</p>
              <button
                className={`mt-4 px-4 py-2 rounded-lg text-sm font-semibold ${workshop.buttonStyle}`}
              >
                {workshop.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;
