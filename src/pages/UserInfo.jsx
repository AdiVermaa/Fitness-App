import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { doc, setDoc, deleteDoc } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import './Auth.css';

const initialState = {
  name: '',
  age: '',
  contact: '',
};

function UserInfo() {
  const [form, setForm] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [notification, setNotification] = useState('');
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const { firebaseUser } = useUser();

  useEffect(() => {
    if (showModal && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (showModal && countdown === 0) {
      handleFail();
    }
  }, [showModal, countdown]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firebaseUser) return;
    await setDoc(doc(db, 'userInfo', firebaseUser.uid), form);
    setShowModal(true);
    setCountdown(5);
  };

  const handleAccept = () => {
    setShowModal(false);
    setTimeout(() => {
      setNotification("you have completed all neccessary requirements of the secret quest 'Courage Of The Weak'");
      setTimeout(() => navigate('/'), 2500);
    }, 100);
  };

  const handleFail = async () => {
    setShowModal(false);
    setTimeout(async () => {
      if (firebaseUser) {
        await deleteDoc(doc(db, 'userInfo', firebaseUser.uid));
      }
      setNotification('you failed');
      setFailed(true);
      setTimeout(async () => {
        await signOut(auth);
        navigate('/login');
      }, 2000);
    }, 100);
  };

  const handleDecline = async () => {
    setShowModal(false);
    setTimeout(async () => {
      if (firebaseUser) {
        await deleteDoc(doc(db, 'userInfo', firebaseUser.uid));
      }
      setNotification('you failed');
      setFailed(true);
      setTimeout(async () => {
        await signOut(auth);
        navigate('/login');
      }, 2000);
    }, 100);
  };

  return (
    <div className="auth-bg">
      <div className="auth-bg-img jinwoo-bg" />
      {(!showModal && !notification) && (
        <div className="auth-container">
          <h2>User Information</h2>
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
            <input name="age" placeholder="Age" value={form.age} onChange={handleChange} required type="number" min="1" />
            <input name="contact" placeholder="Contact Number" value={form.contact} onChange={handleChange} required />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {showModal && (
        <div className="system-modal-overlay">
          <div className="system-modal-card">
            <div className="system-modal-title">! notification</div>
            <div className="system-modal-message">
              ur system will crash in <span className="countdown-red">{countdown}</span> seconds if u choose not to accept.<br />will you accept?
            </div>
            <div className="system-modal-actions">
              <button className="btn" onClick={handleAccept}>Yes</button>
              <button className="btn danger-btn" onClick={handleDecline}>No</button>
            </div>
          </div>
        </div>
      )}
      {notification && (
        <div className={`system-notification ${failed ? 'error' : 'info'}`} style={{position:'fixed',top:'50%',left:'50%',transform:'translate(-50%,-50%)',zIndex:2000,minWidth:'320px',maxWidth:'90vw'}}>
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
}

export default UserInfo; 