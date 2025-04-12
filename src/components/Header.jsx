import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 hover:text-green-700 transition"
        >
          Travel Memory
        </Link>
        <button
          onClick={() => navigate("/addexperience")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Experience
        </button>
      </div>
    </header>
  );
}
