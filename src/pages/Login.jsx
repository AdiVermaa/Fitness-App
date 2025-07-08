import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import bg1 from '../assets/bg1.jpg';
import bg2 from '../assets/bg2.jpg';
import bg3 from '../assets/bg3.jpg';
import bg4 from '../assets/bg4.jpg';
import jinwoo from '../assets/jinwoo.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const images = [bg1, bg2, bg3, bg4, jinwoo];
  const [bgIndex, setBgIndex] = useState(0);
  const [fade, setFade] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setBgIndex((prev) => (prev + 1) % images.length);
        setFade(false);
      }, 600); // fade duration
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userInfo = localStorage.getItem('userinfo');
      if (!userInfo) {
        navigate('/userinfo');
      } else {
        navigate('/');
      }
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No account found for this email. Please sign up first.');
      } else {
        setError(err.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      const userInfo = localStorage.getItem('userinfo');
      if (!userInfo) {
        navigate('/userinfo');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-bg">
      <div
        className={`auth-bg-img${fade ? ' fade' : ''}`}
        style={{
          background: `linear-gradient(rgba(20,20,30,0.7), rgba(20,20,30,0.7)), url(${images[bgIndex]}) center/cover no-repeat`,
          transition: 'opacity 0.6s',
          opacity: fade ? 0 : 1
        }}
      />
      <div className="auth-container">
        <h2>Login</h2>
        <button className="google-btn" onClick={handleGoogleSignIn} type="button">
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="google-icon" />
          Continue with Google
        </button>
        <div className="divider">or</div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="auth-error">{error}</p>}
        </form>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
}

export default Login; 