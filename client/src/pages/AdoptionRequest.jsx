// ✅ FILE: client/src/pages/AdoptionRequest.jsx (Final fix with success/error messages and colorful background)
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AdoptionRequest = () => {
  const { id: petId } = useParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/adoption-requests",
        { petId, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStatus("success");
      setTimeout(() => navigate("/user-dashboard"), 1500);
    } catch (err) {
      if (err?.response?.status === 400 && err.response.data?.error?.includes("already")) {
        setStatus("duplicate");
      } else {
        setStatus("error");
      }
      console.error("❌ Error submitting request:", err);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6"
    >
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">📋 Adoption Request</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-4"
      >
        <textarea
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Why do you want to adopt this pet?"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
        >
          Submit Request
        </button>
        {status === "success" && (
          <p className="text-green-600 text-sm">✅ Request submitted successfully!</p>
        )}
        {status === "duplicate" && (
          <p className="text-yellow-600 text-sm">⚠️ You've already submitted a request for this pet.</p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-sm">❌ Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default AdoptionRequest;
















