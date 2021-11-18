import "./Notebook.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookThunk, getNotebookNotesThunk, deleteNotebookThunk, editNotebookThunk } from "../../store/notebooks";

function Notebook() {

  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [editNotebookTitle, setEditNotebookTitle] = useState("");
  const [editBannerPicUrl, setEditBannerPicUrl] = useState("");
  // const [res, setRes] = useState(false);
  // const [currentNotebook, setCurrentNotebook] = useState("");


  const sessionUser = useSelector(state => state?.session?.user);
  const notebook = useSelector(state => state?.notebooks.notebook);
  const notes = useSelector(state => state?.notes?.notes);

  useEffect(() => {
    console.log(notebookId)
    dispatch(getNotebookThunk(notebookId)).then((e) => {if((e) === "bad"){
      history.push("/home")
    } })

    dispatch(getNotebookNotesThunk(notebookId)).then(() => setLoaded(true))


	},[dispatch,notebookId]);

  const deleteNotebookSubmit = async (notebookId) => {

     dispatch(deleteNotebookThunk(notebookId));
     history.push(`/home`);
  }

  const editNotebookSubmit = (e, notebookId) => {
    e.preventDefault();

    const payload = {
      title: editNotebookTitle,
      bannerPicUrl: editBannerPicUrl
    }

    dispatch(editNotebookThunk(payload, +notebookId)).then(dispatch(getNotebookThunk(notebookId)))
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
      <form onSubmit={(e) => editNotebookSubmit(e, notebookId)}>
          <input
              className=''
              type="text"
              placeholder="Title"
              required
              value={editNotebookTitle}
              onChange={(e) => setEditNotebookTitle(e.target.value)}
              />
            <input
              className=''
              type="text"
              placeholder="Please provide a pic url"
              required
              value={editBannerPicUrl}
              onChange={(e) => setEditBannerPicUrl(e.target.value)}
              />
        <button type="submit" onSubmit={(e) => e.preventDefault()}>Edit</button>
        </form>
    </>
  )
} else {
  return null;
}

}


export default Notebook;
