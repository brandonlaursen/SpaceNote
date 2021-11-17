import "./HomePage.css"
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { useEffect, useState } from "react";
import { getUsersNotebooksThunk, getNotebookNotesThunk } from "../../store/notebooks";


function HomePage() {

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state?.session?.user);
  const notebooks = useSelector(state => state?.notebooks?.notebooks);
  const notes = useSelector(state => state?.notebooks?.notes);
  const [currentNotebook, setCurrentNotebook] = useState("");

  console.log("notebooks",notebooks);
  console.log("user", sessionUser);


  useEffect(() => {
    if(sessionUser){
      dispatch(getUsersNotebooksThunk(sessionUser?.id))
      dispatch(getNotebookNotesThunk(1))
  }
  }, [dispatch, sessionUser])

  if (!sessionUser) return (
    <Redirect to="/" />
  );


  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return(
    <>
      <h1>Hello from the home page</h1>
      <h1>hello{sessionUser?.username}</h1>
      <button onClick={logout}>log out</button>

      {notebooks?.map((notebook) => (
        <>
        <h1 id={notebook.id} key={notebook.id} > {notebook.title}</h1>
        </>
      ))}

      {/* {notes?.map((note) => (
        <>
        <h1 id={note.id} key={note.id}> {note.title}</h1>
        </>
      ))} */}
    </>
  )
}


export default HomePage;
