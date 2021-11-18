import "./HomePage.css"
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import { getUsersNotebooksThunk, getNotebookNotesThunk, postNotebookThunk } from "../../store/notebooks";
import { getUsersNotesThunk } from "../../store/notes";
import { NavLink } from 'react-router-dom';

function HomePage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  const notebooks = useSelector(state => state?.notebooks?.notebooks);
  const notes = useSelector(state => state?.notes?.notes);

  const [currentNotebook, setCurrentNotebook] = useState("");

  console.log("notebooks",notebooks);
  console.log("user", sessionUser);
  console.log("notes", notes);

  // ===================================
  const [title, setTitle] = useState("");
  const [bannerPicUrl, setBannerPicUrl] = useState("");

  const updateTitle = (e) => setTitle(e.target.value);
  const updateBannerPic = (e) => setBannerPicUrl(e.target.value);


  useEffect(() => {
    if(sessionUser){
      dispatch(getUsersNotebooksThunk(sessionUser?.id))
      dispatch(getNotebookNotesThunk(1))
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
  // ===================================



  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  if (!sessionUser) return (
    <Redirect to="/" />
  );

  return(
    <>
      <h1>Hello from the home page</h1>
      <h1>hello {sessionUser?.username}</h1>
      <button onClick={logout}>log out</button>

        {/* ALL NOTEBOOKS OF A USER */}
      <div className='homeNotebooksContainer'>
        <h1>Notebooks</h1>
        {notebooks?.length > 0 && notebooks?.map((notebook) => (
          <>
          <NavLink to={`/notebooks/${notebook.id}`}> <h2 id={notebook.id} key={notebook.id} > {notebook.title}</h2> </NavLink>
          </>
        ))}
      </div>

        {/* ALL NOTES OF A USER */}
      <div className='homeNotesContainer'>
        <h1>Notes</h1>
        {notes?.map((note) => (
        <>
          <h1 id={note.id} key={note.id}> {note.title}</h1>
        </>
        ))}
      </div>

      <div>
        {/* CREATE A NOTEBOOK  */}
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
    </>
  )
}


export default HomePage;
