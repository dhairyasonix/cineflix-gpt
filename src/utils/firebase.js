// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsE4lTXXq21A7_pn_ccppEE5H8zCAYqow",
  authDomain: "netflixgpt-74c81.firebaseapp.com",
  projectId: "netflixgpt-74c81",
  storageBucket: "netflixgpt-74c81.firebasestorage.app",
  messagingSenderId: "34948262863",
  appId: "1:34948262863:web:fc79bb5669efb839bc00ba",
  measurementId: "G-6G9974WQC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// export const auth = getAuth();

export const auth = getAuth(); // Use the initialized app for authentication
