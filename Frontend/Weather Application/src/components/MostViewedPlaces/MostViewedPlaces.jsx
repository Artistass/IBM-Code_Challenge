import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/MostViewedPlaces.sass";

const MostViewedPlaces = ({ places }) => {
  return (
    <div className="most-viewed-places-container p-3 pb-5">
      <h3 className="most-viewed-places-text text-center mb-5 mt-4">
        Most Viewed Locations
      </h3>

      <div className="most-viewed-places d-flex flex-wrap justify-content-center gap-5">
        {places.map((place, index) => (
          <div key={index} className="most-viewed-place p-3">
            <p className="most-viewed-place-name text-center m-0 ps-3 pb-2 pt-2">
              {place.name}
            </p>
            <p className="most-viewed-place-division text-start m-0 ps-3">
              {place.administrativeDivision}
            </p>
            <p className="most-viewed-place-coordinates text-start m-0 ps-3">
              Lat: {place.coordinates.latitude} Long:{" "}
              {place.coordinates.longitude}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostViewedPlaces;
