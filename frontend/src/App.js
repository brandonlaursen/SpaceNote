import React, { useState, useEffect } from "react";
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import HomePage from './components/HomePage/HomePage';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';
import SplashPage from './components/SplashPage/SplashPage';
import * as sessionActions from "./store/session";


function App() {


  // const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  <SplashPage/>
  return (
    <>
      <Switch>

        <Route exact path='/'>
        <SplashPage/>
        </Route>
        <Route exact path='/home'>
          <HomePage />
        </Route>
        <Route exact path='/login'>
          <LoginFormPage />
        </Route>
        <Route exact path='/signup'>
          <SignupFormPage />
        </Route>
        <Route>
            Page Not Found
        </Route>
      </Switch>
    </>
  );
}

export default App;


 // const dispatch = useDispatch();
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // useEffect(() => {
  //   dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  // }, [dispatch]);
/* <h1>hello2</h1>
      <Navigation isLoaded={isLoaded} />
      <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>Hello I am a Modal</h1>
        </Modal>
      )}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
        </Switch>
      )} */
