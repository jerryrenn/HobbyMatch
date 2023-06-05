import React, { useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";


const SignIn = ({setAuth}) => {
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
        // User signed in successfully
        const user = result.user;
        console.log("User:", user);
        setAuth();
        // Redirect to the home page or Form.jsx component
        // Implement the redirection logic here
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
        setAuth();
        // Implement any additional sign-out logic here
      })
      .catch((error) => {
        // Handle sign-out errors
        console.error("Sign-Out Error:", error);
      });
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};

export default SignIn;
