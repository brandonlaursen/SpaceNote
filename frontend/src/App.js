import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./components/HomePage/HomePage";
import LoginFormPage from "./components/LoginFormPage/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage/SignupFormPage";
import SplashPage from "./components/SplashPage/SplashPage";
import Notebook from "./components/Notebook/Notebook";
import * as sessionActions from "./store/session";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  if (!isLoaded) {
    return (
      <div id="loading">
        <img
          src={
            "https://cdn.dribbble.com/users/146798/screenshots/2933118/rocket.gif"
          }
          alt="Loading..."
        />
        <h3 className="loadingText">Loading...</h3>
      </div>
    );
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          {sessionUser ? <Redirect to="/home" /> : null}
          <SplashPage />
        </Route>
        <ProtectedRoute exact path="/home">
          <HomePage />
        </ProtectedRoute>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <ProtectedRoute path="/notebooks/:notebookId">
          <Notebook />
        </ProtectedRoute>
        <Route>Page Not Found</Route>
      </Switch>
    </>
  );
}

export default App;
