import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axiosInstance from './axiosSetup';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;