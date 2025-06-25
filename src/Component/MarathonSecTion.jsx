import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MarathonSecTion = () => {
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch('https://marathon-server-azure.vercel.app/marathons')
      .then((res) => res.json())
      .then((data) => {
        setMarathons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch marathons:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-6 text-lg">Loading...</p>;

  // showAll true hole max 6 ta show korbe, false hole 3 ta
  const displayedMarathons = showAll ? marathons.slice(0, 6) : marathons.slice(0, 3);

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">🏃‍♂️ Marathons Section</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedMarathons.map((marathon) => (
          <div
            key={marathon._id}
            className="bg-white rounded-xl shadow-md overflow-hidden border"
          >
            <img
              src={marathon.image || 'https://via.placeholder.com/400x160?text=No+Image'}
              alt={marathon.title || 'Marathon Image'}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{marathon.title || 'Untitled Marathon'}</h3>
              <p className="text-gray-600 mt-1">📍 {marathon.location || 'Unknown Location'}</p>
              <p className="text-sm text-gray-500 mt-1">
                🗓️ {formatDate(marathon.registrationStart)} → {formatDate(marathon.registrationEnd)}
              </p>
              <Link to={`/marathonsdetails/${marathon._id}`}>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
                  See Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Button only if marathons are more than 6 */}
      {marathons.length > 6 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MarathonSecTion;
