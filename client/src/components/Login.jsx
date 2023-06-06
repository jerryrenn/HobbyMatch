import React, { useState, useEffect } from "react";
import googleLogo from '../../../googleSignInLogo.png'

const Login = ({ handleSignIn }) => {

  return (
    <div className="landingPage">
      <h2>Find The Perfect Hobby</h2>
      <h3>Discover your passion and explore new hobbies with our interactive hobby generator. Get personalized hobby recommendations tailored to your interests and preferences. From adventurous outdoor activities to creative indoor pursuits, our platform helps you find the perfect hobby to enrich your life. Start your journey today and unlock a world of endless possibilities!</h3>
      <div className='loginForm'>
        <h3 className='login-header'>Welcome</h3>
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

          <button type="submit">Continue</button>

        </form>

        <div class="line-break">
          <div class="line"></div>
          <span class="or-text">or</span>
          <div class="line"></div>
        </div>

        <button onClick={handleSignIn} className='googleSignInButton'>
          <img src={googleLogo} alt="Google Sign-In" className="googleSignInLogo" />
          Sign in with Google
        </button>
      </div>

    </div>
  );
}

export default Login;