import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { toast } from 'react-toastify';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import MarathonRegistrationForm from './MarathonRegistrationForm';

const MarathonSecTionDetal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [marathon, setMarathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    fetch(`https://marathon-server-azure.vercel.app/marathons/${id}`)
      .then(res => res.json())
      .then(data => {
        setMarathon(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch marathon details:', err);
        setLoading(false);
      });
  }, [id]);

  const isRegistrationOpen = () => {
    if (!marathon) return false;
    const now = new Date();
    const start = new Date(marathon.registrationStart);
    const end = new Date(marathon.registrationEnd);
    return now >= start && now <= end;
  };

  const handleRegisterClick = () => {
    if (!user) {
      toast.info("Please login first to register.");
      navigate('/login');
      return;
    }
    setShowRegistrationForm(true);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationForm(false);
    navigate('/dashboard/my-apply');
  };

  if (loading) return <p className="text-center py-6">Loading marathon details...</p>;
  if (!marathon) return <p className="text-center py-6">Marathon not found</p>;

  const eventDate = new Date(marathon.eventDate);
  const now = new Date();
  const secondsRemaining = Math.max(0, Math.floor((eventDate.getTime() - now.getTime()) / 1000));

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-center">{marathon.title}</h2>

      {/* Countdown Timer */}
      {secondsRemaining > 0 ? (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-center mb-4 text-gray-700">
            ⏳ Time Left Until Marathon Starts
          </h3>
          <div className="flex justify-center gap-6 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl shadow-md">
            <CountdownCircleTimer
              isPlaying
              duration={secondsRemaining}
              initialRemainingTime={secondsRemaining}
              colors={[['#3b82f6', 0.4], ['#facc15', 0.3], ['#ef4444', 0.3]]}
              strokeWidth={8}
              size={120}
              trailColor="#e5e7eb"
            >
              {({ remainingTime }) => {
                const days = Math.floor(remainingTime / (60 * 60 * 24));
                const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
                const minutes = Math.floor((remainingTime % (60 * 60)) / 60);

                return (
                  <div className="flex items-center justify-center gap-6">
                    <div className="text-center bg-white shadow-sm rounded-lg px-4 py-2">
                      <div className="text-3xl font-bold text-blue-600">{days}</div>
                      <div className="text-sm font-medium text-gray-500">Days</div>
                    </div>
                    <div className="text-center bg-white shadow-sm rounded-lg px-4 py-2">
                      <div className="text-3xl font-bold text-yellow-600">{hours}</div>
                      <div className="text-sm font-medium text-gray-500">Hours</div>
                    </div>
                    <div className="text-center bg-white shadow-sm rounded-lg px-4 py-2">
                      <div className="text-3xl font-bold text-red-500">{minutes}</div>
                      <div className="text-sm font-medium text-gray-500">Minutes</div>
                    </div>
                  </div>
                );
              }}
            </CountdownCircleTimer>
          </div>
        </div>
      ) : (
        <p className="text-center text-green-600 font-semibold mb-6">
          The marathon has started or passed.
        </p>
      )}

      <img
        src={marathon.image}
        alt={marathon.title}
        className="w-full h-64 object-cover rounded mb-4"
      />

      <div className="mt-4 space-y-2 text-gray-700">
        <p>📍 <span className="font-semibold">Location:</span> {marathon.location}</p>
        <p>🗓️ <span className="font-semibold">Registration:</span> {marathon.registrationStart} - {marathon.registrationEnd}</p>
        <p>🏁 <span className="font-semibold">Event Date:</span> {marathon.eventDate}</p>
        <p>📏 <span className="font-semibold">Distance:</span> {marathon.distance}</p>
        <p>👤 <span className="font-semibold">Organizer:</span> {marathon.organizer}</p>
        <p>💰 <span className="font-semibold">Fee:</span> {marathon.registrationFee}</p>
        <p>👥 <span className="font-semibold">Max Participants:</span> {marathon.participantsLimit}</p>
        <p>✅ <span className="font-semibold">Registered:</span> {marathon.registrationCount || 0}</p>
      </div>

      <p className="mt-4 text-gray-600">
        {marathon.description || "No description available."}
      </p>

      {isRegistrationOpen() ? (
        showRegistrationForm ? (
          <MarathonRegistrationForm marathon={marathon} onRegistered={handleRegistrationSuccess} />
        ) : (
          <Link to={`/marathonsdetails/${id}/apply`}>
            <button className="btn btn-primary mt-6">Register for Marathon</button>
          </Link>
        )
      ) : (
        <p className="mt-4 text-red-500 font-semibold">
          Registration is currently closed.
        </p>
      )}

      {!user && (
        <p className="mt-4 text-blue-600">
          Please <button onClick={() => navigate('/login')} className="underline">login</button> to register.
        </p>
      )}
    </div>
  );
};

export default MarathonSecTionDetal;
