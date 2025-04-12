// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddExperience from "./pages/AddExperience";
import ExperienceDetails from "./pages/ExperienceDetails";
import Header from "./components/Header";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addexperience" element={<AddExperience />} />
        <Route path="/experiencedetails/:id" element={<ExperienceDetails />} />
      </Routes>
    </div>
  );
}
