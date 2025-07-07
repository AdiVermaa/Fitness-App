import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import XPBar from '../components/XPBar';
import LevelUpModal from '../components/LevelUpModal';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import mainBg from '../assets/main_bg.jpg';

function Home() {
  const { user, firebaseUser } = useUser();
  const [userInfo, setUserInfo] = React.useState(null);
  React.useEffect(() => {
    const fetchUserInfo = async () => {
      if (!firebaseUser) return;
      const docSnap = await getDoc(doc(db, 'userInfo', firebaseUser.uid));
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
      }
    };
    fetchUserInfo();
  }, [firebaseUser]);
  
  return (
    <div className="home-page" style={{ minHeight: '100vh', padding: '2.5rem 0', backgroundImage: `url(${mainBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <LevelUpModal />
      <div className="system-box welcome-box" style={{ marginBottom: '2.5rem', borderRadius: '1.5rem', border: '2px solid #6ec1ff' }}>
        <h2 className="system-title" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><span role="img" aria-label="wave">👋</span>Welcome, {userInfo ? userInfo.name : 'Hunter'}</h2>
        <p style={{ fontSize: '1.1rem', color: '#b3d8ff', marginBottom: '1.5rem' }}>The world needs your strength. Complete daily quests to level up and increase your rank.</p>
        <div className="player-status" style={{ marginTop: '1.5rem', marginBottom: '1.5rem', background: 'rgba(30,34,60,0.92)', borderRadius: '1rem', padding: '1.2rem 1.5rem', boxShadow: '0 2px 16px #0d6efd22' }}>
          <h3 style={{ color: '#6ec1ff', marginBottom: '1rem' }}>Current Status</h3>
          <XPBar />
          <p style={{ fontWeight: 700, color: '#fff', margin: '0.7rem 0' }}>Total XP: {user.xp}</p>
          <p style={{ fontWeight: 700, color: '#fff', margin: '0.7rem 0' }}>Quests Completed: {user.completedQuests.length}</p>
        </div>
        <div className="button-container" style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/quests" className="btn" style={{ fontSize: '1.1rem', padding: '0.9rem 2.2rem', borderRadius: '0.7rem', background: 'linear-gradient(90deg, #0d6efd 60%, #6ec1ff 100%)', boxShadow: '0 0 12px #0d6efd55' }}>View Daily Quests</Link>
        </div>
      </div>
      <div className="system-box motivation-box" style={{ marginBottom: '2.5rem', borderRadius: '1.5rem', border: '2px solid #c18fff' }}>
        <h2 className="system-title" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}><span role="img" aria-label="system">🛡️</span>The System</h2>
        <p className="quote" style={{ fontSize: '1.1rem', color: '#b3d8ff', marginBottom: '1.2rem' }}>&quot;I alone level up.&quot;</p>
        <p style={{ color: '#b3d8ff' }}>Your journey from weakness to strength begins now. Will you rise to become the world's strongest hunter?</p>
      </div>
    </div>
  );
}

export default Home;