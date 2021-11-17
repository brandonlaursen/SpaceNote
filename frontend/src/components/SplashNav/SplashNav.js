import "./SplashNav.css"
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";



function SplashNav() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  const demo = (e) => {
    e.preventDefault();
    setCredential("Demo-lition");
    setPassword("password")
    return dispatch(sessionActions.login({ credential, password }))
  }

  return(
    <div className="spashNavBG">
    <nav className="main-nav">
     <input type="checkbox" id="isChecked"/>
     <label for="isChecked" className="menu-btn">
      <i class="fas fa-bars"></i>
     </label>

     <a className="logo" href="/">SpaceNote</a>
     <ul className='navLinks'>
        <li className="navLi">Why Evernote</li>
        <li className="navLi">Features</li>
        <li className="navLi">Plans </li>
        <li><button className="splashDemo"onClick={demo} >Demo</button></li>
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
