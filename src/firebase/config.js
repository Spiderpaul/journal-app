// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJi2NhpcsopBltq8zSlDHZzkK1waZPpEg",
  authDomain: "journal-app-dbe30.firebaseapp.com",
  projectId: "journal-app-dbe30",
  storageBucket: "journal-app-dbe30.appspot.com",
  messagingSenderId: "333097743215",
  appId: "1:333097743215:web:36a79638405b5bedbe2e9a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );