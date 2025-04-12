import React from "react";

export default function Card({ experience, onDelete }) {
  return (
    <div className="bg-white shadow rounded p-4 flex flex-col gap-2">
      <img src={experience.image} alt={experience.tripName} className="w-full h-40 object-cover rounded" />
      <h3 className="text-lg font-semibold">{experience.tripName}</h3>
      <p className="text-sm text-gray-500">{experience.tripType}</p>
      <p className="text-gray-600 text-sm">{experience.shortDescription}</p>
      <div className="flex justify-between mt-2">
        <button className="text-blue-600 text-sm">Edit</button>
        <button onClick={() => onDelete(experience._id)} className="text-red-600 text-sm">Delete</button>
      </div>
    </div>
  );
}
