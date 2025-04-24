import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/NavBar.sass";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-light navbar-container py-2 px-4">
      <div className="container-fluid p-0 m-0">
        {/* Company Logo */}
        <a href="#">
          <img
            src="/Logo/IBM_logo-img.png"
            alt="Company Logo"
            className="navbar-logo"
          />
        </a>

        {/* Toggle Button  */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          aria-expanded={isOpen} //	Shows current open/close state of the menu
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item pe-3">
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="nav-item pe-3">
              <a className="nav-link" href="#">
                Most Viewed Places
              </a>
            </li>
            <li className="nav-item pe-3">
              <a className="nav-link" href="#">
                Your Most Viewed Places
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
