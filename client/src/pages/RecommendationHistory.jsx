import { useEffect, useState } from "react";
import { getRecommendations, deleteRecommendation } from "../services/recommendationService";

function RecommendationHistory() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const recommendationsPerPage = 5;

  const fetchRecommendations = async () => {
  try {
    setLoading(true);

    const data = await getRecommendations();
    setRecommendations(data.recommendations);

  } catch (error) {
    console.error(error);
    alert("Failed to load recommendation history");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
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

const filteredRecommendations = recommendations
  .filter((item) =>
    item.crop.toLowerCase().includes(search.toLowerCase()) ||
    item.city.toLowerCase().includes(search.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }

    return new Date(a.createdAt) - new Date(b.createdAt);
  });


  const indexOfLastRecommendation = currentPage * recommendationsPerPage;
  const indexOfFirstRecommendation =
  indexOfLastRecommendation - recommendationsPerPage;

  const currentRecommendations = filteredRecommendations.slice(
  indexOfFirstRecommendation,
  indexOfLastRecommendation
  );

const totalPages = Math.ceil(
  filteredRecommendations.length / recommendationsPerPage
);  

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold text-green-700">
    📜 Recommendation History
  </h1>

  <div className="flex gap-3">

    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
      Total: {filteredRecommendations.length}
    </span>

    <button
      onClick={fetchRecommendations}
      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
    >
      🔄 Refresh
    </button>

  </div>

</div>

   <div className="mb-6 flex gap-3">

  <input
    type="text"
    placeholder="🔍 Search by crop or city..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  />

  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    <option value="newest">🆕 Newest</option>
    <option value="oldest">📜 Oldest</option>
  </select>

  <button
    onClick={() => setSearch("")}
    className="bg-gray-600 text-white px-5 rounded-lg hover:bg-gray-700 transition"
  >
    ❌ Clear
  </button>

</div>

      {recommendations.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded">
          No recommendations found.
        </div>
      ) : (
        <div className="grid gap-4">
  {filteredRecommendations.length === 0 ? (
    <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg text-center">
      🔍 No recommendations found for "<strong>{search}</strong>"
    </div>
  ) : (
    currentRecommendations.map((item) => (
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
          ))
        )}
</div>
)}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">

          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            ⬅ Previous
          </button>

  <div className="flex gap-2">
  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-2 rounded-lg transition ${
        currentPage === index + 1
          ? "bg-green-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {index + 1}
    </button>
  ))}
</div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Next ➡
          </button>

        </div>
      )}

    </div>
  );
}

export default RecommendationHistory;