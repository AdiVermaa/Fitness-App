import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDyPBC7uDCyRebB_YihUyK0sU_non_Onbg",
  authDomain: "levelup-fit-68d5d.firebaseapp.com",
  projectId: "levelup-fit-68d5d",
  storageBucket: "levelup-fit-68d5d.appspot.com",
  messagingSenderId: "86792644299",
  appId: "1:86792644299:web:527c923c9220a534015d4e",
  measurementId: "G-3D56VZ26J4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app); 