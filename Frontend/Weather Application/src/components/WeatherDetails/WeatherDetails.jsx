import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/WeatherDetails.sass";

const WeatherDetails = ({ weather, fetchMoreWeatherDays }) => {
  const [isVisible, setIsVisible] = useState(false); // State to manage visibility of weather details

  useEffect(() => {
    if (weather) {
      setIsVisible(true); // Set visibility to true when weather data is available
    }
  }, [weather]);

  return (
    <div
      className={`weather-details-container d-flex justify-content-center align-items-center pt-5 flex-column ${
        isVisible ? "show" : ""
      }`}
    >
      <h3 className="current-weather-text pb-3">Current Weather</h3>
      <p className="weather-text m-0">
        <strong>Last time updated:</strong>
        {new Date(weather.forecastTimeUtc).toLocaleDateString("en-GB", {
          month: "2-digit",
          day: "2-digit",
        })}{" "}
        {new Date(weather.forecastTimeUtc).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        h
      </p>

      <div className="weather-details-info d-flex justify-content-center align-items-start flex-column mb-3 mt-2 p-3">
        <p className="weather-text">
          <strong className="weather-name-text">Temperature:</strong>{" "}
          {weather.airTemperature}°C
        </p>
        <p className="weather-text">
          <strong className="weather-name-text">Feels like:</strong>{" "}
          {weather.feelsLikeTemperature}°C
        </p>
        <p className="weather-text">
          <strong className="weather-name-text">Wind Speed:</strong>{" "}
          {weather.windSpeed} m/s
        </p>
        <p className="weather-text">
          <strong className="weather-name-text">Precipitation:</strong>{" "}
          {weather.totalPrecipitation} mm
        </p>
        <p className="weather-text">
          <strong className="weather-name-text">Condition:</strong>{" "}
          {weather.conditionCode
            ? weather.conditionCode
                .split("-") // Split by hyphen
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
                .join(" ") // Join the words back with spaces
            : "Unknown"}
        </p>

        <p className="weather-text mb-0">
          <strong className="weather-name-text">Humidity:</strong>{" "}
          {weather.relativeHumidity} %
        </p>
      </div>

      <button
        onClick={fetchMoreWeatherDays}
        className="forecast-button p-2 ps-5 pe-5 mb-5"
      >
        5-day Forecast
      </button>
    </div>
  );
};

export default WeatherDetails;
