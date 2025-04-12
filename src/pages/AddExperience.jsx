import React, { useState } from "react";
import api from "../api";

export default function AddExperience() {
  const [loading, setLoading] = useState(false);
  const [formdata, setFormdata] = useState({
    tripName: "",
    startDateOfJourney: "",
    endDateOfJourney: "",
    nameOfHotels: "",
    placesVisited: "",
    totalCost: 0,
    experience: "",
    image: "",
    tripType: "",
    featured: false,
    shortDescription: "",
  });

  const submitForm = async () => {
    setLoading(true);
    try {
      await api.post("/trip", formdata);
      alert("Trip submitted!");
    } catch (error) {
      alert("Error submitting trip.");
    }
    setLoading(false);
  };

  if (loading) return <div className="text-center p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Travel Experience
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* All input fields here */}
        <div>
          <label className="block text-gray-700 mb-1">Trip Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={formdata.tripName}
            onChange={(e) =>
              setFormdata({ ...formdata, tripName: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Trip Type</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={formdata.tripType}
            onChange={(e) =>
              setFormdata({ ...formdata, tripType: e.target.value })
            }
          >
            <option value="">Select One</option>
            <option value="backpacking">Backpacking</option>
            <option value="leisure">Leisure</option>
            <option value="business">Business</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Start Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={formdata.startDateOfJourney}
            onChange={(e) =>
              setFormdata({ ...formdata, startDateOfJourney: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">End Date</label>
          <input
            type="date"
            className="w-full border px-3 py-2 rounded"
            value={formdata.endDateOfJourney}
            onChange={(e) =>
              setFormdata({ ...formdata, endDateOfJourney: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Name of Hotels</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={formdata.nameOfHotels}
            onChange={(e) =>
              setFormdata({ ...formdata, nameOfHotels: e.target.value })
            }
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Total Cost (₹)</label>
          <input
            type="number"
            className="w-full border px-3 py-2 rounded"
            value={formdata.totalCost}
            onChange={(e) =>
              setFormdata({ ...formdata, totalCost: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-700 mb-1">Places Visited</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="Paris, London, Delhi..."
            value={formdata.placesVisited}
            onChange={(e) =>
              setFormdata({ ...formdata, placesVisited: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            placeholder="https://example.com/image.jpg"
            value={formdata.image}
            onChange={(e) =>
              setFormdata({ ...formdata, image: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-700 mb-1">Short Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="2"
            value={formdata.shortDescription}
            onChange={(e) =>
              setFormdata({ ...formdata, shortDescription: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-700 mb-1">Full Experience</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows="5"
            value={formdata.experience}
            onChange={(e) =>
              setFormdata({ ...formdata, experience: e.target.value })
            }
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-gray-700 mb-2">Featured Trip?</label>
          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="featured"
                value={true}
                checked={formdata.featured === true}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    featured: JSON.parse(e.target.value),
                  })
                }
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="featured"
                value={false}
                checked={formdata.featured === false}
                onChange={(e) =>
                  setFormdata({
                    ...formdata,
                    featured: JSON.parse(e.target.value),
                  })
                }
              />
              No
            </label>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          onClick={submitForm}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
