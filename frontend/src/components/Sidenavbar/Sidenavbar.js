
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlus, faStar } from '@fortawesome/free-solid-svg-icons'

import './Sidenavbar.css';
import { NavLink, useHistory } from 'react-router-dom'



const Sidenavbar = ({name, notebooks}) => {
  const dispatch = useDispatch();

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


              <div className="sidenavbar-top-create-note">
                  <div className="create-note-btn" >
                      <FontAwesomeIcon className="icon" icon={faPlus} />
                      <div className="title">
                          New Note
                      </div>
                  </div>

                  <a href="/home">home</a>
              </div>


              <div className="sidenavbar-top-menu-item">
                  <ul>
                      <li>
                      {notebooks?.length > 0 && notebooks?.map((notebook) => (
                          <>
                          <NavLink to={`/notebooks/${notebook.id}`}> <h2 id={notebook.id} key={notebook.id} > {notebook.title}</h2> </NavLink>
                          </>
                        ))}
                      </li>
                  </ul>
                <button onClick={logout}>log out</button>
              </div>
          </div>

          <div className="sidenavbar-bottom">
            <h3>made by brandon</h3>
          </div>
      </div>
  )
}

export default Sidenavbar;
