// Import required Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,           // Keep your existing popup method
  signInWithPhoneNumber,     // Keep your existing phone auth
  RecaptchaVerifier,         // Keep your existing recaptcha
  signInWithRedirect,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
  connectAuthEmulator,
  getRedirectResult,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  connectFirestoreEmulator
} from "firebase/firestore";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { getStorage, connectStorageEmulator, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const functions = getFunctions(app);     
const storage = getStorage(app);

// Connect to emulators if running locally
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);  // ← ADD THIS
  connectStorageEmulator(storage, 'localhost', 9199);      // ← ADD THIS
}

// Export all Firebase services needed in the app
export {
  auth,
  db,
  functions,
  storage,
  doc,
  getDoc,
  signOut,
  googleProvider,
  signInWithPopup,           // Keep existing
  signInWithPhoneNumber,     // Keep existing  
  RecaptchaVerifier,         // Keep existing
  signInWithRedirect,        // Add new
  sendSignInLinkToEmail,     // Add new
  isSignInWithEmailLink,     // Add new
  signInWithEmailLink,       // Add new
  onAuthStateChanged,
  getRedirectResult,
  ref,              
  uploadBytes,      
  getDownloadURL,   
  updateProfile
};