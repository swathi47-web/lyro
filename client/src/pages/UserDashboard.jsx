// FILE: client/src/pages/UserDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("favorites");

  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const favRes = await axios.get("http://localhost:5000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const petIds = favRes.data.map((f) => f.petId);

      const favPetDetails = await Promise.all(
        petIds.map((id) => axios.get(`http://localhost:5000/api/pets/${id}`))
      );

      setFavorites(favPetDetails.map((res) => res.data));

      const reqRes = await axios.get("http://localhost:5000/api/adoption-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userReq = reqRes.data.filter((r) => r.userId?._id === user?._id);
      setRequests(userReq);

    } catch (err) {
      console.error("Loading dashboard failed:", err);
    }
  }, [token, user?._id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRemoveFavorite = async (petId) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${petId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const handleCancelRequest = async (reqId) => {
    if (!window.confirm("Cancel this request?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/adoption-requests/${reqId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Error canceling request:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/valentine.bg.jpg')" }}
    >
      <h2 className="text-4xl font-bold text-center text-pink-800 mb-6">
        Welcome, {user?.name || "User"}! 💖
      </h2>

      <div className="bg-white/70 backdrop-blur-lg rounded-2xl p-4 max-w-6xl mx-auto">
        {/* Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === "favorites"
                ? "bg-pink-600 text-white"
                : "bg-white text-pink-600 border"
            }`}
            onClick={() => setActiveTab("favorites")}
          >
            Favorites
          </button>

          <button
            className={`px-6 py-2 rounded-full ${
              activeTab === "requests"
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border"
            }`}
            onClick={() => setActiveTab("requests")}
          >
            Adoption Requests
          </button>
        </div>

        {/* Favorites */}
        {activeTab === "favorites" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((pet) => (
              <div key={pet._id} className="bg-pink-50 p-3 rounded-xl shadow">
                <img src={pet.image} className="h-40 w-full object-cover mb-2 rounded" />

                <h4 className="font-bold">{pet.breed}</h4>

                <div className="flex justify-center gap-2 mt-2">
                  <Link to={`/pets/${pet._id}`} className="bg-pink-500 text-white px-3 py-1 rounded-full">
                    View
                  </Link>

                  <button
                    onClick={() => handleRemoveFavorite(pet._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Requests */}
        {activeTab === "requests" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {requests.map((req) => (
              <div key={req._id} className="bg-purple-50 p-3 rounded-xl shadow">
                <p><strong>Breed:</strong> {req.petId?.breed}</p>

                <p><strong>Status:</strong> {req.status}</p>

                <div className="flex justify-between mt-2">
                  <Link
                    to={`/pets/${req.petId?._id}`}
                    className="bg-purple-600 text-white px-3 py-1 rounded-full"
                  >
                    View Pet
                  </Link>

                  {req.status !== "Approved" && (
                    <button
                      onClick={() => handleCancelRequest(req._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-full"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
