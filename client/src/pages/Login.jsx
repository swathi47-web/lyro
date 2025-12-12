// ✅ FILE: client/src/pages/Login.jsx (with role-based redirect and theme)
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", showPassword: false });
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const togglePassword = () => setForm((prev) => ({ ...prev, showPassword: !prev.showPassword }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await login(form.email, form.password);
      const user = res?.user || JSON.parse(localStorage.getItem("user"));

      if (user?.role === "admin") {
        alert("Welcome Admin!");
        navigate("/admin-dashboard");
      } else {
        alert("Welcome back!");
        navigate("/user-dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-10 font-sans"
      style={{ backgroundImage: "url('/valentine.bg.jpg')" }}
    >
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-md w-full space-y-5" data-aos="zoom-in">
        <h2 className="text-3xl font-bold text-center text-pink-700">Login to PetAdopt</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-pink-300 rounded-full focus:ring-2 focus:ring-pink-400"
          />

          <div className="relative">
            <input
              type={form.showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-full focus:ring-2 focus:ring-pink-400"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-4 top-2 text-sm text-pink-500 focus:outline-none"
            >
              {form.showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-full font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;




console.log("Login page loaded");












 













