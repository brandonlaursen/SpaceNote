import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import {
  getUsersNotebooksThunk,
  postNotebookThunk,
} from "../../store/notebooks";
import { getUsersNotesThunk } from "../../store/notes";
import { Modal } from "../../context/Modal";
import { ThemeContext } from "../../context/Theme";
import { useShowModal } from "../../context/showModal";
import Sidenavbar from "../Sidenavbar/Sidenavbar";
import HomeNotesContainer from "./HomeNotesContainer";
import HomeNotebooksContainer from "./HomeNotebooksContainer";
import CreateNotebook from "./CreateNotebook";

function HomePage() {
  const { darkMode } = useContext(ThemeContext);

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const notebooks = useSelector((state) => state?.notebooks?.notebooks);
  const notes = useSelector((state) => state?.notes?.notes);

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const { show, setShow, num } = useShowModal();

  useEffect(() => {
    const errors = [];

    if (title.length === 25)
      errors.push("Max Length for a title is 25 characters");
    if (title.length < 1) errors.push("Title needs at least one character");
    setErrors(errors);
  }, [title]);

  useEffect(() => {
    if (sessionUser) {
      dispatch(getUsersNotebooksThunk(sessionUser?.id));
      dispatch(getUsersNotesThunk(sessionUser?.id));
    }
  }, [dispatch, sessionUser, num]);

  const createNotebookSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      userId: sessionUser.id,
    };
    dispatch(postNotebookThunk(payload)).then(() =>
      dispatch(getUsersNotebooksThunk(sessionUser?.id))
    );
    setShow(false);
    setTitle("");
  };

  const updateTitle = (e) => setTitle(e.target.value);

  return (
    <>
      <Sidenavbar name={sessionUser?.username} notebooks={notebooks} />

      <div
        className={darkMode ? "homepage-containerDark" : "homepage-container"}
      >
        <div className="homePageTitle">
          <h1 className="hpWelcome">Hello, {sessionUser?.username}</h1>
        </div>

        <div className="notesAndNotebooksContainer">
          <HomeNotesContainer notes={notes} darkMode={darkMode} />
          <HomeNotebooksContainer
            notebooks={notebooks}
            setShow={setShow}
            darkMode={darkMode}
          />
        </div>

        {show && (
          <Modal onClose={() => setShow(false)}>
            <CreateNotebook
              darkMode={darkMode}
              createNotebookSubmit={createNotebookSubmit}
              title={title}
              updateTitle={updateTitle}
              errors={errors}
            />
             <CreateNotebook
              darkMode={darkMode}
              createNotebookSubmit={createNotebookSubmit}
              title={title}
              updateTitle={updateTitle}
              errors={errors}
            />
          </Modal>
        )}
      </div>
    </>
  );
}

export default HomePage;
