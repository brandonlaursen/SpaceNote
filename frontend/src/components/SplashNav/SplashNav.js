import "./SplashNav.css";
import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";

function SplashNav() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const demo = async () => {
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  if (sessionUser) return <Redirect to="/home" />;

  return (
    <div className="spashNavBG">
      <nav className="main-nav">
        <NavLink className="logo" to="/">
          SpaceNote
        </NavLink>
        <input type="checkbox" id="isChecked" />
        <label htmlFor="isChecked" className="menu-btn">
          <i className="fas fa-bars"></i>
        </label>

        <ul className="navLinks">
          <button className="splashDemo" onClick={demo}>
            Demo
          </button>
          <li>
            <button className="splashLogin">
              <NavLink to="/login"> Log In</NavLink>
            </button>
          </li>
        </ul>
      </nav>
      <Footer />
    </div>
  );
}

export default SplashNav;
