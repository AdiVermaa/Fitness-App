import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Home from './pages/Home';
import Quests from './pages/Quests';
import Profile from './pages/Profile';
import About from './pages/About';
import './index.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
          <nav className="bottom-nav">
            <Link to="/" className="nav-item">Home</Link>
            <Link to="/quests" className="nav-item">Quests</Link>
            <Link to="/profile" className="nav-item">Profile</Link>
            <Link to="/about" className="nav-item">About</Link>
          </nav>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;