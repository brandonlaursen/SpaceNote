import ReactHtmlParser from "react-html-parser";
import moment from "moment";
import { NavLink } from "react-router-dom";

function HomeNotesContainer({ notes, darkMode }) {
  
  return (
    <div className="HN1">
    <div className="homeNotesContainerTitle">
      {" "}
      <h1 className="AS">Notes </h1>{" "}
    </div>
    <div className="homeNotesContainer">
      {notes?.map((note) => (
        <NavLink
          className="navlink"
          to={`/notebooks/${note.notebookId}`}
          id={note.id}
          key={note.id}
        >
          <div className={darkMode ? "noteItemsDark" : "noteItems"}>
            <div className="notetitle">
              <h2> {note.title}</h2>
            </div>

            <div className="notecontent">
              <h3> {ReactHtmlParser(note.content)}</h3>
            </div>
            <p className="timeP">
              {moment(note.updatedAt).format("MMM-DD")}
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  </div>
  );
}

export default HomeNotesContainer;
