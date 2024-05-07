import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: 'AIzaSyDDJc5qIHqs1EH-tgDXFTwDjTeHtsVKu8Q',
  authDomain: 'foodlink-74e76.firebaseapp.com',
  projectId: 'foodlink-74e76',
  storageBucket: 'foodlink-74e76.appspot.com',
  messagingSenderId: '477970081298',
  appId: '1:477970081298:web:f7f79c561047edb1d69acb',
  measurementId: 'G-MXQ17X357D',
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Check if window is defined before initializing Firebase Analytics
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

if (import.meta.env.VITE_ENV === 'dev') {
  console.log('connecting to emulators');
  connectAuthEmulator(auth, 'http://localhost:9099/auth');
  connectFirestoreEmulator(db, 'localhost', 8080);
}
