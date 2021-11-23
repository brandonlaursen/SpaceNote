import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import './LoginFormPage.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  // const demo = (e) => {
  //   e.preventDefault();
  //   setCredential("Demo-lition");
  //   setPassword("password")
  //   return dispatch(sessionActions.login({ credential, password }))
  // }

  const demo = async () => {
    return dispatch(
      sessionActions.login({ credential: "Demo-lition", password: "password" })
    );
  };




  return (
    <div className="loginBG">
      <div className="loginFormContainer">
        <img className="loginIcon" src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/000000/external-space-space-and-galaxy-itim2101-lineal-color-itim2101.png" height="75" width="75" alt=""/>
        <h1>SpaceNote</h1>
        <p className="remember">Remember everything important.</p>
        <form className='loginForm' onSubmit={handleSubmit}>
          <ul className="loginErrors">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <input
              className="loginInput"
              placeholder="Username or Email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}

            />
          </label>
          <label>
            <input
              className="loginInput"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}

            />
          </label>
          <button className="loginSubmit" type="submit">Log In</button>
        </form>
        <button className="demoLoginSubmit" onClick={demo} type="submit">Demo</button>
        <p>Don't have an account?</p>
        <a className="createAccount" href="/signup">Create Account</a>
      </div>
    </div>
  );
}

export default LoginFormPage;
