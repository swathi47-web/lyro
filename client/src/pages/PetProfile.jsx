// src/pages/PetProfile.jsx
import React from "react";
import { useParams } from "react-router-dom";

const PetProfile = () => {
  const { id } = useParams();
  // Normally you'd fetch pet details using the id
  return (
    <div className="min-h-screen bg-pink-50 text-purple-900 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-3xl font-bold mb-4">Pet Profile: {id}</h2>
        <p>This is a placeholder for pet details fetched using the ID from the URL.</p>
        <p className="mt-2 text-sm text-gray-500">In real app, you'd fetch detailed info here.</p>
      </div>
    </div>
  );
};

export default PetProfile;
