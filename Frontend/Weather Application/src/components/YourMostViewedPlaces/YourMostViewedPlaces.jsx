import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/YourMostViewedPlaces.sass";

const YourMostViewedPlaces = ({ places }) => {
  return (
    <div className="your-most-viewed-places-container p-3 pb-5">
      <h3 className="your-most-viewed-places-text text-center mb-5 mt-4">
        Your Most Viewed Locations
      </h3>
      {places.length === 0 ? (
        <p className="no-places-viewed text-center">No places viewed yet.</p>
      ) : (
        <div className="your-most-viewed-places d-flex flex-wrap justify-content-center gap-5">
          {places.slice(0, 3).map((place, index) => (
            <div key={index} className="your-most-viewed-place p-3">
              <p className="your-most-viewed-place-name text-center m-0 ps-3 pb-2 pt-2">
                {place.name}
              </p>

              <p className="your-most-viewed-place-division text-start m-0 ps-3">
                {place.administrativeDivision}
              </p>

              <p className="your-most-viewed-place-coordinates text-start m-0 ps-3">
                Lat.: {place.coordinates.latitude} Long.:{" "}
                {place.coordinates.longitude}
              </p>
              <p className="your-most-viewed-place-times text-center m-0 p-2">
                <strong>Views:</strong> {place.viewCount} times
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default YourMostViewedPlaces;
