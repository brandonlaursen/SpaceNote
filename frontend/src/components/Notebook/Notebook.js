import "./Notebook.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookThunk, getNotebookNotesThunk, deleteNotebookThunk, editNotebookThunk } from "../../store/notebooks";
import { editNoteThunk, postNoteThunk, deleteNoteThunk  } from "../../store/notes";

function Notebook() {

  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [editNotebookTitle, setEditNotebookTitle] = useState("");
  const [editBannerPicUrl, setEditBannerPicUrl] = useState("");

  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [editNoteContents, setEditNoteContents] = useState("");


  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContents, setNewNoteContents] = useState("");

  const sessionUser = useSelector(state => state?.session?.user);
  const notes = useSelector(state => state?.notes?.notes);
  const notebook = useSelector(state => state?.notebooks?.notebook);

 //WORKING ON
 const [currentNote, setCurrentNote] = useState(1)
 console.log(currentNote)

 //  console.log("===", notes.currentNote)
  useEffect(() => {

  },[])


  useEffect(() => {
    console.log(notebookId)
    dispatch(getNotebookThunk(notebookId)).then((e) => {if((e) === "bad"){
      history.push("/home")
    } })
    dispatch(getNotebookNotesThunk(notebookId)).then(() => setLoaded(true));

	},[dispatch, notebookId]);


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

  const editNoteSubmit = (e, noteId) => {
    e.preventDefault();

    const payload = {
      title: editNoteTitle,
      content: editNoteContents
    }
    dispatch(editNoteThunk(payload, +noteId)).then(dispatch(getNotebookNotesThunk(notebookId)))
  }


  const createNoteSubmit = (e) => {
    e.preventDefault();
    const payload = {
      userId: sessionUser.id,
      notebookId: notebook?.id,
      title: newNoteTitle,
      content: newNoteContents,

    }
    dispatch(postNoteThunk(payload)).then(dispatch(getNotebookNotesThunk(notebookId)))
  }

  const deleteNoteSubmit = async (noteId) => {

    dispatch(deleteNoteThunk(noteId))

  }




  // if(!notebook) {
  //   history.push(`/home`);
  // }

if (loaded) {
  return (
    <>
      <h1>hello {sessionUser?.username}</h1>
      <h1>NOTEBOOK TITLE:{notebook?.title}</h1>

      {/* GET NOTES IN A NOTEBOOK  */}
      <div className='homeNotesContainer'>
          <h1>Notes</h1>
          {notes?.length > 0 && notes?.map((note) => (
          <>
            <h1 id={note.id} key={note.id} onClick={() => setCurrentNote(note)}> {note.title}</h1>
            {/* <h1 id={note.id} key={note.id}> {note.content}</h1> */}
           </>
          ))}
      </div>

      {/* DELETE NOTEBOOK  */}
      <h1>Delete notebook</h1>
      <button className='deleteCommentButton' onClick={(e) => deleteNotebookSubmit(notebook.id)} >Delete</button>

      {/* EDIT NOTEBOOK  */}
      <h1>Edit notebook</h1>
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

        {/* EDIT NOTE */}
        <div>
          <h1>Edit note</h1>
          <h1>{currentNote?.title}</h1>
          <h1>{currentNote?.content}</h1>
        </div>
        <form onSubmit={(e) => editNoteSubmit(e, currentNote.id)}>
          <input
              className=''
              type="text"
              placeholder={currentNote.title}
              required
              value={editNoteTitle}
              onChange={(e) => setEditNoteTitle(e.target.value)}
              />
            <input
              className=''
              type="text"
              placeholder={currentNote.content}
              required
              value={editNoteContents}
              onChange={(e) => setEditNoteContents(e.target.value)}
              />
        <button type="submit" onSubmit={(e) => e.preventDefault()}>Edit Note</button>
        </form>


        {/* DELETE A NOTE */}
        <h1>Delete a note</h1>
        <button  onClick={(e) => deleteNoteSubmit(currentNote.id)} >Delete</button>


        {/* CREATE A NOTE */}
        <h1>Create a note</h1>
         <form onSubmit={createNoteSubmit}>
          <input
              className=''
              type="text"
              placeholder="Note Title"
              required
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              />
            <input
              className=''
              type="text"
              placeholder="Type some text"
              required
              value={newNoteContents}
              onChange={(e) => setNewNoteContents(e.target.value)}
              />
        <button type="submit" onSubmit={(e) => e.preventDefault()}>Create</button>
        </form>

    </>
  )
} else {
  return null;
}

}


export default Notebook;
