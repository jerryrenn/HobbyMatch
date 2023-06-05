import React, { useState, useEffect } from "react";
import Form from './Form';
import logo from '../../../hobbyMatch-logo5.png';
import SignIn from './SignIn.jsx';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  const setAuth = () => {
    setIsAuth(!isAuth);
  }

  const getAllHobbies = () => {
    //axios call to localhost
    //populate a state
    //pass state down as prop to SavedHobbies
  }

  return (
    <div id="App">
      <div className='header-bar'>
      <img src={logo} alt="HobbyMatch Logo" className="logo" />
      </div>
      < SignIn setAuth={setAuth}/> {/*  conditionally render  */}
      {isAuth && (< Form />)}
    </div>
  );
}