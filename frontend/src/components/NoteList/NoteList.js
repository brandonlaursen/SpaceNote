import "../Notebook/Notebook.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsersNotebooksThunk } from "../../store/notebooks";
import { editNoteThunk, postNoteThunk, deleteNoteThunk, getUsersNotesThunk  } from "../../store/notes";
import Sidenavbar from "../Sidenavbar/Sidenavbar";
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import ReactHtmlParser from 'react-html-parser';


function Notelist() {

  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);


   //STATE
  const sessionUser = useSelector(state => state.session.user);
  const notes = useSelector(state => state.notes.notes);
  const notebooks = useSelector(state => state.notebooks.notebooks);
  // console.log(notebooks)

  const [currentNotebook, setCurrentNotebook] = useState("");


  const [newNote, setNewNote] = useState(true); //
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContents, setNewNoteContents] = useState("");

  const [mainNote, setMainNote] = useState("");
  const [mainNoteTitle, setMainNoteTitle] = useState("");
  const [mainNoteContent, setMainNoteContent] = useState("");

  // console.log("===",notebooks[currentNotebook])

  useEffect(() => {

    dispatch(getUsersNotebooksThunk(sessionUser?.id)).then(() => setLoaded(true));
    dispatch(getUsersNotesThunk(sessionUser?.id)).then(() => setLoaded(true))

	},[dispatch, sessionUser?.id]);


  useEffect(() => {}, [
    mainNote,
    mainNoteContent,
    mainNoteTitle,
  ]);



  function createNewNote() {
    setMainNoteTitle("");
    setMainNoteContent("");
    setMainNote("");
    setNewNoteTitle("");
    setCurrentNotebook("")
    setNewNoteContents(null);
    setNewNote(true);

  }

  const handleSubmit = async(e, noteId) => {
    e.preventDefault();
    // console.log("yes",notebookId)
    if(newNote) {
      let cn = currentNotebook
      if(currentNotebook === "") {
        cn = 1;
      }
      const payload = {
        userId: sessionUser?.id,
        notebookId: cn,
        title: newNoteTitle,
        content: newNoteContents,
      };
      let createdNote = await dispatch(postNoteThunk(payload))
      await dispatch(getUsersNotesThunk(sessionUser?.id)).then(() => setLoaded(true))
      setMainNote(createdNote);
      createNewNote();
      return;
    }

    const editPayload = {
        title: mainNoteTitle,
        content: mainNoteContent
      }
      await dispatch(editNoteThunk(editPayload, +noteId))
      await dispatch(getUsersNotesThunk(sessionUser?.id))

  }


  const deleteNoteSubmit = async (e, noteId) => {
    e.preventDefault();

    await dispatch(deleteNoteThunk(noteId))
    setMainNote("");
    dispatch(getUsersNotesThunk(sessionUser?.id))
    createNewNote();
    createNewNote();
  }

  const updateNotebook = (e) => {
    setCurrentNotebook(e.target.value);
  }

  if (!loaded) {
    return (
      <div id="loading">
        <img src={"https://cdn.dribbble.com/users/146798/screenshots/2933118/rocket.gif"} alt="Loading..." />
      </div>
    );
  }


  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] },],
      [{ size: [] }, 'code-block', ],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'script': 'super' }, { 'script': 'sub' }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video',  ],
      [ 'direction', { 'align': [] }],
      ['clean', ],
    ],
  };

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ];




if (loaded) {
  return (
    <>
    <Sidenavbar name={sessionUser?.username} notebooks={notebooks}  profile={sessionUser?.profile_pic_url}/>
    <div className="Notebook-container">


        <div className="notebooksTitle">
          <h1 className="ll"><i className="fas fa-globe-americas ll"></i> All Notes</h1>
        </div>


      <div className="nbcontainer">
        <div className="notesHalf">

          <div className='homeNotesContainer1'>
              {notes?.length > 0 && notes?.map((note) => (
              <div className="homeNotesNotesContainer" id={note.id} key={note.id} onClick={() => {setMainNote(note); setNewNote(false); setMainNoteTitle(note.title); setMainNoteContent(note.content); setCurrentNotebook(note.notebookId)}} >
                <h2 className="homeNotesNotes"  onClick={() => {setMainNote(note); setNewNote(false); setMainNoteTitle(note.title); setMainNoteContent(note.content)}}> {note.title}</h2>
                <h3 > {ReactHtmlParser(note.content)}</h3>
              </div>
              ))}
          </div>


          <div className="buttonContainer">
            <button id="createNoteButton" onClick={createNewNote}>
              Create note
            </button>
          </div>

        </div>


          <div>
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

            </form>
          <ReactQuill
            toolbarOptions={toolbarOptions}
            modules={modules}
            className="TET"
            id="my-form1"
            theme='snow'
            value={mainNoteContent ? mainNoteContent : newNoteContents}
            type="text"
            placeholder="Whats on your mind?"
            onChange={newNote
              ? value => setNewNoteContents(value)
              : value => setMainNoteContent(value)
              }
            style={{minHeight: '600px', height:"10rem", width:"40rem"}}
          />
        </div>
          <button type="submit" form="my-form1" className="DBButton" onClick={(e) => handleSubmit(e, mainNote?.id, )}>Save</button>
          {mainNote.id
                ? <button  className="DBButton" onClick={(e) => deleteNoteSubmit(e, mainNote.id)} >Delete</button>
                : <button className="DBButton"> Delete </button>
              }
            </div>


      </div>

              {currentNotebook ? <h1>Current Notebook: {currentNotebook}</h1> : <h1>Please select a notebook</h1>}

      <select onChange={updateNotebook}>
						{notebooks?.map((notebook) => (
							<option key={notebook.id} value={notebook.id}>
								{notebook.title}
							</option>
						))}
					</select>

    </>
  )
} else {
  return null;
  }
}


export default Notelist;
