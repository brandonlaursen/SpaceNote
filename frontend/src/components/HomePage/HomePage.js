import "./HomePage.css"
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import { getUsersNotebooksThunk, getNotebookNotesThunk, postNotebookThunk } from "../../store/notebooks";
import { getUsersNotesThunk } from "../../store/notes";
import { NavLink } from 'react-router-dom';
import Sidenavbar from "../Sidenavbar/Sidenavbar";
function HomePage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  const notebooks = useSelector(state => state?.notebooks?.notebooks);
  const notes = useSelector(state => state?.notes?.notes);

  // const [currentNotebook, setCurrentNotebook] = useState("");
  // console.log("notebooks",notebooks);
  // console.log("user", sessionUser);
  // console.log("notes", notes);

  const [title, setTitle] = useState("");
  const [bannerPicUrl, setBannerPicUrl] = useState("");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateBannerPic = (e) => setBannerPicUrl(e.target.value);



  useEffect(() => {
    if(sessionUser){
      dispatch(getUsersNotebooksThunk(sessionUser?.id))
      dispatch(getNotebookNotesThunk(""))
      dispatch(getUsersNotesThunk(sessionUser?.id))
    }
  }, [dispatch, sessionUser])


  const createNotebookSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      userId: sessionUser.id,
      bannerPicUrl
    }
    dispatch(postNotebookThunk(payload)).then(() => dispatch(getUsersNotebooksThunk(sessionUser?.id)))
  }


  // const logout = e => {
  //   e.preventDefault();
  //   dispatch(sessionActions.logout());
  // };

  // if (!sessionUser) return (
  //   <Redirect to="/" />
  // );

  return(
    <>
      <Sidenavbar name={sessionUser?.username} notebooks={notebooks}/>

      <div className="homepage-container">

          <div className="homePageTitle">
            <h1 className="hpWelcome">Hello, {sessionUser?.username}</h1>
          </div>


        <div className="notesAndNotebooksContainer">
          <div className="HN1">

            <div className="homeNotesContainerTitle"> <h1 className="AS">Notes</h1> </div>
            <div className='homeNotesContainer'>
              {notes?.map((note) => (

              <>
              <div className="noteItems">
                <div className="notetitle">
                  <h1 id={note.id} key={note.id}> {note.title}</h1>
                </div>
                <div className="notecontent">
                  <h3 id={note.id} key={note.id}> {note.content}</h3>
                </div>
              </div>
              </>

              ))}

            </div>
          </div>


          <div className='homeNotebooksContainer'>

            <div className="notebookTitleDiv"><h1 className="notebooktitle">NOTEBOOKS</h1></div>
            {notebooks?.length > 0 && notebooks?.map((notebook) => (
              <>
              <NavLink className="NL" to={`/notebooks/${notebook.id}`}> <h2 id={notebook.id} key={notebook.id} className="notebookTitle"> {notebook.title}</h2> </NavLink>
              </>
            ))}
          </div>

       </div>




          <div>
            <h1>Create a notebook</h1>
            <form onSubmit={createNotebookSubmit}>
              <input
                  className=''
                  type="text"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={updateTitle}
                  />
                <input
                  className=''
                  type="text"
                  placeholder="Please provide a pic url"
                  required
                  value={bannerPicUrl}
                  onChange={updateBannerPic}
                  />
            <button type="submit" onSubmit={(e) => e.preventDefault()}>Create</button>
            </form>
          </div>


      </div>
    </>
  )
}


export default HomePage;
