// src/pages/SearchFilterSort.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchFilterSort = () => {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/pets")
      .then((res) => setPets(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredPets = pets
    .filter(pet =>
      pet.breed.toLowerCase().includes(search.toLowerCase()) ||
      pet.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter(pet => (type ? pet.type === type : true))
    .sort((a, b) => {
      if (sort === "age") return a.age - b.age;
      if (sort === "fee") return a.fee - b.fee;
      return 0;
    });

  return (
    <div className="bg-purple-50 min-h-screen p-6 text-purple-900">
      <h1 className="text-3xl font-bold mb-6 text-center">🐶 Browse Pets</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name or breed"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-purple-300 px-4 py-2 rounded-full focus:ring focus:ring-purple-300"
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="border border-purple-300 px-4 py-2 rounded-full focus:ring focus:ring-purple-300"
        >
          <option value="">All Types</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="border border-purple-300 px-4 py-2 rounded-full focus:ring focus:ring-purple-300"
        >
          <option value="">Sort By</option>
          <option value="age">Age</option>
          <option value="fee">Fee</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredPets.map(pet => (
          <div key={pet._id} className="bg-white rounded-xl shadow-md p-4">
            <img src={pet.image} alt={pet.name} className="rounded-xl w-full h-48 object-cover" />
            <h3 className="text-xl font-semibold mt-2">{pet.name || pet.breed}</h3>
            <p>{pet.type} • {pet.age} • ₹{pet.fee}</p>
            <p className="text-sm text-purple-600 mt-1">{pet.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchFilterSort;
