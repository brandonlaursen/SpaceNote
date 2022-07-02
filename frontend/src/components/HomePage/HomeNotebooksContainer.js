import { NavLink } from "react-router-dom";

function HomeNotebooksContainer({ notebooks, setShow, darkMode }) {
  return (
    <div className="homeNotebooksContainer">
      <div className="notebookTitleDiv">
        <h1 className={"notebooktitle"}>NOTEBOOKS</h1>
        <i className="fas fa-plus fa-lg" onClick={() => setShow(true)}></i>
      </div>

      {notebooks.length > 0 &&
        notebooks.map((notebook) => (
          <NavLink
            id={notebook.id}
            key={notebook.id}
            className="NL"
            to={`/notebooks/${notebook.id}`}
          >
            {" "}
            <h2 className={darkMode ? "notebookTitleDark" : "notebookTitle"}>
              {" "}
              {notebook.title}
            </h2>{" "}
          </NavLink>
        ))}
    </div>
  );
}

export default HomeNotebooksContainer;
