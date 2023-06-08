import React, { useState, useEffect } from "react";
import Form from './Form';
import logo from '../../../logo5.png';
import SavedHobbies from './SavedHobbies.jsx';
import Login from './Login.jsx';
import axios from 'axios';

import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [savedPage, setSavedPage] = useState(false);
  const [uid, setuid] = useState('');
  const [hobbies, setHobbies] = useState([]);

  const grabHobbies = async (uid) => {
    try {
      const response = await axios.get(`http://localhost:3000/hobby/${uid}`);
      // console.log('what is this response.data[0].hobbies: ', response.data)
      // console.log('what is this UID: ', uid)
      setHobbies(response.data[0].hobbies);
    } catch (error) {
      console.error("Error retrieving hobbies from SavedHobbies.jsx", error);
    }
  };

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
        setIsAuth(!isAuth);
        grabHobbies(uid)
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
      });
  };

  const handleSignInWithEmail = (e, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const uid = user.uid;
        setuid(uid);
        setIsAuth(!isAuth);
        grabHobbies(uid)
      })
      .catch((error) => {
        console.error("Email Sign-Up Error:", error);
      });
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("User signed out");
        setIsAuth(!isAuth);
      })
      .catch((error) => {
        console.error("Sign-Out Error:", error);
      });
  };

  const handleViewSaveClick = () => {
    setSavedPage(!savedPage);
  }

  const filterHobbies = (title) => {
    let newHobbies = hobbies.slice()
    let filteredHobbies = newHobbies.filter((hobby) => !hobby.title.includes(title));
    setHobbies(filteredHobbies);
  }

  return (
    <div id="App">
      <div className='header-bar'>
        <img src={logo} alt="HobbyMatch Logo" className="logo" />
        <div className="header-buttons-container">
          {isAuth && (
            <button onClick={handleViewSaveClick}>
              {savedPage ? "Back" : "Saved"}
            </button>
          )}

          {isAuth && (<button onClick={handleSignOut}>Sign out</button>)}
        </div>
      </div>
      {!isAuth && (<Login handleSignIn={handleSignIn} handleSignInWithEmail={handleSignInWithEmail}/>)}
      {isAuth && !savedPage && (< Form uid={uid} grabHobbies={grabHobbies} />)}
      {isAuth && savedPage && (< SavedHobbies uid={uid} hobbies={hobbies} filterHobbies={filterHobbies} />)}
    </div>
  );
}