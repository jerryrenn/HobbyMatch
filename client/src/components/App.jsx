import React from 'react';
import Form from './Form';
import logo from '../../../hobbyMatch-logo5.png';

export default function App() {
  return (
    <div id="App">
      <div className='header-bar'>
      <img src={logo} alt="HobbyMatch Logo" className="logo" />
      </div>
      < Form />
    </div>
  );
}