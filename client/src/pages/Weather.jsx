import { useState } from "react";
import { getWeather } from "../services/weatherService";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      alert("Enter a city name");
      return;
    }

    try {
    const data = await getWeather(city);
    setWeather(data);
    } catch (error) {
    console.log(error.response);
    alert("City not found");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          🌦 Weather Search
        </h1>

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border rounded-lg p-3"
        />

        <button
          onClick={handleSearch}
          className="w-full mt-4 bg-green-700 text-white py-3 rounded-lg"
        >
          Search Weather
        </button>

        {weather && (
  <div className="mt-8 bg-green-100 rounded-xl p-6 shadow-lg">

    <h2 className="text-3xl font-bold text-center text-green-700">
      📍 {weather.name}
    </h2>

    <p className="text-center text-xl mt-2">
      {weather.weather[0].main}
    </p>

    <div className="grid grid-cols-2 gap-4 mt-6">

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">🌡 Temperature</h3>
        <p>{weather.main.temp} °C</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">🤗 Feels Like</h3>
        <p>{weather.main.feels_like} °C</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">💧 Humidity</h3>
        <p>{weather.main.humidity}%</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">🌬 Wind</h3>
        <p>{weather.wind.speed} m/s</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">👁 Visibility</h3>
        <p>{weather.visibility} m</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-bold">📈 Pressure</h3>
        <p>{weather.main.pressure} hPa</p>
      </div>

    </div>

  </div>
)}

      </div>
    </div>
  );
}

export default Weather;