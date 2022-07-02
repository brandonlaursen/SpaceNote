import "./Notebook.css";
import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  getNotebooksThunk,
  deleteNotebookThunk,
  editNotebookThunk,
} from "../../store/notebooks";
import {
  getNotesThunk,
  editNoteThunk,
  postNoteThunk,
  deleteNoteThunk,
} from "../../store/notes";
import { ThemeContext } from "../../context/Theme";
import { Modal } from "../../context/Modal";
import { useShowModal } from "../../context/showModal";
import Sidenavbar from "../Sidenavbar/Sidenavbar";

import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import "react-quill/dist/quill.snow.css";
import RichTextEditor from "./RichTextEditor";

function Notebook() {
  const { notebookId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const { darkMode } = useContext(ThemeContext);

  const sessionUser = useSelector((state) => state.session.user);

  const notesObj = useSelector((state) => state.notes);
  const notes = Object.values(notesObj);

  const notebook = useSelector((state) => state.notebooks[notebookId]);
  console.log('look here', notebook)
  const notebooksObj = useSelector((state) => state.notebooks);
  const notebooks = Object.values(notebooksObj);
  console.log(notes)
  const { show, setShow } = useShowModal();

  const [loaded, setLoaded] = useState(false);

  //EDIT NOTEBOOK
  const [editNotebookTitle, setEditNotebookTitle] = useState("");
  const [newNote, setNewNote] = useState(true);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteContents, setNewNoteContents] = useState("");
  const [errors, setErrors] = useState([]);
  const [mainNote, setMainNote] = useState("");
  const [mainNoteTitle, setMainNoteTitle] = useState("");
  const [mainNoteContent, setMainNoteContent] = useState("");

  function createNewNote() {
    setMainNoteTitle("");
    setMainNoteContent("");
    setMainNote("");
    setNewNoteTitle("");
    setNewNoteContents("");
    setNewNote(true);
  }

  useEffect(() => {
    dispatch(getNotebooksThunk(sessionUser.id));
  }, [dispatch, sessionUser.id]);

  useEffect(() => {
    dispatch(getNotesThunk(notebookId));
    createNewNote();
    // setLoaded(true);
  }, [dispatch, notebookId, notebook]);

  // useEffect(() => {
  //   dispatch(getNotebooksThunk(sessionUser.id));
  //   dispatch(resetAction())
  //   dispatch(getNotesThunk(notebookId));
  //   createNewNote();
  //   setLoaded(true);
  // }, [dispatch, notebookId, sessionUser.id]);

  useEffect(() => {}, [mainNote, mainNoteContent, mainNoteTitle, notebook]);

  useEffect(() => {
    const errors = [];

    if (editNotebookTitle.length === 25)
      errors.push("Max Length for a title is 25 characters");
    if (editNotebookTitle.length < 1)
      errors.push("Title needs at least one character");
    setErrors(errors);
  }, [editNotebookTitle]);

  //NOTEBOOK CRUD
  const deleteNotebookSubmit = (e, notebookId) => {
    e.preventDefault();

    dispatch(deleteNotebookThunk(notebookId))
      .then(setShow(false))
      .then(history.push(`/home`));
  };

  const editNotebookSubmit = (e, notebookId) => {
    e.preventDefault();
    const payload = {
      title: editNotebookTitle,
    };
    dispatch(editNotebookThunk(payload, +notebookId)).then(() =>
      setShow(false)
    );
  };

  const handleSubmit = async (e, noteId) => {
    console.log(";hey");
    e.preventDefault();
    if (newNote) {
      const payload = {
        userId: sessionUser?.id,
        notebookId: notebook?.id,
        title: newNoteTitle,
        content: newNoteContents,
      };
      let createdNote = await dispatch(postNoteThunk(payload));
      if (createdNote) {
        setMainNote(createdNote);
        createNewNote();
        return;
      }
    }

    const editPayload = {
      title: mainNoteTitle,
      content: mainNoteContent,
    };

    await dispatch(editNoteThunk(editPayload, +noteId)).then(() =>
      setLoaded(true)
    );
    createNewNote();
  };

  const deleteNoteSubmit = async (e, noteId) => {
    e.preventDefault();

    await dispatch(deleteNoteThunk(noteId));
    setMainNote("");

    createNewNote();
    createNewNote();
  };

  // if (!loaded) {
  //   return (
  //     <div id="loading">
  //       <img
  //         src={
  //           "https://cdn.dribbble.com/users/146798/screenshots/2933118/rocket.gif"
  //         }
  //         alt="Loading..."
  //       />
  //       <h3 className="loadingText">Loading...</h3>
  //     </div>
  //   );
  // }

  // if (loaded) {
    return (
      <div className="NBOdiv">
        <Sidenavbar
          name={sessionUser.username}
          notebooks={notebooks}
          profile={sessionUser.profile_pic_url}
        />
        <div
          className={darkMode ? "Notebook-containerDark" : "Notebook-container"}
        >
          <div className="notebooksTitle">
            <div className="nbt1">
              <h1 className="ll">
                <i className="fas fa-globe-americas ll"></i> {notebook?.title}
              </h1>
              <h3 className="enbtn" onClick={() => setShow(true)}>
                Edit Notebook
              </h3>
            </div>
            <div className="nbt2">
              <button
                type="submit"
                form="my-form1"
                className="DBButton"
                onClick={(e) => handleSubmit(e, mainNote.id)}
              >
                Save
              </button>
              {mainNote.id ? (
                <button
                  className="DBButton del"
                  onClick={(e) => deleteNoteSubmit(e, mainNote?.id)}
                >
                  Delete
                </button>
              ) : (
                <button className="DBButton2"> Delete </button>
              )}
            </div>
          </div>

          <div className="nbcontainer">
            <div className="notesHalf">
              <div className="homeNotesContainer1">
                {notes.length > 0 &&
                  notes.map((note) => {
                    if (mainNote.id === note.id) {
                      return (
                        <div
                          className="homeNotesNotesContainer3"
                          id={note.id}
                          key={note.id}
                          onClick={() => {
                            setMainNote(note);
                            setNewNote(false);
                            setMainNoteTitle(note.title);
                            setMainNoteContent(note.content);
                          }}
                        >
                          <div>
                            <h2
                              className="homeNotesNotes"
                              onClick={() => {
                                setMainNote(note);
                                setNewNote(false);
                                setMainNoteTitle(note.title);
                                setMainNoteContent(note.content);
                              }}
                            >
                              {" "}
                              {note.title}
                            </h2>
                            <h3 className="noteCC">
                              {" "}
                              {ReactHtmlParser(note.content)}
                            </h3>
                            <p className="timeDiv">
                              {moment(note.updatedAt).format("LLL")}
                            </p>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          className="homeNotesNotesContainer"
                          id={note.id}
                          key={note.id}
                          onClick={() => {
                            setMainNote(note);
                            setNewNote(false);
                            setMainNoteTitle(note.title);
                            setMainNoteContent(note.content);
                          }}
                        >
                          <div>
                            <h2
                              className="homeNotesNotes"
                              onClick={() => {
                                setMainNote(note);
                                setNewNote(false);
                                setMainNoteTitle(note.title);
                                setMainNoteContent(note.content);
                              }}
                            >
                              {" "}
                              {note.title}
                            </h2>
                            <h3 className="noteCC">
                              {" "}
                              {ReactHtmlParser(note.content)}
                            </h3>
                            <p className="timeDiv">
                              {moment(note.updatedAt).format("LLL")}
                            </p>
                          </div>
                        </div>
                      );
                    }
                  })}
              </div>
              <div className="buttonContainer">
                <button id="createNoteButton" onClick={createNewNote}>
                  <i className="penIcon fas fa-pen"></i>
                  New Note
                </button>
              </div>
            </div>

            {show && (
              <Modal onClose={() => setShow(false)}>
                <div className={darkMode ? "createModalDark" : "createModal"}>
                  <h1>Edit Notebook</h1>

                  <form onSubmit={(e) => editNotebookSubmit(e, notebookId)}>
                    <input
                      className="CreateInput2"
                      type="text"
                      placeholder="Title"
                      required
                      value={editNotebookTitle}
                      onChange={(e) => setEditNotebookTitle(e.target.value)}
                      maxLength="25"
                      minLength="1"
                    />

                    <button className="EditNotebookbtn" type="submit">
                      Edit Notebook
                    </button>
                    <button
                      className="EditNotebookbtn2"
                      onClick={(e) => deleteNotebookSubmit(e, notebook.id)}
                    >
                      Delete
                    </button>
                  </form>
                  <ul className="errors">
                    {errors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              </Modal>
            )}

            <div className="rteContainer">
              <form onSubmit={(e) => handleSubmit(e, mainNote.id)}>
                <input
                  className={darkMode ? "TET note-titleDark" : "TET note-title"}
                  type="text"
                  placeholder="Write a Title"
                  maxLength="25"
                  value={mainNoteTitle ? mainNoteTitle : newNoteTitle}
                  onChange={
                    newNote
                      ? (e) => setNewNoteTitle(e.target.value)
                      : (e) => setMainNoteTitle(e.target.value)
                  }
                />
              </form>

              <RichTextEditor
                newNote={newNote}
                mainNoteContent={mainNoteContent}
                newNoteContents={newNoteContents}
                setNewNoteContents={setNewNoteContents}
                setMainNoteContent={setMainNoteContent}
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>
    );
  }
// }

export default Notebook;
