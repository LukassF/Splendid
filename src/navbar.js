import profile from "./functions/profile_images";
import "./styles/style.css";
import { Link } from "react-router-dom";

export default function Navbar({ setBrowser }) {
  let currentUsername = window.localStorage.getItem("currentUsername");

  return (
    <nav id="navbar-top">
      <img
        src="https://static.vecteezy.com/system/resources/previews/013/827/458/original/3d-arrow-icon-on-transparent-background-3d-style-arrow-icon-for-your-web-site-design-logo-app-ui-arrow-indicated-the-direction-symbol-curved-arrow-sign-free-png.png"
        width="120px"
      />
      <form id="navbar-form">
        <input
          type="text"
          placeholder="Browse"
          id="nav-browser"
          onChange={(e) => setBrowser(e.target.value)}
        ></input>
        <button id="nav-browser-submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <ul className="main-list">
        {!currentUsername ? (
          <li>
            <Link to="/login">+ Upload</Link>
          </li>
        ) : (
          <li>
            <Link to="/profile">+ Upload</Link>
          </li>
        )}
        {!currentUsername ? (
          <li>
            <Link to="/login">Log In</Link>
          </li>
        ) : (
          <li
            id="profile-logged-in"
            style={{ backgroundImage: `url(${profile("backgroundImage")})` }}
          >
            <Link to="/profile">
              <div
                id="profile-pic"
                style={{ backgroundImage: `url(${profile("profileImage")})` }}
              ></div>
              {currentUsername}
            </Link>
          </li>
        )}
        <li id="dropdown">
          <div id="hamburger"></div>
          <div className="dropdown-list">
            <a>
              <i className="fa fa-language"></i> Language
            </a>
            <a>
              <i className="fa-regular fa-circle-question"></i> Feedback
            </a>
            <a>
              <i className="fa-solid fa-keyboard"></i> Keyboard
            </a>
            <a>
              <i className="fa fa-question"></i> Help
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
