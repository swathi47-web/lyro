// ✅ FILE: client/src/pages/Pets.jsx (Final with in-card messages and sold badge)
import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Pets = () => {
  const { user } = useAuth();
  const [pets, setPets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [favStatus, setFavStatus] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800 });
    axios
      .get("http://localhost:5000/api/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  }, []);

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
      setFavStatus((prev) => ({ ...prev, [petId]: "Added to favorites! ❤️" }));
    } catch (err) {
      if (err.response?.data?.error === "Already in favorites") {
        setFavStatus((prev) => ({ ...prev, [petId]: "Already in favorites ❤️" }));
      } else {
        setFavStatus((prev) => ({ ...prev, [petId]: "Failed to add to favorites." }));
      }
    }
    setTimeout(() => {
      setFavStatus((prev) => ({ ...prev, [petId]: null }));
    }, 2500);
  };

  const filteredPets = pets
    .filter((pet) =>
      pet.breed?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((pet) => (filterType ? pet.type === filterType : true))
    .sort((a, b) => {
      if (sortOption === "age") {
        const ageA = parseFloat(a.age) || 0;
        const ageB = parseFloat(b.age) || 0;
        return ageA - ageB;
      }
      if (sortOption === "fee") {
        const feeA = parseInt(a.fee?.replace(/\D/g, "")) || 0;
        const feeB = parseInt(b.fee?.replace(/\D/g, "")) || 0;
        return feeA - feeB;
      }
      return 0;
    });

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/bg2.jpg')" }}
    >
      <div className="bg-white/70 backdrop-blur-lg min-h-screen px-4 py-10">
        <div className="text-center mb-10 pt-4" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-pink-800 font-serif mb-2">
            Available Pets for Adoption 🐾
          </h1>
          <p className="text-pink-600 text-sm">
            Every paw deserves a home — adopt your new best friend today!
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <input
            type="text"
            placeholder="Search by breed..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">All Types</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Other">Other</option>
          </select>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 border border-pink-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Sort</option>
            <option value="age">Age</option>
            <option value="fee">Fee</option>
          </select>
        </div>

        {/* Pet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {filteredPets.map((pet) => (
            <div
              key={pet._id}
              className="relative bg-white/90 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
              data-aos="zoom-in"
            >
              {pet.isAdopted && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  SOLD
                </div>
              )}

              <img
                src={pet.image}
                alt={pet.breed}
                className="w-full h-65 object-cover"
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

                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    to={`/pets/${pet._id}`}
                    className="bg-pink-600 text-white px-4 py-1.5 rounded-full text-sm hover:bg-pink-700 transition text-center"
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
                  {favStatus[pet._id] && (
                    <p className="text-sm text-purple-700 text-center">{favStatus[pet._id]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPets.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            No pets match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default Pets;




console.log("Pets component loaded");




































