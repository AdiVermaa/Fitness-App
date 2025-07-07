import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import XPBar from '../components/XPBar';
import RankBadge from '../components/RankBadge';
import { auth, db } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential, GoogleAuthProvider, reauthenticateWithPopup } from 'firebase/auth';
import mainBg from '../assets/main_bg.jpg';

function Profile() {
  const { user, resetProgress, firebaseUser } = useUser();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', age: '', contact: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePhrase, setDeletePhrase] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [showSignOutWarning, setShowSignOutWarning] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [reauthError, setReauthError] = useState('');
  const [errorNotification, setErrorNotification] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!firebaseUser) return;
      setLoading(true);
      const docSnap = await getDoc(doc(db, 'userInfo', firebaseUser.uid));
      if (docSnap.exists()) {
        setUserInfo(docSnap.data());
        setEditForm(docSnap.data());
      }
      setLoading(false);
    };
    fetchUserInfo();
  }, [firebaseUser]);

  const handleSignOut = async () => {
    setShowSignOutWarning(true);
  };

  const confirmSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const cancelSignOut = () => {
    setShowSignOutWarning(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!firebaseUser) return;
    setSaving(true);
    await setDoc(doc(db, 'userInfo', firebaseUser.uid), editForm);
    setUserInfo(editForm);
    setEditMode(false);
    setSaving(false);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
    setDeletePhrase('');
  };

  const handleDeleteConfirm = async (e) => {
    e.preventDefault();
    if (!firebaseUser) return;
    setDeleting(true);
    setReauthError('');
    try {
      // Determine provider
      const providerId = firebaseUser.providerData[0]?.providerId;
      if (providerId === 'password') {
        if (!deletePassword) {
          setReauthError('Please enter your password to confirm.');
          setDeleting(false);
          return;
        }
        const credential = EmailAuthProvider.credential(firebaseUser.email, deletePassword);
        await reauthenticateWithCredential(firebaseUser, credential);
      } else if (providerId === 'google.com') {
        const provider = new GoogleAuthProvider();
        await reauthenticateWithPopup(firebaseUser, provider);
      }
      await deleteDoc(doc(db, 'userInfo', firebaseUser.uid));
      await firebaseUser.delete();
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      setReauthError(err.message);
      setErrorNotification(err.message);
    }
    setDeleting(false);
    setShowDeleteConfirm(false);
    setDeletePassword('');
  };

  const handleResetProgress = () => {
    setShowResetConfirm(true);
  };

  const confirmResetProgress = () => {
    resetProgress((doReset) => {
      doReset();
      setShowResetConfirm(false);
    });
  };

  const cancelResetProgress = () => {
    setShowResetConfirm(false);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Group completed quests by date
  const groupQuestsByDate = () => {
    const grouped = {};
    const sortedQuests = [...user.completedQuests].sort((a, b) =>
      new Date(b.completedAt) - new Date(a.completedAt)
    );
    sortedQuests.forEach(quest => {
      const date = new Date(quest.completedAt).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(quest);
    });
    return grouped;
  };

  const questsByDate = groupQuestsByDate();

  return (
    <div className="profile-page" style={{ minHeight: '100vh', backgroundImage: `url(${mainBg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="system-box">
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn" onClick={handleSignOut}>Sign Out</button>
        </div>
        {showSignOutWarning && (
          <div className="system-modal-overlay">
            <div className="system-modal-card">
              <div className="system-modal-title">System Warning</div>
              <div className="system-modal-message">
                Are you sure you want to sign out?
              </div>
              <div className="system-modal-actions">
                <button className="btn danger-btn" onClick={confirmSignOut}>Sign Out</button>
                <button className="btn" onClick={cancelSignOut}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        <h2 className="system-title">{userInfo ? `${userInfo.name}'s Profile` : 'Profile'}</h2>
        <div className="profile-status">
          <div className="profile-header">
            <div className="profile-level">
              Level {user.level} <RankBadge rank={user.rank} />
            </div>
          </div>
          <XPBar />
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-label">Total XP:</span>
              <span className="stat-value">{user.xp}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Quests Completed:</span>
              <span className="stat-value">{user.completedQuests.length}</span>
            </div>
            <div className="stat-item">
                <span className="stat-label">Days Active:</span>
                <span className="stat-value">{user.days}</span>
            </div>
          </div>
        </div>
        <div className="user-info-section">
          {loading ? (
            <p>Loading user info...</p>
          ) : editMode ? (
            <form onSubmit={handleEditSave} className="edit-userinfo-form">
              <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Name" required />
              <input name="age" value={editForm.age} onChange={handleEditChange} placeholder="Age" required type="number" min="1" />
              <input name="contact" value={editForm.contact} onChange={handleEditChange} placeholder="Contact Number" required />
              <button className="btn" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
              <button className="btn danger-btn" type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          ) : userInfo ? (
            <div className="user-info-display">
              <div><b>Name:</b> {userInfo.name}</div>
              <div><b>Age:</b> {userInfo.age}</div>
              <div><b>Contact:</b> {userInfo.contact}</div>
              <button className="btn" onClick={handleEdit}>Edit Info</button>
            </div>
          ) : (
            <p>No user info found.</p>
          )}
        </div>
        <div className="quest-history">
          <h3 className="system-title">Quest History</h3>
          {Object.keys(questsByDate).length > 0 ? (
            Object.entries(questsByDate).map(([date, quests]) => (
              <div key={date} className="quest-day">
                <h4 className="date-header">{date}</h4>
                <div className="day-quests">
                  {quests.map(quest => (
                    <div key={quest.id} className="quest-history-item">
                      <div className="quest-header">
                        <span className="quest-title">{quest.title}</span>
                        <span className="quest-xp">+{quest.xp} XP</span>
                      </div>
                      <p className="quest-description">{quest.description}</p>
                      <div className="completed-time">
                        Completed: {formatDate(quest.completedAt)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="no-history">No completed quests yet. Rise, {userInfo ? userInfo.name : 'hunter'}!</p>
          )}
        </div>
        <div className="reset-section">
          <h3 className="danger-zone-title">Danger Zone</h3>
          <p>Reset all progress and start over as E-Rank Hunter.</p>
          <button className="btn danger-btn" onClick={handleResetProgress}>
            Reset Progress
          </button>
          <button className="btn danger-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
        {showDeleteConfirm && (
          <div className="system-modal-overlay">
            <form className="system-modal-card delete-account-form" onSubmit={handleDeleteConfirm} style={{maxWidth: 400, margin: '0 auto'}}>
              <div className="system-modal-title" style={{color:'#ff3b3b'}}>Delete Account</div>
              <div className="system-modal-message" style={{marginBottom:'1.2rem'}}>
                <div style={{fontWeight:700, marginBottom:'0.7rem'}}>
                  This action is <span style={{color:'#ff3b3b'}}>irreversible</span>.<br/>
                  Type <span style={{fontFamily:'monospace', color:'#ff3b3b'}}>yes delete my account</span> to confirm.
                </div>
                <input
                  type="text"
                  value={deletePhrase}
                  onChange={e => setDeletePhrase(e.target.value)}
                  placeholder="Type the phrase exactly"
                  style={{
                    width: '100%',
                    padding: '0.6rem',
                    borderRadius: '0.5rem',
                    border: '1.5px solid #ff3b3b',
                    marginBottom: '0.7rem',
                    fontFamily: 'inherit',
                    color: deletePhrase.toLowerCase().includes('yes delete my account') ? '#ff3b3b' : undefined
                  }}
                  autoFocus
                />
                {firebaseUser?.providerData[0]?.providerId === 'password' && (
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={e => setDeletePassword(e.target.value)}
                    placeholder="Enter your password to confirm"
                    style={{width:'100%',padding:'0.6rem',borderRadius:'0.5rem',border:'1.5px solid #ff3b3b',marginBottom:'0.7rem',fontFamily:'inherit'}}
                  />
                )}
                {reauthError && <div style={{color:'#ff6b6b', marginBottom:'0.7rem'}}>{reauthError}</div>}
              </div>
              <div className="system-modal-actions">
                <button className="btn danger-btn" type="submit" disabled={deletePhrase !== 'yes delete my account' || deleting}>
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
                <button className="btn" type="button" onClick={()=>setShowDeleteConfirm(false)} disabled={deleting}>Cancel</button>
              </div>
            </form>
          </div>
        )}
        {showResetConfirm && (
          <div className="system-modal-overlay">
            <div className="system-modal-card" style={{borderColor:'#ff3b3b'}}>
              <div className="system-modal-title" style={{color:'#ff3b3b'}}>Warning</div>
              <div className="system-modal-message" style={{color:'#ff3b3b', marginBottom:'1.2rem'}}>
                Are you sure you want to reset all progress? This cannot be undone!
              </div>
              <div className="system-modal-actions">
                <button className="btn danger-btn" onClick={confirmResetProgress}>Reset</button>
                <button className="btn" onClick={cancelResetProgress}>Cancel</button>
              </div>
            </div>
          </div>
        )}
        {errorNotification && (
          <div className="system-modal-overlay">
            <div className="system-modal-card" style={{borderColor:'#ff3b3b'}}>
              <div className="system-modal-title" style={{color:'#ff3b3b'}}>Warning</div>
              <div className="system-modal-message" style={{color:'#ff3b3b', marginBottom:'1.2rem'}}>{errorNotification}</div>
              <div className="system-modal-actions">
                <button className="btn" onClick={()=>setErrorNotification('')}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;