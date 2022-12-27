import React from 'react';
import './App.css';
import Header from './components/Header/Header';

import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Header/>
      <Login/>
    </div>
  );
}

export default App;
