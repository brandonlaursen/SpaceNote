
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'

import './Sidenavbar.css';
import { NavLink, useHistory } from 'react-router-dom'



const Sidenavbar = ({name, notebooks, profile}) => {

  const dispatch = useDispatch();
  const [showNotebooksNav, setShowNotebooksNav] = useState(false);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };


  return (
      <div className="sidenavbar">
          <div className="sidenavbar-top">
              <div className="sidenavbar-top-profile">
                  <div className="profile-icon">
                  </div>

                  <div className="profile-title">
                      {name}
                  </div>
              </div>


              <div className="sidenavbar-top-search">
                  <div className="search-block">
                      <FontAwesomeIcon className="icon" icon={faSearch} />
                      <input className= "search" placeholder="Search" />
                  </div>
              </div>


              {/* <div className="sidenavbar-top-create-note">
                  <div className="create-note-btn" >

                    <div className="title">
                    <i class="fas fa-pen"></i> New Note
                    </div>

                  </div>
              </div> */}

                <h3 className="notebooksNavTitle"><i class="fas fa-pen"></i> <a href="/home" className="navhome1"> New note</a> </h3>
                <h3 className="notebooksNavTitle"><i class="fas fa-space-shuttle"></i> <a href="/home" className="navhome">Home</a> </h3>
                <h3 className="notebooksNavTitle"><i class="far fa-sticky-note"></i> Notes</h3>


              <div className="sidenavbar-top-menu-item">

                <h3 className="notebooksNavTitle" onClick={() => setShowNotebooksNav(!showNotebooksNav)} > <i class="fas fa-book"></i> Notebooks</h3>
                {showNotebooksNav &&
                  <div className="NavNotebookContainer">
                    <ul>
                        <li>
                        {notebooks?.length > 0 && notebooks?.map((notebook) => (
                            <>
                            <NavLink to={`/notebooks/${notebook.id}`}> <h3 id={notebook.id} key={notebook.id} className="NavNotebooks"> <i class="fas fa-book-open"></i> {notebook.title.length > 11 ? notebook.title.slice(0, 11) + "..." : notebook.title}</h3> </NavLink>
                            </>
                            ))}
                        </li>
                    </ul>
                  </div>
                }


                <h3 className="notebooksNavTitle" onClick={logout}><i class="fas fa-sign-out-alt" > </i> Sign Out</h3>
              </div>
          </div>

          <div className="sidenavbar-bottom">
            <h3 className="madeBy">Made by Brandon</h3>
          </div>
      </div>
  )
}

export default Sidenavbar;
