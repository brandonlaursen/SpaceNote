import "./SplashPage.css"
import SplashNav from "../SplashNav/SplashNav";
import ReactTypingEffect from 'react-typing-effect';;
// import * as sessionActions from "../../store/session";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router";



function SplashPage() {


  return(
    <>
    <div className="SplashBG">
      <SplashNav/>
        <div className="splashPageContainer">
          {/* <h1 className="splashTitle">Tame your work, organize your life</h1> */}
          <ReactTypingEffect
            text={["Tame your work, organize your life", "A project by Brandon Laursen"]}
            className="splashTitle"
            speed="100"
            eraseSpeed="100"

          />
          <h3 className="splashText">Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h3>
          <button className="splashButton" href="/signup"><a href="/signup" >Sign up for free </a></button>
          <a href="/login" className="SPA">Already have an account? Log in</a>
        </div>
        <div className="picDiv">
          <img
              src={
                "https://evernote.com/c/assets/homepage-repackaging/task_hero_image@2x__en.png?b8ddc3599750b793"
              }
              alt=""
              className="splashPic"
            ></img>

            <div className="splashPicText">
              <h3>WORK ANYWHERE</h3>
              <p> Keep important info handy—your notes sync automatically to all your devices</p>
              <h3>REMEMBER EVERYTHING</h3>
              <p> Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
              <h3>TURN TO-DO INTO DONE</h3>
              <p> Bring your notes, tasks, and schedules together to get things done more easily.</p>
              <h3>FIND THINGS FAST</h3>
            <p> Get what you need, when you need it with powerful, flexible search capabilities.</p>
            </div>
        </div>
      </div>
    </>
  )
}


export default SplashPage;
