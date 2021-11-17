import "./Notebook.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookThunk, getNotebookNotesThunk } from "../../store/notebooks";

function Notebook() {

  const { notebookId } = useParams();
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state?.session?.user);
  const notebook = useSelector(state => state?.notebooks.notebook);
  const notes = useSelector(state => state?.notes?.notes);

  useEffect(() => {
    dispatch(getNotebookThunk(notebookId));
    dispatch(getNotebookNotesThunk(notebookId));
	},[notebookId]);

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
    </>
  )
}


export default Notebook;
