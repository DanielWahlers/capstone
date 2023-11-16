
import './App.css';
import NavBar from "./NavBar.js"
import React from 'react';
import Posts from './Posts.js';

export default function App() {
// gather post information here

  return (
    <div className="App">
      <main>
        <NavBar/>
        <Posts />
      </main>
    </div>
  );
}

