import React from "react";

const FamousMarathons = () => {
  const marathons = [
    {
      name: "Boston Marathon",
      location: "Boston, USA",
      description:
        "One of the oldest and most prestigious annual marathons in the world.",
    },
    {
      name: "London Marathon",
      location: "London, UK",
      description:
        "Famous for its flat route and large international participation.",
    },
    {
      name: "Tokyo Marathon",
      location: "Tokyo, Japan",
      description:
        "Part of the World Marathon Majors with stunning city views.",
    },
    {
      name: "Berlin Marathon",
      location: "Berlin, Germany",
      description: "Known for world record-breaking fast course.",
    },
  ];

  return (
    <section className="famous-marathons p-6 bg-gray-50 rounded shadow max-w-7xl mx-auto my-12">
      <h2 className="text-3xl font-semibold mb-6 text-center text-green-700">
        Famous Marathons Around the World
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {marathons.map(({ name, location, description }, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-sm text-gray-600 mb-1">{location}</p>
            <p className="text-gray-700">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FamousMarathons;
