import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/Theme";
import "./Sidenavbar.css";
import Search from "./search";
import NavNotebookContainer from "./NavbarNotebookContainer";

const Sidenavbar = ({ name, notebooks }) => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  const handleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  const [showNotebooksNav, setShowNotebooksNav] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="sidenavbar">
      <div className="sidenavbar-top">
        <div className="sidenavbar-top-profile">
          <div className="profile-icon"></div>

          <div className="profile-title">
            {name}
            <i
              onClick={handleTheme}
              className={
                darkMode ? "themeButton fas fa-sun" : "themeButton far fa-moon"
              }
            ></i>
          </div>
        </div>
        <Search sessionUser={sessionUser} />
        <h3 className="notebooksNavTitle">
          {" "}
          <NavLink to="/home" className="navhome">
            <i className=" ui fas fa-space-shuttle"></i>Home
          </NavLink>{" "}
        </h3>

        <div className="sidenavbar-top-menu-item">
          <h3
            className="notebooksNavTitle"
            onClick={() => setShowNotebooksNav(!showNotebooksNav)}
          >
            {" "}
            <i className=" x fas fa-book"></i> Notebooks
          </h3>
          {showNotebooksNav && <NavNotebookContainer notebooks={notebooks} />}

          <h3 className="notebooksNavTitle">
            {" "}
            <a
              href="https://www.linkedin.com/in/brandon-laursen-398563218/"
              className=" z navhome"
            >
              <i className="xx fab fa-linkedin"></i>LinkedIn
            </a>{" "}
          </h3>
          <h3 className="notebooksNavTitle">
            {" "}
            <a href="https://github.com/brandonlaursen" className="y navhome">
              <i className=" xx fab fa-github"></i>GitHub
            </a>{" "}
          </h3>
          <h3 className="notebooksNavTitle" onClick={logout}>
            <i className="fas fa-sign-out-alt"> </i> Sign Out
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sidenavbar;
