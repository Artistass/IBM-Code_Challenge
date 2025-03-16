import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import NavBar from "./components/NavBar/NavBar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails.jsx";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails.jsx";
import MoreWeatherDays from "./components/MoreWeatherDays/MoreWeatherDays.jsx";
import MostViewedPlaces from "./components/MostViewedPlaces/MostViewedPlaces.jsx";
import YourMostViewedPlaces from "./components/YourMostViewedPlaces/YourMostViewedPlaces.jsx";
import BrowserHistory from "./components/BrowserHistory/BrowserHistory.jsx";

const API = "http://localhost:5000";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const [selectedPlaceWeather, setSelectedPlaceWeather] = useState(null);
  const [moreWeatherDays, setMoreWeatherDays] = useState(null);
  const [mostViewedPlaces, setMostViewedPlaces] = useState([]);
  const [yourMostViewedPlaces, setYourMostViewedPlaces] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchPlaces();
  }, []);

  useEffect(() => {
    if (places.length > 0) {
      mostViewed();
    }
  }, [places]);

  useEffect(() => {
    const storedPlaces =
      JSON.parse(localStorage.getItem("Your most viewed places")) || [];
    setYourMostViewedPlaces(storedPlaces);
  }, []);

  // Fetch list of places
  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/places`);
      setPlaces(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch details of a selected place by its city-code
  const fetchPlaceDetails = async (code) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/places/${code}`);
      setSelectedPlaceDetails(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle selection of place
  const handlePlaceSelection = (placeName) => {
    const selectedPlace = places.find((place) => place.name === placeName);
    if (selectedPlace) {
      setSearch("");
      fetchPlaceDetails(selectedPlace.code); // Fetch place details

      // Log the city selection
      logCitySelection(selectedPlace); // Pass the city name to the log function

      // Update the local storage with viewed places and view count
      updateMostViewedPlaces(selectedPlace);
    }
  };

  const fetchWeatherData = async (code, type = "current") => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(
        `${API}/places/${code}/forecasts/long-term`
      );

      if (type === "current") {
        setSelectedPlaceWeather(data.forecastTimestamps[0]); // First item (current weather)
      } else if (type === "5-day") {
        const now = new Date();
        const fiveDaysForecast = data.forecastTimestamps
          .filter((forecast) => {
            const forecastDate = new Date(forecast.forecastTimeUtc);
            return forecastDate > now && forecastDate.getHours() === 12; // Get mid-day forecasts
          })
          .slice(0, 5);

        setMoreWeatherDays(fiveDaysForecast);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const mostViewed = async () => {
    const mostPlaces = [...places].sort(() => 0.5 - Math.random());
    setMostViewedPlaces(mostPlaces.slice(0, 3));
  };

  const updateMostViewedPlaces = (place) => {
    let storedPlaces =
      JSON.parse(localStorage.getItem("Your most viewed places")) || [];

    // Find if the place already exists in storedPlaces
    const existingPlace = storedPlaces.find((p) => p.code === place.code);

    if (existingPlace) {
      // If the place exists, increase the view count
      existingPlace.viewCount += 1;
    } else {
      // If the place is new, add it with an initial count of 1
      storedPlaces.push({ ...place, viewCount: 1 });
    }

    // Sort places by view count (highest first)
    storedPlaces = storedPlaces
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 100);

    // Save back to localStorage
    localStorage.setItem(
      "Your most viewed places",
      JSON.stringify(storedPlaces)
    );

    // Update state
    setYourMostViewedPlaces(storedPlaces);
  };

  async function logCitySelection(place) {
    if (!place || !place.code) {
      console.error("Invalid place data:", place);
      return;
    }

    const now = new Date();
    const formattedTime = `${now.getDate()}.${
      now.getMonth() + 1
    }d. ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}h.`;

    console.log("Sending data:", {
      code: place.code,
      timestamp: formattedTime,
    });

    try {
      const response = await axios.post(`${API}/log-city-selection`, {
        code: place.code,
        timestamp: formattedTime,
      });

      console.log("Response from server:", response.data);

      setLogs((prevLogs) => [...prevLogs, `${place.name} at ${formattedTime}`]);
    } catch (error) {
      console.error("Error logging city selection:", error);
    }
  }

  return (
    <div>
      {(loading || error) && (
        <div className="message-container">
          <p>{loading ? "Loading..." : error}</p>
        </div>
      )}

      <NavBar />
      <div className="app-container">
        <SearchBar
          search={search}
          setSearch={setSearch}
          places={places}
          handlePlaceSelection={handlePlaceSelection}
        />

        {selectedPlaceDetails && (
          <PlaceDetails
            place={selectedPlaceDetails}
            fetchWeather={fetchWeatherData}
          />
        )}

        {selectedPlaceWeather && (
          <WeatherDetails
            weather={selectedPlaceWeather}
            fetchMoreWeatherDays={() =>
              fetchWeatherData(selectedPlaceDetails.code, "5-day")
            }
          />
        )}

        {moreWeatherDays && (
          <MoreWeatherDays
            weatherDays={moreWeatherDays}
            close={() => setMoreWeatherDays(null)}
          />
        )}

        <MostViewedPlaces places={mostViewedPlaces} />
        <YourMostViewedPlaces places={yourMostViewedPlaces} />

        <BrowserHistory logs={logs} />
      </div>

      <Footer />
    </div>
  );
}

export default App;
