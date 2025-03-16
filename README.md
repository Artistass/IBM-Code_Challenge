![IBM_logo](https://github.com/user-attachments/assets/2206fad0-3e53-4052-bf79-d1e1a72bebbe)

CloudSync is a weather application that allows users to search for places, view current weather conditions, explore long-term forecasts, and access a history of their most viewed places. The application features a robust user interface built with React and communicates with a backend API to fetch data for places and weather forecasts.

Tech Stack:

Frontend: React.js, Bootstrap, SASS

Backend: Node.js (Express.js), MongoDB

Other Libraries: Axios for API requests


Core Features:

Place Search & Weather Details: Users can search for places by name and view current weather conditions.

Five-day Weather Forecast: Displays a five-day weather forecast with relevant details.

Most Viewed Locations: Tracks and displays the most viewed locations, both globally and by the user.

Search History: Logs the places the user has interacted with, allowing them to easily access them later.



Backend:

The backend API provides several routes to fetch data:


GET /places: Fetches a list of all available places.

GET /places/:code: Fetches details for a specific place by its code.

GET /places/:code/forecasts/long-term: Fetches weather forecasts for a specific place.

POST /log-city-selection: Logs a user's selection of a city, including the place's code and timestamp.
