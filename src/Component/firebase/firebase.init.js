// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1mtg-2hbeSpaRXzUSExMrPFs-KWJ-Mu4",
  authDomain: "sport-club-management-70a7c.firebaseapp.com",
  projectId: "sport-club-management-70a7c",
  storageBucket: "sport-club-management-70a7c.firebasestorage.app",
  messagingSenderId: "1030477625658",
  appId: "1:1030477625658:web:6068c1028a31249623b803"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

