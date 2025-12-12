import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import AddPet from "./pages/Addpet";
import EditPet from "./pages/EditPet";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pets from "./pages/Pets";
import PetDetails from "./pages/PetDetails";
import AdoptionRequest from "./pages/AdoptionRequest";
import Favorites from "./pages/Favorites";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";


import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/pets"
          element={
            <PrivateRoute>
              <Pets />
            </PrivateRoute>
          }
        />
        <Route
          path="/pets/:id"
          element={
            <PrivateRoute>
              <PetDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/adopt/:id"
          element={
            <PrivateRoute>
              <AdoptionRequest />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* ✅ NEW ROUTES for Admin */}
        <Route
          path="/admin/add-pet"
          element={
            <PrivateRoute>
              <AddPet />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-pet/:id"
          element={
            <PrivateRoute>
              <EditPet />
            </PrivateRoute>
          }
        />
        
      </Routes>
      <Footer />
    </AuthProvider>
  );
};

export default App;

















































