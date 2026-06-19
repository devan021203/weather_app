import React, { useState } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "b5351ed9a2bbca96fe66051d1271bbf8";

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        setError("City not found");
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h1>🌤 Weather App</h1>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={getWeather}>
            Search
          </button>
        </div>

        {error && <p>{error}</p>}

        {weather && (
  <div className="weather-info">
    <h2 className="city-name">{weather.name}</h2>

    <div className="temperature">
      {Math.round(weather.main.temp)}°
    </div>

    <p className="condition">
      {weather.weather[0].main}
    </p>

    <div className="details">
      <div className="detail-card">
        <h4>Humidity</h4>
        <p>{weather.main.humidity}%</p>
      </div>

      <div className="detail-card">
        <h4>Wind Speed</h4>
        <p>{weather.wind.speed} m/s</p>
      </div>

      <div className="detail-card">
        <h4>Feels Like</h4>
        <p>{Math.round(weather.main.feels_like)}°</p>
      </div>

      <div className="detail-card">
        <h4>Pressure</h4>
        <p>{weather.main.pressure}</p>
      </div>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default Weather;