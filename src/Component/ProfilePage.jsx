import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [createdCount, setCreatedCount] = useState(0);
  const [appliedCount, setAppliedCount] = useState(0);

  useEffect(() => {
    // Fetch total marathons created by user
    fetch(`https://marathon-server-azure.vercel.app/marathons?createdBy=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setCreatedCount(data.length))
      .catch(() => setCreatedCount(0));

    // Fetch total marathons user applied for
    fetch(`https://marathon-server-azure.vercel.app/registrations?email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => setAppliedCount(data.length))
      .catch(() => setAppliedCount(0));
  }, [user.email]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="flex items-center space-x-6 mb-8">
        <img
          src={user.photoURL || "https://via.placeholder.com/100"}
          alt="Profile"
          className="rounded-full w-24 h-24 object-cover"
        />
        <div>
          <p className="text-xl font-semibold">{user.displayName || "No Name Provided"}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-2xl font-bold">{createdCount}</p>
          <p className="text-gray-600">Marathons Created</p>
        </div>
        <div className="p-4 bg-gray-100 rounded shadow text-center">
          <p className="text-2xl font-bold">{appliedCount}</p>
          <p className="text-gray-600">Marathons Registered</p>
        </div>
      </div>

      <div className="space-x-4">
        <Link to="/dashboard/add-marathon" className="btn btn-primary">Add Marathon</Link>
        <Link to="/dashboard/my-marathons" className="btn btn-secondary">My Marathons</Link>
        <Link to="/dashboard/my-applications" className="btn btn-secondary">My Applications</Link>
      </div>
    </div>
  );
};

export default ProfilePage;
