import React from "react";
import { useParams } from "react-router-dom";

export default function ExperienceDetails() {
  const { id } = useParams();
  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Experience Details</h2>
      <p className="text-gray-600">Details for trip ID: {id}</p>
    </div>
  );
}
