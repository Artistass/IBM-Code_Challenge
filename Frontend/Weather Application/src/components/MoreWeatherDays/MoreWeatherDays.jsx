import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/MoreWeatherDays.sass";
import { useState, useEffect } from "react";

const MoreWeatherDays = ({ weatherDays, close }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="more-weather-days-container p-5">
      <h3 className="forecast-text text-center mb-4">5-Day Forecast</h3>
      <p className="info-text text-center">
        Forecasts are selected for 12:00 PM each day over the next 5 days.
      </p>
      {/* Desktop Table */}
      {!isMobile ? (
        <table className="table table-striped table-bordered text-center">
          <thead>
            <tr>
              <th>Date (dd/mm)</th>
              <th>Temperature (°C)</th>
              <th>Feels Like (°C)</th>
              <th>Wind (m/s)</th>
              <th>Precipitation (mm)</th>
              <th>Condition</th>
              <th>Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {weatherDays.map((day, index) => (
              <tr key={index}>
                <td>
                  {new Date(day.forecastTimeUtc).toLocaleDateString("en-GB", {
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </td>
                <td>{day.airTemperature}</td>
                <td>{day.feelsLikeTemperature}</td>
                <td>{day.windSpeed}</td>
                <td>{day.totalPrecipitation}</td>
                <td>
                  {day.conditionCode
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </td>
                <td>{day.relativeHumidity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Mobile
        <div className="mobile-weather-cards d-flex flex-column gap-3 mb-4">
          {weatherDays.map((day, index) => (
            <div
              key={index}
              className="weather-card d-flex flex-column p-3 ps-4 pe-4"
            >
              <p className="d-flex justify-content-between mb-2">
                <strong>Date:</strong>{" "}
                {new Date(day.forecastTimeUtc).toLocaleDateString("en-GB", {
                  month: "2-digit",
                  day: "2-digit",
                })}
              </p>
              <hr className="m-0 p-0" />
              <p className="d-flex justify-content-between mb-2">
                <strong>Temp:</strong> {day.airTemperature}°C
              </p>
              <hr className="m-0 p-0" />
              <p className="d-flex justify-content-between mb-2">
                <strong>Feels Like:</strong> {day.feelsLikeTemperature}°C
              </p>
              <hr className="m-0 p-0" />
              <p className="d-flex justify-content-between mb-2">
                <strong>Wind:</strong> {day.windSpeed} m/s
              </p>
              <hr className="m-0 p-0" />
              <p className="d-flex justify-content-between mb-2">
                <strong>Precipitation:</strong> {day.totalPrecipitation} mm
              </p>
              <hr className="m-0 p-0" />
              <p className="d-flex justify-content-between mb-2">
                <strong>Condition:</strong>{" "}
                {day.conditionCode
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
              <hr className="m-0 p-0" />
              <p className="d-flex justify-content-between mb-2">
                <strong>Humidity:</strong> {day.relativeHumidity}%
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <button
          className="close-button p-2 ps-5 pe-5 mb-2 mt-1"
          onClick={close}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default MoreWeatherDays;
