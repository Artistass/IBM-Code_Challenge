import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/BrowserHistory.sass";

export default function BrowserHistory({ logs }) {
  return (
    <div className="search-history-container d-flex flex-column justify-content-center align-items-center">
      <h2 className="search-history-text text-center pt-5 pb-5 m-0">
        Search history:
      </h2>
      {logs.length > 0 ? (
        <ul className="search-history-place-text d-flex flex-column justify-content-center align-items-start p-4 mb-5">
          {logs.slice(0, 10).map((log, index) => (
            <li className="search-history-place pb-3" key={index}>
              {log}
            </li>
          ))}
        </ul>
      ) : (
        <p className="search-history-noPlaces">No search history.</p>
      )}
    </div>
  );
}
