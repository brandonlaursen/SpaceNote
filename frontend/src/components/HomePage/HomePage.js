import "./HomePage.css"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { getUsersNotebooksThunk, postNotebookThunk } from "../../store/notebooks";
import { getUsersNotesThunk } from "../../store/notes";
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import { ThemeContext } from "../../context/Theme";
import { useShowModal } from '../../context/showModal';
import ReactHtmlParser from 'react-html-parser';
import Sidenavbar from "../Sidenavbar/Sidenavbar";
import moment from 'moment';


function HomePage() {

  const {darkMode } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const notebooks = useSelector(state => state?.notebooks?.notebooks);
  const notes = useSelector(state => state?.notes?.notes);

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([])

  const { show, setShow, num } = useShowModal();


  useEffect(() => {
    const errors = [];

    if(title.length === 25) errors.push("Max Length for a title is 25 characters");
    if(title.length < 1) errors.push("Title needs at least one character")
    setErrors(errors)

  },[title])


  useEffect(() => {

    if(sessionUser){
      dispatch(getUsersNotebooksThunk(sessionUser?.id))
      dispatch(getUsersNotesThunk(sessionUser?.id))
    }

  }, [dispatch, sessionUser, num])


  const createNotebookSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      userId: sessionUser.id,
    }
    dispatch(postNotebookThunk(payload)).then(() => dispatch(getUsersNotebooksThunk(sessionUser?.id)))
    setShow(false);
    setTitle('')
  }

  const updateTitle = (e) => setTitle(e.target.value);


  return(
    <>
      <Sidenavbar name={sessionUser?.username} notebooks={notebooks}/>

      <div className={darkMode ? "homepage-containerDark" : "homepage-container"}>

          <div className="homePageTitle">
            <h1 className="hpWelcome">Hello, {sessionUser?.username}</h1>
          </div>


        <div className="notesAndNotebooksContainer">
          <div className="HN1">

            <div className="homeNotesContainerTitle"> <h1 className="AS">Notes </h1> </div>
            <div className='homeNotesContainer'>
              {notes?.map((note) => (

              <NavLink className="navlink" to={`/notebooks/${note.notebookId}`} id={note.id} key={note.id}>
                <div className={darkMode ? "noteItemsDark" : "noteItems"} >

                  <div className="notetitle">
                    <h2 > {note.title}</h2>
                  </div>

                  <div className="notecontent">
                    <h3> {ReactHtmlParser(note.content)}</h3>
                  </div>
                    <p className="timeP">{moment(note.updatedAt).format("MMM-DD")}</p>

                </div>

              </NavLink>

              ))}

            </div>
          </div>


          <div className='homeNotebooksContainer'>

            <div className="notebookTitleDiv">
              <h1 className={ "notebooktitle"}>NOTEBOOKS</h1>
              <i  className="fas fa-plus fa-lg" onClick={() => setShow(true)}></i>
            </div>

            {notebooks?.length > 0 && notebooks?.map((notebook) => (

              <NavLink id={notebook.id} key={notebook.id}  className="NL" to={`/notebooks/${notebook.id}`}> <h2 className={darkMode ? "notebookTitleDark" : "notebookTitle"}> {notebook.title}</h2> </NavLink>

            ))}
          </div>

       </div>




        {show && (
        <Modal onClose={() => setShow(false)}>
          <div className={darkMode ? "createModalDark" : "createModal"}>
            <h1>Create Notebook</h1>
            <form onSubmit={createNotebookSubmit} id="my-form">
              <input
                  className='CreateInput1'
                  type="text"
                  placeholder="Title"
                  required
                  value={title}
                  onChange={updateTitle}
                  maxLength="25"
                  minLength="1"
                  />
            </form>
            <button type="submit" form="my-form" className="CreateNoteButton" >Create</button>
            <ul className="errors">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        </Modal>
  )}






      </div>
    </>
  )
}


export default HomePage;
