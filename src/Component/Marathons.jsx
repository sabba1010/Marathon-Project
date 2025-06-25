import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Marathons = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' = newest first, 'asc' = oldest first

  useEffect(() => {
    setLoading(true);
    fetch(`https://marathon-server-azure.vercel.app/marathons?sort=${sortOrder}`)
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch marathons:', error);
        setLoading(false);
      });
  }, [sortOrder]);

  if (loading) return <p className="text-center py-6 text-lg">Loading...</p>;

  const limit = 6;
  const marathonsToShow = showAll ? marathons : marathons.slice(0, limit);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">🏃‍♂️ Marathons Section</h2>

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-6">
        <select
          className="border border-gray-300 rounded px-4 py-2 shadow-sm"
          onChange={(e) => setSortOrder(e.target.value)}
          value={sortOrder}
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </select>
      </div>

      {/* Marathons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {marathonsToShow.map((marathon) => (
          <div
            key={marathon._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-44 object-cover"
              loading="lazy"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1">{marathon.title}</h3>
              <p className="text-gray-700 mb-1">📍 {marathon.location}</p>
              <p className="text-sm text-gray-500 mb-4">
                🗓️ {marathon.registrationStart} → {marathon.registrationEnd}
              </p>
              <Link to={`/marathonsdetails/${marathon._id}`}>
                <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {marathons.length > limit && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full shadow-lg hover:from-gray-900 hover:to-black transition font-semibold"
          >
            {showAll ? 'Show Less' : `Show More (${marathons.length - limit} more)`}
          </button>
        </div>
      )}
    </div>
  );
};

export default Marathons;

