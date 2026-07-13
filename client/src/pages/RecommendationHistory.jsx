import { useEffect, useState } from "react";
import { getRecommendations, deleteRecommendation } from "../services/recommendationService";

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

  const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this recommendation?"
  );

  if (!confirmDelete) return;

  try {
    await deleteRecommendation(id);

    setRecommendations((prev) =>
      prev.filter((item) => item._id !== id)
    );

    alert("✅ Recommendation deleted successfully.");
  } catch (error) {
    console.error(error);
    alert("❌ Failed to delete recommendation.");
  }
};

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
  className="bg-white border border-green-200 rounded-xl shadow-md p-6 hover:shadow-xl transition"
>
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold text-green-700">
      🌱 {item.crop}
    </h2>

    <span className="text-sm text-gray-500">
      {new Date(item.createdAt).toLocaleDateString()}
    </span>
  </div>

  <div className="grid grid-cols-2 gap-4 text-gray-700">

    <p><strong>📍 City:</strong> {item.city}</p>

    <p><strong>🌡 Temperature:</strong> {item.temperature} °C</p>

    <p><strong>💧 Humidity:</strong> {item.humidity}%</p>

    <p><strong>🌧 Rainfall:</strong> {item.rainfall} mm</p>

    <p><strong>🧪 pH:</strong> {item.ph}</p>

    <p><strong>🌱 Nitrogen:</strong> {item.nitrogen}</p>

    <p><strong>🧪 Phosphorus:</strong> {item.phosphorus}</p>

    <p><strong>🪴 Potassium:</strong> {item.potassium}</p>

  </div>

  <div className="mt-4 text-sm text-gray-500">
    🕒 {new Date(item.createdAt).toLocaleString()}
  </div>

  <div className="mt-5 flex justify-end">
  <button
    onClick={() => handleDelete(item._id)}
    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
  >
    🗑 Delete
  </button>
</div>
</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendationHistory;