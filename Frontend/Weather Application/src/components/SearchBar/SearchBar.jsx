import "../../styles/SearchBar.sass";
import "bootstrap/dist/css/bootstrap.min.css";

const SearchBar = ({ search, setSearch, places, handlePlaceSelection }) => {
  //Updates the search input state every time the user types
  const handleSearchChange = (e) => setSearch(e.target.value); 

  const filteredPlaces = places.filter((place) =>
  //Filters the places list to only show names that include the users input.
  //Case insensitive search.
    place.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-container d-flex justify-content-center align-items-center">
      <div>
        <h1 className="text-name text-center pt-2">CloudSync</h1>
        <div className="search-place-container d-flex justify-content-center align-items-center flex-column">
          <h3 className="search-place-text text-center">
            Search for weather updates by city.
          </h3>
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search for a place"
            className="search-input p-2"
          />
          {search && filteredPlaces.length > 0 && (
            <ul className="dropdown p-0">
              {filteredPlaces.map((place, index) => (
                <li
                  className="dropdown-item text-center"
                  key={index}
                  onClick={() => handlePlaceSelection(place.name)} // Select place on click
                >
                  {place.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
