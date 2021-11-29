import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import { useEffect } from "react";
import { getUsersNotebooksThunk } from "../../store/notebooks";
import { useSelector } from "react-redux";
import { useShowModal } from '../../context/showModal';
import { searchNotesThunk } from "../../store/search";
import './Sidenavbar.css';
import { useContext } from "react";
import { NavLink } from 'react-router-dom'
import { ThemeContext } from "../../context/Theme";


const Sidenavbar = ({name, notebooks, profile}) => {

  const {darkMode, setDarkMode} = useContext(ThemeContext);


  const handleTheme = () => {
    setDarkMode(!darkMode)
    localStorage.setItem('darkMode', !darkMode);
  }

  

  const { num } = useShowModal();
  const dispatch = useDispatch();

  const path = window.location.href;
  const sessionUser = useSelector(state => state.session.user);
  const searchNotes = useSelector((state) => state.search.notes);

  const [search, setSearch] = useState("");
  const [showNotebooksNav, setShowNotebooksNav] = useState(false);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {

    dispatch(searchNotesThunk(search, sessionUser.id))

  }, [search, dispatch, sessionUser.id])


  useEffect(() => {

    if(sessionUser){
      dispatch(getUsersNotebooksThunk(sessionUser?.id))

    }

  }, [dispatch, sessionUser, num, path])

  const hide = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)){
    document.querySelector(".searchResAll").style.display = "none";
    }
  }

  const show = () => {
    document.querySelector(".searchResAll").style.display = "block";

  }

  const hide2 = () => {
    document.querySelector(".searchResAll").style.display = "none";
    setSearch("")
  }




  return (
      <div className="sidenavbar">
          <div className="sidenavbar-top">
              <div className="sidenavbar-top-profile">
                  <div className="profile-icon">
                  </div>

                  <div className="profile-title">
                      {name}
               <i onClick={handleTheme} className={darkMode ? "themeButton fas fa-sun" : "themeButton far fa-moon"}></i>
                  </div>
              </div>


              <div className="sidenavbar-top-search" onBlur={(e) => hide(e) } onFocus={() => show()}>
                  <div className=" e search-block" >
                    <i className="fas fa-search"></i>
                    <form>
                        <input className= "search"
                          placeholder="Search"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                  </div>

                <div className="searchResAll">
                  {search?.length >= 1 && searchNotes?.map((note) => (
                  <div  className="searchResultsContainer" id={note.id} key={note.id} >
                        <NavLink onClick={hide2} className="searchResItem" to={`/notebooks/${note.notebookId}`} >{note.title.length > 11 ? note.title.slice(0, 11) + "..." : note.title}</NavLink>
                    </div>

                  ))}
                </div>
              </div>


              {/* <div className="sidenavbar-top-create-note">
                  <div className="create-note-btn" >

                    <div className="title">
                    <i class="fas fa-pen"></i> New Note
                    </div>

                  </div>
              </div> */}

                {/* <h3 className="notebooksNavTitle"><i className="fas fa-pen"></i> <NavLink to="/allnotes" className="navhome2"> New note</NavLink> </h3> */}
                <h3 className="notebooksNavTitle"> <NavLink to="/home" className="navhome"><i className=" ui fas fa-space-shuttle"></i>Home</NavLink> </h3>
                {/* <h3 className="notebooksNavTitle"><i className="bb far fa-sticky-note"></i> <NavLink to="/allnotes" className="navhome1"> Notes </NavLink></h3> */}


              <div className="sidenavbar-top-menu-item">

                <h3 className="notebooksNavTitle" onClick={() => setShowNotebooksNav(!showNotebooksNav)} > <i className=" x fas fa-book"></i> Notebooks</h3>
                {showNotebooksNav &&
                  <div className="NavNotebookContainer" >
                    <ul>
                        <li>
                        {notebooks?.length > 0 && notebooks?.map((notebook) => (

                            <NavLink id={notebook.id} key={notebook.id} to={`/notebooks/${notebook.id}`}> <h3 className="NavNotebooks"> <i className="fas fa-book-open"></i> {notebook.title.length > 11 ? notebook.title.slice(0, 11) + "..." : notebook.title}</h3> </NavLink>

                            ))}
                        </li>
                    </ul>
                  </div>
                }

                  <h3 className="notebooksNavTitle">    <a href="https://www.linkedin.com/in/brandon-laursen-398563218/" className=" z navhome"><i className="xx fab fa-linkedin"></i>LinkedIn</a> </h3>
                  <h3 className="notebooksNavTitle">   <a href="https://github.com/brandonlaursen" className="y navhome"><i className=" xx fab fa-github"></i>GitHub</a> </h3>
                  <h3 className="notebooksNavTitle" onClick={logout}><i className="fas fa-sign-out-alt" > </i> Sign Out</h3>
              </div>
          </div>

      </div>
  )
}

export default Sidenavbar;
