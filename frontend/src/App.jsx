import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar /> {/* Include the Navbar component */}
      {/* Define your routes here */}
      <Routes>
      </Routes>
    </Router>
  )
}

export default App
