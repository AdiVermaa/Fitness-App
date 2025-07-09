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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [isFading, setIsFading] = useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex((currentIndex + 1) % images.length);
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, 1200); // fade duration
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  React.useEffect(() => {
    document.body.classList.add('auth-bg-active');
    return () => {
      document.body.classList.remove('auth-bg-active');
    };
  }, []);

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
      {/* Current image (fades out) */}
      <div
        className="auth-bg-img"
        style={{
          background: `linear-gradient(rgba(20,20,30,0.7), rgba(20,20,30,0.7)), url(${images[currentIndex]}) center/cover no-repeat`,
          zIndex: 0,
          opacity: isFading ? 0 : 1,
          transition: 'opacity 1.2s',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      />
      {/* Next image (fades in) */}
      <div
        className="auth-bg-img"
        style={{
          background: `linear-gradient(rgba(20,20,30,0.7), rgba(20,20,30,0.7)), url(${images[nextIndex]}) center/cover no-repeat`,
          zIndex: 1,
          opacity: isFading ? 1 : 0,
          transition: 'opacity 1.2s',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
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