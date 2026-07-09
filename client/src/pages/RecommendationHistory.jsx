import { useEffect, useState } from "react";
import { getRecommendations } from "../services/recommendationService";

function RecommendationHistory() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getRecommendations();
        setRecommendations(data.recommendations);
      } catch (error) {
        console.error(error);
        alert("Failed to load recommendation history");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-6">
        📜 Recommendation History
      </h1>

      {recommendations.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded">
          No recommendations found.
        </div>
      ) : (
        <div className="grid gap-4">
          {recommendations.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow rounded-lg p-5 border"
            >
              <h2 className="text-2xl font-bold text-green-700">
                🌱 {item.crop}
              </h2>

              <p><strong>📍 City:</strong> {item.city}</p>
              <p><strong>🌡 Temperature:</strong> {item.temperature} °C</p>
              <p><strong>💧 Humidity:</strong> {item.humidity}%</p>
              <p><strong>🌧 Rainfall:</strong> {item.rainfall} mm</p>
              <p><strong>🧪 Soil pH:</strong> {item.ph}</p>

              <p className="text-sm text-gray-500 mt-3">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendationHistory;