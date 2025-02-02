// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDncfByTuk4TvukEq4pAEISwQ9ctqC4iSk",
  authDomain: "ecoblog-9f040.firebaseapp.com",
  projectId: "ecoblog-9f040",
  storageBucket: "ecoblog-9f040.firebasestorage.app",
  messagingSenderId: "1076088328205",
  appId: "1:1076088328205:web:4e2ee19a1721f8d9d1c544"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;