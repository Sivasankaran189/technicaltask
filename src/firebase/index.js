// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTA2SQ0Oa0y5Ke9Gq2uQBSuCgwzapxJ1U",
  authDomain: "student-managemnet-db596.firebaseapp.com",
  projectId: "student-managemnet-db596",
  storageBucket: "student-managemnet-db596.appspot.com",
  messagingSenderId: "363379855872",
  appId: "1:363379855872:web:514f67ed0abf669450bee5",
  measurementId: "G-VHRX9PQHVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
 
const db = getFirestore();

export{db};
