import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { searchNotesThunk } from "../../store/search";

function Search({ sessionUser }) {
  const searchNotes = useSelector((state) => state.search);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (search.length > 0) {
      dispatch(searchNotesThunk(search, sessionUser.id));
    }
  }, [search, dispatch, sessionUser.id]);

  const hide = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      document.querySelector(".searchResAll").style.display = "none";
    }
  };

  const show = () => {
    document.querySelector(".searchResAll").style.display = "block";
  };

  const hide2 = () => {
    document.querySelector(".searchResAll").style.display = "none";
    setSearch("");
  };

  return (
    <div
      className="sidenavbar-top-search"
      onBlur={(e) => hide(e)}
      onFocus={() => show()}
    >
      <div className=" e search-block">
        <i className="fas fa-search"></i>
        <form>
          <input
            className="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      <div className="searchResAll">
        {search?.length >= 1 &&
          searchNotes?.map((note) => (
            <div className="searchResultsContainer" id={note.id} key={note.id}>
              <NavLink
                onClick={hide2}
                className="searchResItem"
                to={`/notebooks/${note.notebookId}`}
              >
                {note.title.length > 11
                  ? note.title.slice(0, 11) + "..."
                  : note.title}
              </NavLink>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Search;
