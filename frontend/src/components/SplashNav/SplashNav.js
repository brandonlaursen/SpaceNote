import "./SplashNav.css"
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
// import { login } from "../../store/session";



function SplashNav() {
  const dispatch = useDispatch();
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  const sessionUser = useSelector((state) => state.session.user);

  const demo = async () => {
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };

  if (sessionUser) return <Redirect to="/home" />;

  return(
    <div className="spashNavBG">
    <nav className="main-nav">
    <a className="logo" href="/">SpaceNote</a>
     <input type="checkbox" id="isChecked"/>
     <label htmlFor="isChecked" className="menu-btn">
      <i className="fas fa-bars"></i>
     </label>


     <ul className='navLinks'>
        {/* <li className="navLi">Why SpaceNote</li>
        <li className="navLi">Features</li>
        <li className="navLi">Plans </li> */}
        <button className="splashDemo"onClick={demo} >Demo</button>
        <li><button className="splashLogin"><a href="/login"> Log In</a></button></li>
     </ul>
    </nav>
    </div>
  )
}


export default SplashNav;


// <a className="loginAccount" href="/login">Log in</a>
//       <a className="loginAccount" href="/signup">Sign up</a>
//       <h1>Hello from the splash Nav</h1>
