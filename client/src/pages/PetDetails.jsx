// ✅ FILE: client/src/pages/PetDetails.jsx (Final version with SOLD + Already Requested logic)
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { useAuth } from "../context/AuthContext";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [pet, setPet] = useState(null);
  const [isAdopted, setIsAdopted] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Fetch pet details
    axios
      .get(`http://localhost:5000/api/pets/${id}`)
      .then((res) => {
        setPet(res.data);
        if (res.data.isAdopted) {
          setIsAdopted(true);
        }
      })
      .catch((err) => console.error("Error fetching pet:", err));

    // Fetch adoption requests to check if already requested
    axios
      .get(`http://localhost:5000/api/adoption-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const already = res.data.find(
          (r) => r.petId?._id === id && r.userId?._id === user._id
        );
        setHasRequested(!!already);
      })
      .catch((err) => console.error("Error checking request status:", err));
  }, [id, token, user]);

  if (!pet) {
    return (
      <div className="text-center mt-20 text-pink-700 font-semibold">
        Pet not found or loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans"
      style={{ backgroundImage: "url('/valentine.bg.jpg')" }}
    >
      <div className="bg-white/70 backdrop-blur-md min-h-screen px-4 py-12 max-w-4xl mx-auto shadow-xl rounded-xl mt-10">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="relative">
            {pet.isAdopted && (
              <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                SOLD
              </div>
            )}
            <img
              src={pet.image}
              alt={pet.breed}
              className="w-full md:w-80 h-80 object-cover rounded-xl shadow-lg"
              data-aos="zoom-in"
            />
          </div>

          <div className="flex-1 space-y-2" data-aos="fade-left">
            <h2 className="text-3xl font-bold text-pink-800">{pet.breed}</h2>
            <p className="text-sm text-gray-700">
              {pet.gender || "N/A"} • {pet.age || "N/A"}
            </p>
            <p className="text-sm text-gray-700">
              Type: {pet.type || "N/A"} • Size: {pet.height || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              {pet.description || "No description available."}
            </p>
            <p className="text-sm text-pink-700 font-medium">
              📍 Location: {pet.location || "N/A"}
            </p>
            <p className="text-md font-semibold text-pink-900">
              Adoption Fee: {pet.fee || "N/A"}
            </p>
            {isAdopted && (
              <p className="text-red-600 font-semibold">❌ This pet has been adopted (Sold)</p>
            )}
          </div>
        </div>

        <div className="mt-8 text-gray-800 space-y-4 text-sm leading-relaxed" data-aos="fade-up">
          <h3 className="text-xl font-bold text-pink-800">About This Pet</h3>
          <p>
            {pet.longDescription ||
              "This wonderful pet is looking for a forever home where love, care, and attention are always present. Whether you're seeking a playful companion or a gentle friend, this pet will make a heartwarming addition to your family."}
          </p>

          <h4 className="text-md font-semibold text-pink-700">Why Adopt?</h4>
          <ul className="list-disc list-inside text-gray-700 pl-4">
            <li>You give a second chance to a loving animal.</li>
            <li>Adoption reduces animal homelessness.</li>
            <li>It's more affordable than buying from breeders.</li>
            <li>You become part of a compassionate community.</li>
          </ul>
        </div>

        <div className="flex justify-between items-center mt-10">
          <Link
            to="/pets"
            className="bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-pink-700 transition"
          >
            ← Back to All Pets
          </Link>

          {isAdopted ? (
            <button
              disabled
              className="bg-gray-400 text-white px-6 py-2 rounded-full text-sm font-semibold cursor-not-allowed"
            >
              Already Adopted 🐶
            </button>
          ) : hasRequested ? (
            <button
              disabled
              className="bg-yellow-500 text-white px-6 py-2 rounded-full text-sm font-semibold cursor-not-allowed"
            >
              Already Requested ❤️
            </button>
          ) : (
            <Link
              to={`/adopt/${pet._id}`}
              className="bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-800 transition"
            >
              Request Adoption ❤️
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetails;












