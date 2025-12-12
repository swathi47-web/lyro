import React from "react";

const FilterBar = ({ filters, setFilters, sort, setSort }) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center bg-white p-4 rounded-lg shadow mb-6">
      <input
        type="text"
        placeholder="Search by name or breed"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="border p-2 rounded w-64"
      />

      <select
        value={filters.type}
        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Types</option>
        <option value="Dog">Dog</option>
        <option value="Cat">Cat</option>
      </select>

      <select
        value={filters.gender}
        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>

      <select
        value={filters.location}
        onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Locations</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Chennai">Chennai</option>
        <option value="Delhi">Delhi</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sort By</option>
        <option value="age">Age</option>
        <option value="fee">Fee</option>
      </select>
    </div>
  );
};

export default FilterBar;

console.log("FilterBar is rendering");
