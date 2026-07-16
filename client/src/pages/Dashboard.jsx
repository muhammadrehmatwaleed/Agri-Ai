import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [stats, setStats] = useState({
    totalRecommendations: 0,
    averageTemperature: 0,
    averageHumidity: 0,
    mostRecommendedCrop: "--",
  });

  const [loading, setLoading] = useState(true);
  const [farmerName, setFarmerName] = useState("Farmer");
  const [recentRecommendations, setRecentRecommendations] = useState([]);
  const [allRecommendations, setAllRecommendations] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();

        setStats({
          totalRecommendations: data.totalRecommendations,
          averageTemperature: data.averageTemperature,
          averageHumidity: data.averageHumidity,
          mostRecommendedCrop: data.mostRecommendedCrop,
        });

        if (data.recentRecommendations) {
          setRecentRecommendations(data.recentRecommendations);
        }

        if (data.allRecommendations) {
        setAllRecommendations(data.allRecommendations);
        }

        const farmer = JSON.parse(localStorage.getItem("farmer"));

        if (farmer) {
        setFarmerName(farmer.name);
       }


      } catch (error) {
        console.error(error);
        alert("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);


  const cropCounts = allRecommendations.reduce((acc, item) => {
  acc[item.crop] = (acc[item.crop] || 0) + 1;
  return acc;
}, {});

const chartData = {
  labels: Object.keys(cropCounts),

  datasets: [
    {
      label: "Crop Recommendations",
      data: Object.values(cropCounts),

      backgroundColor: [
        "#16a34a",
        "#22c55e",
        "#84cc16",
        "#0ea5e9",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
      ],

      borderRadius: 8,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    title: {
      display: true,
      text: "Crop Recommendation Distribution",
      font: {
        size: 18,
      },
    },
  },

  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

  if (loading) {
    return (
      <div className="text-center mt-10 text-2xl font-bold text-green-700">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="bg-linear-to-r from-green-600 to-green-500 text-white p-6 rounded-2xl shadow-lg mb-8">
        

      <h1 className="text-4xl font-bold">
      👋 Welcome, {farmerName}
      </h1>

      <p className="mt-2 text-green-100">
      Here is your AgriAI farming dashboard with your latest crop recommendation statistics.
      </p>

      </div>

      <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-8">
  <h2 className="text-2xl font-bold text-green-700 mb-4">
    📋 Dashboard Summary
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

    <p>
      🌾 <strong>Total Crop Recommendations:</strong>{" "}
      {stats.totalRecommendations}
    </p>

    <p>
      🌡 <strong>Average Temperature:</strong>{" "}
      {stats.averageTemperature} °C
    </p>

    <p>
      💧 <strong>Average Humidity:</strong>{" "}
      {stats.averageHumidity}%
    </p>

    <p>
      🏆 <strong>Top Recommended Crop:</strong>{" "}
      {stats.mostRecommendedCrop}
    </p>

  </div>
</div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

  <Link
    to="/crop"
    className="bg-green-600 text-white p-5 rounded-xl shadow hover:bg-green-700 transition text-center"
  >
    🌾
    <h2 className="text-xl font-bold mt-2">
      Recommend Crop
    </h2>
  </Link>

  <Link
    to="/weather"
    className="bg-blue-600 text-white p-5 rounded-xl shadow hover:bg-blue-700 transition text-center"
  >
    🌦
    <h2 className="text-xl font-bold mt-2">
      Weather
    </h2>
  </Link>

  <Link
    to="/history"
    className="bg-purple-600 text-white p-5 rounded-xl shadow hover:bg-purple-700 transition text-center"
  >
    📜
    <h2 className="text-xl font-bold mt-2">
      History
    </h2>
  </Link>

</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Total Recommendations */}
        <div className="bg-green-100 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">
            🌾 Total Recommendations
          </h2>
          <p className="mt-2 text-green-600 font-semibold">
          📈 Increasing
          </p>

          <p className="text-4xl font-bold text-green-700 mt-4">
            {stats.totalRecommendations}
          </p>
        </div>


        {/* Average Temperature */}
        <div className="bg-blue-100 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">
            🌡 Average Temperature
          </h2>
          <p className="mt-2 text-orange-500 font-semibold">
          🌡 Stable
          </p>

          <p className="text-4xl font-bold text-blue-700 mt-4">
            {stats.averageTemperature}°C
          </p>
        </div>

        {/* Average Humidity */}
        <div className="bg-yellow-100 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">
            💧 Average Humidity
          </h2>
          <p className="mt-2 text-blue-600 font-semibold">
          💧 Normal
          </p>

          <p className="text-4xl font-bold text-yellow-700 mt-4">
            {stats.averageHumidity}%
          </p>
        </div>

        {/* Most Recommended Crop */}
        <div className="bg-purple-100 p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-lg font-semibold text-gray-700">
            🌱 Most Recommended Crop
          </h2>
          <p className="mt-2 text-purple-600 font-semibold">
          🌾 Most Popular
          </p>

          <p className="text-3xl font-bold text-purple-700 mt-4">
            {stats.mostRecommendedCrop}
          </p>
        </div>

  <div className="mt-10 bg-white rounded-2xl shadow-lg p-8 border border-green-100">

  <div className="flex justify-between items-center mb-4">

  <h2 className="text-2xl font-bold text-green-700">
    📜 Recent Recommendations
  </h2>

  <Link
    to="/history"
    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
  >
    View All →
  </Link>

</div>

  {recentRecommendations.length === 0 ? (
    <p className="text-gray-500">
      No recommendations available.
    </p>
  ) : (
    <div className="space-y-4">
      {recentRecommendations.map((item) => (
        <div
          key={item._id}
          className="border border-green-200 rounded-lg p-4 flex justify-between items-center"
        >
          <div>
            <h3 className="font-bold text-green-700">
              🌱 {item.crop}
            </h3>

            <p className="text-gray-600">
              📍 {item.city}
            </p>
          </div>

          <div className="text-sm text-gray-500">
            {new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  )}

</div>


<div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

  <h2 className="text-2xl font-bold text-green-700 mb-6">
    📊 Crop Recommendation Chart
  </h2>

  <div className="h-105">
  <Bar
    data={chartData}
    options={chartOptions}
  />
  </div>

</div>

      </div>

    </div>
  );
}

export default Dashboard;