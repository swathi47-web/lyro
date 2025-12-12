import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const PetCard = ({ pet }) => {
  const { user } = useAuth();

  const handleFavorite = async (petId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/favorites/${petId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Added to favorites!");
    } catch (err) {
      console.error("Favorite error:", err);
      alert("Failed to add to favorites.");
    }
  };

  return (
    <div
      className="relative bg-white/90 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
      data-aos="zoom-in"
    >
      {/* SOLD Badge */}
      {pet.isAdopted && (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          SOLD
        </div>
      )}

      <img
        src={pet.image}
        alt={pet.breed}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-pink-800">{pet.breed}</h3>
        <p className="text-sm text-gray-700">
          {pet.gender || "N/A"} • {pet.age || "N/A"}
        </p>
        <p className="text-sm text-gray-700">
          Type: {pet.type || "N/A"} | Height: {pet.height || "N/A"}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          📍 {pet.location || "N/A"}
        </p>
        <p className="text-sm font-semibold text-pink-900 mt-1">
          Fee: {pet.fee || "N/A"}
        </p>

        <div className="flex gap-2 mt-4">
          <Link
            to={`/pets/${pet._id}`}
            className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-pink-700 transition"
          >
            View Details
          </Link>
          {user && !pet.isAdopted && (
            <button
              onClick={() => handleFavorite(pet._id)}
              className="bg-purple-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-purple-700 transition"
            >
              ❤️ Favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;



