import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Passwords must match']);
  };

  return (
    <div className="signinBG">
      <div className="signupFormContainer">
        <img className="signinIcon" src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/000000/external-space-space-and-galaxy-itim2101-lineal-color-itim2101.png" height="75" width="75" alt=""/>
        <h1>SpaceNote</h1>
        <p>Remember everything important.</p>
        <form  className='signinForm' onSubmit={handleSubmit}>
          <ul className="signinErrors">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
          <label>

            <input
              placeholder="Email"
              className="signinInput"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="Username"
              className="signinInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="Password"
              className="signinInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            <input
              placeholder="Confirm Password"
              className="signinInput"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button  className="signinSubmit" type="submit">Sign Up</button>
          <p>Already have an account?</p>
          <a className="loginAccount" href="/login">Sign In</a>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
