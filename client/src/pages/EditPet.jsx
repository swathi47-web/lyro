// ✅ FILE: client/src/pages/EditPet.jsx (with extended validation)
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPet = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    breed: "",
    type: "",
    gender: "",
    age: "",
    fee: "",
    location: "",
    height: "",
    description: "",
    longDescription: "",
    image: "",
  });

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pets/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Failed to load pet", err));
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!form.breed) newErrors.breed = "Breed is required";
    if (!form.type) newErrors.type = "Type is required";
    if (!form.age || isNaN(form.age) || parseInt(form.age) <= 0)
      newErrors.age = "Age must be a valid number";
    if (!form.fee || isNaN(form.fee)) newErrors.fee = "Fee must be a number";
    if (!form.gender || !["Male", "Female", "Other"].includes(form.gender))
      newErrors.gender = "Gender must be Male, Female, or Other";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.image || !/\.(jpeg|jpg|png|webp|gif)$/i.test(form.image))
      newErrors.image = "Image must be a valid image URL (jpg, png, etc.)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.put(`http://localhost:5000/api/admin/pets/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Pet updated successfully");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error("Error updating pet", err);
      alert("Failed to update pet");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 px-4 py-10 font-sans">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-2xl font-bold text-center text-pink-700 mb-6">Edit Pet 📝</h2>
        <form onSubmit={handleSubmit} className="grid gap-4">
          {[
            { label: "Breed", name: "breed" },
            { label: "Type (Dog, Cat, etc.)", name: "type" },
            { label: "Gender", name: "gender" },
            { label: "Age", name: "age" },
            { label: "Adoption Fee", name: "fee" },
            { label: "Location", name: "location" },
            { label: "Height / Size", name: "height" },
            { label: "Image URL", name: "image" },
          ].map((field) => (
            <div key={field.name}>
              <input
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                placeholder={field.label}
                className="px-4 py-2 border rounded w-full"
              />
              {errors[field.name] && (
                <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Short Description"
            className="px-4 py-2 border rounded"
          ></textarea>

          <textarea
            name="longDescription"
            value={form.longDescription}
            onChange={handleChange}
            placeholder="Long Description"
            className="px-4 py-2 border rounded"
          ></textarea>

          <button
            type="submit"
            className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
          >
            Update Pet
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPet;



