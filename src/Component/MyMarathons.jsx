import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyMarathons = () => {
  const { user } = useContext(AuthContext);
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMarathons = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://marathon-server-azure.vercel.app/marathons?createdBy=${encodeURIComponent(user.email)}`
      );
      if (!res.ok) throw new Error("Failed to fetch marathons");
      const data = await res.json();
      setMarathons(data);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.email) fetchMarathons();
  }, [user]);

  const confirmDelete = (marathon) => {
    Swal.fire({
      title: `Delete "${marathon.title}"?`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(marathon._id);
      }
    });
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://marathon-server-azure.vercel.app/marathons/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete marathon");

      toast.success("Marathon deleted successfully");
      fetchMarathons();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <div className="text-center py-10 text-lg font-medium">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-primary">My Created Marathons</h2>

      {marathons.length === 0 ? (
        <p className="text-center text-gray-500">No marathons found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marathons.map((m) => (
            <div
              key={m._id}
              className="rounded-xl overflow-hidden shadow-lg group relative border border-gray-200 hover:shadow-2xl transition-all duration-300"
            >
              {/* 📸 Banner Image */}
              <div className="h-40 overflow-hidden relative">
                <img
                  src={m.image || "https://images.unsplash.com/photo-1534447677768-be436bb09401"}
                  alt={m.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-2 left-3 text-white text-xl font-bold z-10 drop-shadow-md">
                  {m.title}
                </h3>
              </div>

              {/* 📄 Info */}
              <div className="p-4 space-y-1 bg-white">
                <p><span className="font-semibold">📍 Location:</span> {m.location || "N/A"}</p>
                <p><span className="font-semibold">📆 Registration:</span> {m.registrationStart ? new Date(m.registrationStart).toLocaleDateString() : "N/A"} ➜ {m.registrationEnd ? new Date(m.registrationEnd).toLocaleDateString() : "N/A"}</p>
                <p><span className="font-semibold">🏁 Event Date:</span> {m.marathonDate ? new Date(m.marathonDate).toLocaleDateString() : "N/A"}</p>
                <p><span className="font-semibold">🛣 Distance:</span> {m.distance || "N/A"}</p>
              </div>

              {/* 🔘 Actions */}
              <div className="p-4 flex justify-between items-center bg-base-100 border-t border-gray-200">
                <Link
                  to={`/dashboard/update-marathon/${m._id}`}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  ✏️ Update
                </Link>
                <button
                  onClick={() => confirmDelete(m)}
                  className="btn btn-sm btn-outline btn-error"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMarathons;