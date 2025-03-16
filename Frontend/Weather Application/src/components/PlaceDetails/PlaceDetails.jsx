import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/PlaceDetails.sass";
import WeatherDetails from "../WeatherDetails/WeatherDetails.jsx";

const PlaceDetails = ({ place, fetchWeather }) => {
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherDetails = (placeCode) => {
    fetchWeather(placeCode, "current")
      .then((data) => {
        setWeatherData(data);
        setShowWeather(true); // Show weather details when data is fetched
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  return (
    <div className="place-details d-flex justify-content-center align-items-center flex-wrap pt-5 pb-5">
      <button
        onClick={() => fetchWeatherDetails(place.code)}
        className="place-details-button d-flex flex-column justify-content-center align-items-center text-center p-3"
      >
        <p className="place-details-name m-0 ps-3"> {place.name}</p>
        <p className="place-details-division text-start m-0 ps-3">
          {" "}
          {place.administrativeDivision}
        </p>
        <p className="place-details-coordinates text-start m-0 ps-3">
          Lat.: {place.coordinates.latitude} Long.:{" "}
          {place.coordinates.longitude}
        </p>
      </button>

      {/* Conditionally render WeatherDetails with animation */}
      {showWeather && weatherData && (
        <WeatherDetails weather={weatherData} fetchMoreWeatherDays={() => {}} />
      )}
    </div>
  );
};

export default PlaceDetails;
