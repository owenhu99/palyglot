import React from "react";
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import NavBar from './NavBar';

function App() {
  return (
    <div className="App">
      <div className="app">
        <NavBar></NavBar>
      </div>
      <div className="app_body">
        <Sidebar></Sidebar>
        <Chat></Chat>
      </div>
    </div>
  );
}

export default App;
