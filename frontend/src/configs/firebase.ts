import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Load .env variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
}

console.log('Initializing firebase client', getApps());

let firebaseApp;
try {
    firebaseApp = getApp('client-app');
} catch (ex) {
    console.log('There is no client firebase app, Creating...');
    firebaseApp = initializeApp(firebaseConfig, 'client-app');
}

export const firebaseAuth = getAuth(firebaseApp);
