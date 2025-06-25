import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UpcomingMarathons = () => {
  const [marathons, setMarathons] = useState([]);

  useEffect(() => {
    fetch("https://marathon-server-azure.vercel.app/marathons")
      .then((res) => res.json())
      .then((data) => {
        const today = new Date();
        const upcoming = data.filter((item) => {
          const eventDate = new Date(item.eventDate || item.marathonDate);
          return eventDate > today && !isNaN(eventDate);
        });
        const shuffled = upcoming.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        setMarathons(selected);
      })
      .catch((err) => {
        console.error("❌ Failed to load marathons:", err);
      });
  }, []);

  return (
    <div className="py-16 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          🏁 Upcoming Marathons
        </h2>

        {marathons.length === 0 ? (
          <p className="text-center text-gray-500">No upcoming marathons found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {marathons.map((marathon) => (
              <div
                key={marathon._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 flex flex-col"
              >
                <img
                  src={marathon.image}
                  alt={marathon.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {marathon.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">
                    📍 {marathon.location || "Location not provided"}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">
                    📅{" "}
                    {new Date(
                      marathon.eventDate || marathon.marathonDate
                    ).toLocaleDateString()}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 text-sm mb-4">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      🏃 {marathon.distance || "N/A"}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                      💰 {marathon.registrationFee || "Free"}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      👥 {marathon.participantsLimit || "Unlimited"} spots
                    </span>
                  </div>

                  {/* ✅ Details Button */}
                  <div className="mt-auto">
                    <Link
                      to={`/marathonsdetails/${marathon._id}`}
                      className="inline-block w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingMarathons;

