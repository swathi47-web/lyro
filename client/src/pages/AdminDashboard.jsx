// FILE: client/src/pages/AdminDashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [pets, setPets] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");

  const fetchData = useCallback(async () => {
    try {
      const [reqRes, petRes, favRes] = await Promise.all([
        axios.get("http://localhost:5000/api/adoption-requests", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/api/pets"),
        axios.get("http://localhost:5000/api/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setRequests(reqRes.data);
      setPets(petRes.data);
      setFavorites(favRes.data);
    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  }, [token]);

  useEffect(() => {
    AOS.init({ duration: 800 });
    fetchData();
  }, [fetchData]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/adoption-requests/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error("Failed to update request status:", err);
    }
  };

  const handleDeletePet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/pets/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Error deleting pet:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6 font-sans text-purple-900"
      style={{ backgroundImage: "url('valentine.bg.jpg')" }}
    >
      <h2 className="text-4xl font-bold text-center text-pink-800 mb-6">
        Admin Dashboard 🛠️
      </h2>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            activeTab === "requests"
              ? "bg-pink-600 text-white"
              : "bg-white text-pink-600 border border-pink-600"
          }`}
          onClick={() => setActiveTab("requests")}
        >
          Adoption Requests
        </button>

        <button
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            activeTab === "pets"
              ? "bg-purple-600 text-white"
              : "bg-white text-purple-600 border border-purple-600"
          }`}
          onClick={() => setActiveTab("pets")}
        >
          Pets
        </button>

        <button
          className={`px-6 py-2 rounded-full font-semibold text-sm ${
            activeTab === "favorites"
              ? "bg-fuchsia-600 text-white"
              : "bg-white text-fuchsia-600 border border-fuchsia-600"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </button>
      </div>

      {/* Requests */}
      {activeTab === "requests" && (
        <div className="bg-white rounded-2xl p-6 mb-10 shadow-xl">
          <h3 className="text-2xl font-semibold text-pink-700 mb-4">
            📋 Adoption Requests
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-pink-50 p-4 rounded-xl shadow-md"
                data-aos="fade-up"
              >
                <p><strong>Pet:</strong> {req.petId?.breed}</p>
                <p><strong>User:</strong> {req.name || req.userId?.name}</p>
                <p><strong>Status:</strong> {req.status}</p>
                <select
                  value={req.status}
                  onChange={(e) => handleStatusUpdate(req._id, e.target.value)}
                  className="mt-2 px-3 py-1 border rounded text-sm"
                >
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
                <button
                  onClick={() => handleDeletePet(req.petId)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete Pet
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pets */}
      {activeTab === "pets" && (
        <div className="bg-white rounded-2xl p-6 mb-10 shadow-xl">
          <h3 className="text-2xl font-semibold text-purple-700 mb-4">
            🐾 All Pets
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {pets.map((pet) => (
              <div
                key={pet._id}
                className="bg-purple-50 p-4 rounded-xl shadow-md"
                data-aos="fade-up"
              >
                <img
                  src={pet.image}
                  alt={pet.breed}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Age:</strong> {pet.age}</p>
                <p><strong>Status:</strong> {pet.status}</p>
                <Link
                  to={`/edit-pet/${pet._id}`}
                  className="mt-3 inline-block bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeletePet(pet._id)}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Favorites */}
      {activeTab === "favorites" && (
        <div className="bg-white rounded-2xl p-6 mb-10 shadow-xl">
          <h3 className="text-2xl font-semibold text-fuchsia-700 mb-4">
            ⭐ Favorite Pets
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {favorites.map((fav) => (
              <div
                key={fav._id}
                className="bg-fuchsia-50 p-4 rounded-xl shadow-md"
                data-aos="fade-up"
              >
                <p><strong>Pet ID:</strong> {fav.petId}</p>
                <p><strong>User:</strong> {fav.userId?.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
