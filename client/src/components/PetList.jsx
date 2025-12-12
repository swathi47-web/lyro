import React from "react";

const PetList = ({ pets }) => {
  if (!pets.length) {
    return <p className="text-center text-gray-500">No pets available for adoption at the moment.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <div key={pet.id} className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition-all">
          <img
            src={pet.image}
            alt={`${pet.breed}`}
            className="w-full h-48 object-cover rounded-xl mb-4"
          />
          <h3 className="text-xl font-semibold text-blue-700">{pet.breed}</h3>
          <p className="text-gray-700">{pet.gender} • {pet.age}</p>
          <p className="text-sm text-gray-500 mt-1">{pet.description}</p>
          <div className="mt-3 text-sm text-gray-600">Fee: <span className="font-medium text-black">{pet.fee}</span></div>
          <div className="text-sm text-gray-500">📍 {pet.location}</div>
        </div>
      ))}
    </div>
  );
};

export default PetList;


