import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFhL7-ctJ2uJkXcLpz0i3upM6kE3JfsUU",
  authDomain: "n423-final-36482.firebaseapp.com",
  projectId: "n423-final-36482",
  storageBucket: "n423-final-36482.firebasestorage.app",
  messagingSenderId: "369442911597",
  appId: "1:369442911597:web:db64c51e75d1083ec6d664",
  measurementId: "G-NHZY3EN32J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
