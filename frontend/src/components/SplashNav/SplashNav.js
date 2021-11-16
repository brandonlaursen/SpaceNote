import "./SplashNav.css"
// import * as sessionActions from "../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router";



function SplashNav() {


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
        <li><button className="splashDemo" href="/login">Demo</button></li>
        <li><button className="splashLogin" href="/login">Log in</button></li>
     </ul>
    </nav>
    </div>
  )
}


export default SplashNav;


// <a className="loginAccount" href="/login">Log in</a>
//       <a className="loginAccount" href="/signup">Sign up</a>
//       <h1>Hello from the splash Nav</h1>
