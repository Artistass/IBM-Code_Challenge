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
  const [places, setPlaces] = useState([]); // All places
  const [selectedPlaceDetails, setSelectedPlaceDetails] = useState(null);
  const [selectedPlaceWeather, setSelectedPlaceWeather] = useState(null);
  const [moreWeatherDays, setMoreWeatherDays] = useState(null);
  const [mostViewedPlaces, setMostViewedPlaces] = useState([]);
  const [yourMostViewedPlaces, setYourMostViewedPlaces] = useState([]);
  const [logs, setLogs] = useState([]);

  // Load initial data
  useEffect(() => {
    fetchPlaces(); // Fetch all available places
  }, []);

   // Update most viewed suggestions
  useEffect(() => {
    if (places.length > 0) {
      mostViewed();
    }
  }, [places]);


  // Load most viewed places from local storage
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

  // On user selecting a place
  const handlePlaceSelection = (placeName) => {
    const selectedPlace = places.find((place) => place.name === placeName);
    if (selectedPlace) {
      setSearch("");
      fetchPlaceDetails(selectedPlace.code); // Show detailed info
      logCitySelection(selectedPlace);  // Log the visit
      updateMostViewedPlaces(selectedPlace); // Track views
    }
  };

   // Fetch weather: current or 5-day forecast
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

  // Select 3 random places from all places
  const mostViewed = async () => {
    const mostPlaces = [...places].sort(() => 0.5 - Math.random());
    setMostViewedPlaces(mostPlaces.slice(0, 3));
  };

  // Track most viewed places in localStorage
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

  // Logs the selected city's code and timestamp to the server
async function logCitySelection(place) {

  // Create a timestamp string: DD.MM HH:mm format
  const now = new Date();
  const formattedTime = `${now.getDate()}.${
    now.getMonth() + 1
  }d. ${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}h.`;

  try {
    // Send POST request to the backend
    await axios.post(`${API}/log-city-selection`, {
      code: place.code,
      timestamp: formattedTime,
    });

    // Add a readable log entry to the UI log state
    setLogs((prevLogs) => [...prevLogs, `${place.name} at ${formattedTime}`]);
  } catch (error) {
    setError("Failed to log city selection.", error.message);
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
