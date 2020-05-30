import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="http://localhost:4000/auth/google"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign in with Google
        </a>
      </header>
    </div>
  );
}

export default App;
