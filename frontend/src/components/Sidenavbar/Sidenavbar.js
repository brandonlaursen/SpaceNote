
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import React, { useState } from 'react';
import { useEffect } from "react";
import { getUsersNotebooksThunk } from "../../store/notebooks";
import { useSelector } from "react-redux";

import './Sidenavbar.css';
import { NavLink } from 'react-router-dom'


const Sidenavbar = ({name, notebooks, profile}) => {

  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const [showNotebooksNav, setShowNotebooksNav] = useState(false);

  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {

    if(sessionUser){
      dispatch(getUsersNotebooksThunk(sessionUser?.id))
      // dispatch(getNotebookNotesThunk(""))
    }

  }, [dispatch, sessionUser])


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
                  <i className="fas fa-search"></i>
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

                <h3 className="notebooksNavTitle"><i className="fas fa-pen"></i> <NavLink to="/allnotes" className="navhome1"> New note</NavLink> </h3>
                <h3 className="notebooksNavTitle"><i className="fas fa-space-shuttle"></i> <NavLink to="/home" className="navhome">Home</NavLink> </h3>
                <h3 className="notebooksNavTitle"><i className="far fa-sticky-note"></i> Notes</h3>


              <div className="sidenavbar-top-menu-item">

                <h3 className="notebooksNavTitle" onClick={() => setShowNotebooksNav(!showNotebooksNav)} > <i className="fas fa-book"></i> Notebooks</h3>
                {showNotebooksNav &&
                  <div className="NavNotebookContainer">
                    <ul>
                        <li>
                        {notebooks?.length > 0 && notebooks?.map((notebook) => (

                            <NavLink id={notebook.id} key={notebook.id} to={`/notebooks/${notebook.id}`}> <h3 className="NavNotebooks"> <i className="fas fa-book-open"></i> {notebook.title.length > 11 ? notebook.title.slice(0, 11) + "..." : notebook.title}</h3> </NavLink>

                            ))}
                        </li>
                    </ul>
                  </div>
                }


                <h3 className="notebooksNavTitle" onClick={logout}><i className="fas fa-sign-out-alt" > </i> Sign Out</h3>
              </div>
          </div>

          <div className="sidenavbar-bottom">
            <h3 className="madeBy">Made by Brandon</h3>
          </div>
      </div>
  )
}

export default Sidenavbar;
