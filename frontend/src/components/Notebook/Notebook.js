import "./Notebook.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookThunk, getNotebookNotesThunk, deleteNotebookThunk, editNotebookThunk } from "../../store/notebooks";
import { editNoteThunk, postNoteThunk, deleteNoteThunk  } from "../../store/notes";
import Sidenavbar from "../Sidenavbar/Sidenavbar";
function Notebook() {

  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);

   //STATE
  const sessionUser = useSelector(state => state?.session?.user);
  const notes = useSelector(state => state?.notes?.notes);
  const notebook = useSelector(state => state?.notebooks?.notebook);
  const notebooks = useSelector(state => state?.notebooks?.notebooks);

  //EDIT NOTEBOOK
  const [editNotebookTitle, setEditNotebookTitle] = useState("");
  const [editBannerPicUrl, setEditBannerPicUrl] = useState("");

  //EDIT NOTE
  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [editNoteContents, setEditNoteContents] = useState("");

  // //NEW NOTE
  // const [newNoteTitle, setNewNoteTitle] = useState("");
  // const [newNoteContents, setNewNoteContents] = useState("");

  // ====================================================
  //SET CURRENT NOTE
  // const [currentNote, setCurrentNote] = useState("");



  //NEW NOTE
  const [newNote, setNewNote] = useState(true); //
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContents, setNewNoteContents] = useState("");

  //Old Notes
  const [mainNote, setMainNote] = useState("");
  const [mainNoteTitle, setMainNoteTitle] = useState("");
  const [mainNoteContent, setMainNoteContent] = useState("");

  // ====================================================



  useEffect(() => {

    dispatch(getNotebookThunk(notebookId)).then((e) => {if((e) === "bad"){
      history.push("/home")
    }});

    dispatch(getNotebookNotesThunk(notebookId)).then(() => setLoaded(true));

	},[dispatch, notebookId, history]);


  useEffect(() => {}, [
    mainNote,
    mainNoteContent,
    mainNoteTitle,
  ]);


  //NOTEBOOK CRUD
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

  //NOTE CRUD
  // const editNoteSubmit = (e, noteId) => {
  //   e.preventDefault();

  //   const payload = {
  //     title: newNoteTitle,
  //     content: newNoteContents
  //   }
  //   dispatch(editNoteThunk(payload, +noteId)).then(dispatch(getNotebookNotesThunk(notebookId)))
  // }


  // const createNoteSubmit = async (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     userId: sessionUser?.id,
  //     notebookId: notebook?.id,
  //     title: newNoteTitle,
  //     content: newNoteContents,
  //   };

  //   let newNote = await dispatch(postNoteThunk(payload))
  //   // console.log("======",newNote.id)
  //   setCurrentNote(newNote);
  // }


  function createNewNote() {
    setMainNoteTitle("");
    setMainNoteContent("");
    setMainNote("");
    setNewNoteTitle("");
    setNewNoteContents("");
    setNewNote(true);
  }

  const handleSubmit = async(e, noteId) => {
    e.preventDefault();
    if(newNote) {
      const payload = {
        userId: sessionUser?.id,
        notebookId: notebook?.id,
        title: newNoteTitle,
        content: newNoteContents,
      };
      let createdNote = await dispatch(postNoteThunk(payload))
      await dispatch(getNotebookNotesThunk(notebookId)).then(() => setLoaded(true))
      setMainNote(createdNote);
      // createNewNote();
      return;
    }

    const editPayload = {
        title: mainNoteTitle,
        content: mainNoteContent
      }
      await dispatch(editNoteThunk(editPayload, +noteId))
      await dispatch(getNotebookNotesThunk(notebookId)).then(() => setLoaded(true))
  }


  const deleteNoteSubmit = async (e, noteId) => {


    e.preventDefault();
    dispatch(deleteNoteThunk(noteId))
    await dispatch(getNotebookNotesThunk(notebookId)).then(() => setLoaded(true))
  }




  // if(!notebook) {
  //   history.push(`/home`);
  // }

if (loaded) {
  return (
    <>
    <Sidenavbar name={sessionUser?.username} notebooks={notebooks}/>
      <h1>hello {sessionUser?.username}</h1>
      <h1>NOTEBOOK TITLE:{notebook?.title}</h1>

      {/* GET NOTES IN A NOTEBOOK  */}
      <div className='homeNotesContainer1'>
          <h1>Notes</h1>
          {notes?.length > 0 && notes?.map((note) => (
          <>
            <h1 id={note.id} key={note.id} onClick={() => {setMainNote(note); setNewNote(false); setMainNoteTitle(note.title); setMainNoteContent(note.content)}}> {note.title}</h1>
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
          <h1>Edit OR Post note</h1>
          <h1>{mainNote?.title}</h1>
          <h1>{mainNote?.content}</h1>
        </div>

        <form >
          <input
              className=''
              type="text"
              placeholder="Write a Title"
              value={mainNoteTitle ? mainNoteTitle : newNoteTitle}
              onChange={newNote
              ? e => setNewNoteTitle(e.target.value)
              : e => setMainNoteTitle(e.target.value)
              }
              />
            <textarea
              className=''
              type="text"
              placeholder="Whats on your mind?"
              value={mainNoteContent ? mainNoteContent : newNoteContents}
              onChange={newNote
                ? e => setNewNoteContents(e.target.value)
                : e => setMainNoteContent(e.target.value)
                }
              ></textarea>
        <button type="submit" onClick={(e) => handleSubmit(e, mainNote.id)}>Edit Note</button>
        </form>






        {/* DELETE A NOTE */}
        <h1>Delete a note</h1>
        {mainNote.id ?
        <button  onClick={(e) => deleteNoteSubmit(e, mainNote?.id)} >Delete</button>
        : <button> cant Delete</button>
        }

        {/* CREATE A NOTE */}
        <button id="createNoteButton" onClick={createNewNote}>
          Create note
        </button>
        {/* <h1>Create a note</h1>
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
        </form> */}

    </>
  )
} else {
  return null;
  }
}


export default Notebook;
