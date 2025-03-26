import React, { useState } from "react";
import axios from "axios";

function App() {
  // State for input fields
  const [area, setArea] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [location, setLocation] = useState("");
  const [age, setAge] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle API Call
  const handlePredict = async () => {
    setLoading(true);
    setError("");
    setPrediction(null);

    if (!area || !bedrooms || !location || !age) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/predict/", {
        params: { area, bedrooms, location, age },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Server Error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-300 p-8 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">🏡 House Price Predictor</h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Area (sq ft)"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
          <input
            type="number"
            placeholder="Bedrooms"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
          <input
            type="number"
            placeholder="Location (1-3)"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age (years)"
            className="w-full p-3 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <button
            onClick={handlePredict}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict"}
          </button>

          {/* Show error message */}
          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Show prediction */}
          {prediction && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
              <h3 className="text-lg font-semibold">💰 Predicted Price:</h3>
              <p className="text-2xl font-bold">${prediction.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
