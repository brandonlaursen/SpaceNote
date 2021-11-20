import "./Notebook.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, useParams, useHistory } from "react-router-dom";
import { getNotebookThunk, getNotebookNotesThunk, deleteNotebookThunk, editNotebookThunk } from "../../store/notebooks";
import { editNoteThunk, postNoteThunk, deleteNoteThunk  } from "../../store/notes";
import Sidenavbar from "../Sidenavbar/Sidenavbar";
import { Modal } from '../../context/Modal';



function Notebook() {

  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

    dispatch(getNotebookThunk(notebookId));

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
      createNewNote();
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


  if (!loaded) {
    return (
      <div id="loading">
        <img src={"https://cdn.dribbble.com/users/146798/screenshots/2933118/rocket.gif"} alt="Loading..." />
      </div>
    );
  }


  // if(!notebook) {
  //   history.push(`/home`);
  // }

if (loaded) {
  return (
    <>
    <Sidenavbar name={sessionUser?.username} notebooks={notebooks}  profile={sessionUser?.profile_pic_url}/>
    <div className="Notebook-container">


      <div className="notebooksTitle">
        <h1 className="ll"><i className="fas fa-globe-americas ll"></i> {notebook?.title}</h1>
        <h3 className="enbtn" onClick={() => setShowModal(true)}>Edit Notebook</h3>
      </div>

  <div className="nbcontainer">
    <div className="notesHalf">

      <div className='homeNotesContainer1'>
          {notes?.length > 0 && notes?.map((note) => (
          <div className="homeNotesNotesContainer" onClick={() => {setMainNote(note); setNewNote(false); setMainNoteTitle(note.title); setMainNoteContent(note.content)}} >
            <h2 className="homeNotesNotes" id={note.id} key={note.id} onClick={() => {setMainNote(note); setNewNote(false); setMainNoteTitle(note.title); setMainNoteContent(note.content)}}> {note.title}</h2>
            <h3 id={note.id} key={note.id}> {note.content}</h3>
          </div>
          ))}
      </div>


    <div className="buttonContainer">

        <button id="createNoteButton" onClick={createNewNote}>
          Create note
        </button>
    </div>

    </div>


        {/* Will be in a modal */}



      {showModal && (
      <Modal onClose={() => setShowModal(false)}>

    <div className="createModal">
      <h1>Edit Notebook</h1>
      <form onSubmit={(e) => editNotebookSubmit(e, notebookId)}>
          <input
              className='CreateInput2'
              type="text"
              placeholder="Title"
              required
              value={editNotebookTitle}
              onChange={(e) => setEditNotebookTitle(e.target.value)}
              />
            <input
              className='CreateInput2'
              type="text"
              placeholder="Please provide a pic url"
              required
              value={editBannerPicUrl}
              onChange={(e) => setEditBannerPicUrl(e.target.value)}
              />

        <button className="EditNotebookbtn" type="submit" onSubmit={(e) => e.preventDefault()}>Edit Notebook</button>
        <button className='EditNotebookbtn2' onClick={(e) => deleteNotebookSubmit(notebook.id)} >Delete</button>
        </form>
      </div>
        </Modal>
        )}

        <div className="notepadContainer">
          <form >
            <input
                className='TET note-title'
                type="text"
                placeholder="Write a Title"

                value={mainNoteTitle ? mainNoteTitle : newNoteTitle}
                onChange={newNote
                ? e => setNewNoteTitle(e.target.value)
                : e => setMainNoteTitle(e.target.value)
                }
                />
              <textarea
                className='TET note-content'
                type="text"
                placeholder="Whats on your mind?"
                value={mainNoteContent ? mainNoteContent : newNoteContents}
                onChange={newNote
                  ? e => setNewNoteContents(e.target.value)
                  : e => setMainNoteContent(e.target.value)
                  }
                ></textarea>
          <button type="submit" className="DBButton" onClick={(e) => handleSubmit(e, mainNote.id)}>Save</button>
          {mainNote.id
            ? <button  className="DBButton" onClick={(e) => deleteNoteSubmit(e, mainNote?.id)} >Delete</button>
            : <button className="DBButton"> Delete </button>
          }
          </form>
        </div>

        </div>


      </div>
    </>
  )
} else {
  return null;
  }
}


export default Notebook;

/* <h1>Create a note</h1>
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
        </form> */
