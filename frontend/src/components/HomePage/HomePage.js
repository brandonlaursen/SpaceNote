import "./HomePage.css"
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";



function HomePage() {

  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  if (!sessionUser) return (
    <Redirect to="/login" />
  );


  const logout = e => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return(
    <>
      <h1>Hello from the home page</h1>
      <button onClick={logout}>log out</button>
    </>
  )
}


export default HomePage;
