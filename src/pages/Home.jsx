import React, { useEffect, useState } from "react";
import api from "../api";
import Card from "../components/Card";
import AnimatedFace from "../components/AnimatedFace"; // Make sure this path matches your structure

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await api.get("/trip");
      setData(res.data);
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/trip/${id}`);
      fetchData();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("Error deleting experience.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg">Loading experiences...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Your Travel Experiences
      </h2>

      {data.length === 0 ? (
        <div className="text-center flex flex-col items-center">
          <AnimatedFace />
          <p className="text-gray-600 mt-6 mb-4 text-lg">
            No experiences found.
          </p>
          <a
            href="/addexperience"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            ➕ Add Experience
          </a>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((exp) => (
            <Card key={exp._id} experience={exp} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
