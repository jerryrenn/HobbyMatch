import React, { useState, useEffect } from "react";
import Form from './Form';
import logo from '../../../hobbyMatch-logo5.png';
import SavedHobbies from './SavedHobbies.jsx';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [savedPage, setSavedPage] = useState(false);
  const [uid, setuid] = useState('');

  const firebaseConfig = {
    apiKey: 'AIzaSyA4yA_YmGFIIzZm_ChTKpqEPvxN4KHUUkA',
    authDomain: 'hobbymatch-58988.firebaseapp.com',
    projectId: 'hobbymatch-58988',
    storageBucket: 'hobbymatch-58988.appspot.com',
    messagingSenderId: '776134511464',
    appId: '1:776134511464:web:829ad3e746ff2116b1a4dd'
  };
  const app = initializeApp(firebaseConfig);

  const auth = getAuth();

  const handleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const uid = user.uid
        setuid(uid);
        // console.log("User:", user);
        setIsAuth(!isAuth);
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error("Google Sign-In Error:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // User signed out successfully
        console.log("User signed out");
        setIsAuth(!isAuth);
        // Implement any additional sign-out logic here
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Sign-Out Error:", error);
      });
  };

  const handleViewSaveClick = () => {
    setSavedPage(!savedPage);
  }

  return (
    <div id="App">
      <div className='header-bar'>
      <img src={logo} alt="HobbyMatch Logo" className="logo" />
      {!isAuth && (<button onClick={handleSignIn}>Sign in with Google</button>)}
      {isAuth && (<button onClick={handleSignOut}>Sign out</button>)}
      {isAuth && (
        <button onClick={handleViewSaveClick}>
          {savedPage ? "Back" : "Saved"}
        </button>
      )}

      </div>
      {isAuth && !savedPage && (< Form uid={uid}/>)}
      {isAuth && savedPage && (< SavedHobbies uid={uid}/>)}
    </div>
  );
}