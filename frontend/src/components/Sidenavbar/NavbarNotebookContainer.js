import { NavLink } from "react-router-dom";

function NavNotebookContainer({ notebooks }) {
  return (
    <div className="NavNotebookContainer">
      <ul>
        <li>
          {notebooks?.length > 0 &&
            notebooks?.map((notebook) => (
              <NavLink
                id={notebook.id}
                key={notebook.id}
                to={`/notebooks/${notebook.id}`}
              >
                {" "}
                <h3 className="NavNotebooks">
                  {" "}
                  <i className="fas fa-book-open"></i>{" "}
                  {notebook.title.length > 11
                    ? notebook.title.slice(0, 11) + "..."
                    : notebook.title}
                </h3>{" "}
              </NavLink>
            ))}
        </li>
      </ul>
    </div>
  );
}

export default NavNotebookContainer;
