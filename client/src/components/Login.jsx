import React, { useState, useEffect } from "react";

const Login = ({ handleSignIn }) => {

  return (
    <div className="landingPage">
      <h3>Landing Page stuff</h3>
      <div className='loginForm'>

        <form>

            <label>
              <input
                type="email"
                placeholder="Email"
              />
            </label>

            <label>
              <input
                type="password"
                placeholder="Password"
              />
            </label>

            <button type="submit">Log In</button>

        </form>

        <hr className='line-break'/>

        <button onClick={handleSignIn} className='googleSignInButton'>Sign in with Google</button>
      </div>

    </div>
  );
}

export default Login;