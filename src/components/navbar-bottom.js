import "../styles/style.css";
import { Link } from "react-router-dom";

export default function NavbarBottom() {
  return (
    <nav id="nav-bottom">
      <Link to="/" state={{ type: "Feed" }}>
        <i className="fa fa-home"></i>Home
      </Link>
      {window.localStorage.getItem("currentUsername") !== null ? (
        <Link to="/" state={{ type: "Following" }}>
          <i className="fa fa-people-group"></i>Following
        </Link>
      ) : (
        <Link to="/login">
          <i className="fa fa-people-group"></i>Following
        </Link>
      )}
      {window.localStorage.getItem("currentUsername") !== null ? (
        <Link to="/profile">
          <i className="far fa-plus"></i>Create
        </Link>
      ) : (
        <Link to="/login">
          <i className="far fa-plus"></i>Create
        </Link>
      )}
      {window.localStorage.getItem("currentUsername") !== null ? (
        <Link to="/profile">
          <i className="far fa-user"></i>Profile
        </Link>
      ) : (
        <Link to="/login">
          <i className="far fa-user"></i>Profile
        </Link>
      )}
    </nav>
  );
}
