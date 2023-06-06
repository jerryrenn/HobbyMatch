import React, { useState, useEffect } from "react";

const Login = ({ handleSignIn }) => {

  return (
    <div className="landingPage">
      <h2>Find The Perfect Hobby</h2>
      <h3>Discover your passion and explore new hobbies with our interactive hobby generator. Get personalized hobby recommendations tailored to your interests and preferences. From adventurous outdoor activities to creative indoor pursuits, our platform helps you find the perfect hobby to enrich your life. Start your journey today and unlock a world of endless possibilities!</h3>
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