import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useUser } from '../context/UserContext';

const UserInfoGuard = ({ children }) => {
  const { firebaseUser, authLoading } = useUser();
  const [loading, setLoading] = useState(true);
  const [hasInfo, setHasInfo] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!firebaseUser) return;
      const docSnap = await getDoc(doc(db, 'userInfo', firebaseUser.uid));
      setHasInfo(docSnap.exists());
      setLoading(false);
    };
    if (firebaseUser) check();
  }, [firebaseUser]);

  if (authLoading || loading) return <div>Loading...</div>;
  if (!hasInfo) return <Navigate to='/userinfo' replace />;
  return children;
};

export default UserInfoGuard; 