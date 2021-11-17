import "./Notebook.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookThunk, getNotebookNotesThunk, deleteNotebookThunk } from "../../store/notebooks";

function Notebook() {

  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  // const [res, setRes] = useState(false);
  // const [currentNotebook, setCurrentNotebook] = useState("");


  const sessionUser = useSelector(state => state?.session?.user);
  const notebook = useSelector(state => state?.notebooks.notebook);
  const notes = useSelector(state => state?.notes?.notes);

  useEffect(() => {

    dispatch(getNotebookThunk(notebookId)).then((e) => {if((e) === "bad"){
      history.push("/home")
    } })

    dispatch(getNotebookNotesThunk(notebookId)).then(() => setLoaded(true))


	},[dispatch,notebookId]);

  const deleteNotebookSubmit = async (notebookId) => {

     dispatch(deleteNotebookThunk(notebookId));
     history.push(`/home`);
  }


  // if(!notebook) {
  //   history.push(`/home`);
  // }

if (loaded) {
  return (
    <>
      <h1>hello</h1>
      <h1>{notebook?.title}</h1>

      <div className='homeNotesContainer'>
          <h1>Notes</h1>
          {notes?.map((note) => (
          <>
            <h1 id={note.id} key={note.id}> {note.title}</h1>
           </>
          ))}
      </div>
      <button className='deleteCommentButton' onClick={(e) => deleteNotebookSubmit(notebook.id)} >Delete</button>
    </>
  )
} else {
  return null;
}

}


export default Notebook;
