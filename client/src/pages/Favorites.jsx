// FILE: client/src/pages/Favorites.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [pets, setPets] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFavorites = useCallback(async () => {
    try {
      const favRes = await axios.get("http://localhost:5000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites(favRes.data);

      const petIds = favRes.data.map((f) => f.petId);
      const petDetails = await Promise.all(
        petIds.map((id) => axios.get(`http://localhost:5000/api/pets/${id}`))
      );

      setPets(petDetails.map((res) => res.data));
    } catch (err) {
      console.error("Failed to load favorites:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/favorites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFavorites();
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100 p-6">
      <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">💖 Your Favorite Pets</h2>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {favorites.length === 0 && <p>No favorites yet.</p>}

        {pets.map((pet, index) => (
          <div key={pet._id} className="bg-white rounded-xl shadow-lg p-4">
            <img src={pet.image} alt={pet.breed} className="h-48 w-full object-cover rounded mb-2" />
            <h3 className="text-lg font-bold text-purple-800">{pet.breed}</h3>

            <div className="flex justify-between mt-3">
              <Link
                to={`/pets/${pet._id}`}
                className="bg-pink-500 px-4 py-1 rounded-full text-white text-sm"
              >
                View Details
              </Link>

              <button
                onClick={() => handleRemove(favorites[index]._id)}
                className="bg-red-500 px-4 py-1 rounded-full text-white text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
