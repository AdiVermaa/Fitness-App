import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import Home from './pages/Home';
import Quests from './pages/Quests';
import Profile from './pages/Profile';
import About from './pages/About';
import './index.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <UserProvider>
      <Router>
        <div className="app">
          <nav className="top-nav">
            <div className="nav-container">
              <Link to="/" className="nav-logo" onClick={closeMenu}>Solo Leveling</Link>
              <div className="hamburger" onClick={toggleMenu}>
                <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
                <div className={`bar ${menuOpen ? 'active' : ''}`}></div>
              </div>
              <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
                <NavLink to="/" className="nav-item" onClick={closeMenu}>Home</NavLink>
                <NavLink to="/quests" className="nav-item" onClick={closeMenu}>Quests</NavLink>
                <NavLink to="/profile" className="nav-item" onClick={closeMenu}>Profile</NavLink>
                <NavLink to="/about" className="nav-item" onClick={closeMenu}>About</NavLink>
              </div>
            </div>
          </nav>
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quests" element={<Quests />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;