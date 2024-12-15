// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYrWPFO3BXW2Kv_ay6BYcWNtcgbqGHbfM",
    authDomain: "carpro-d0a28.firebaseapp.com",
    projectId: "carpro-d0a28",
    storageBucket: "carpro-d0a28.firebasestorage.app",
    messagingSenderId: "625155412624",
    appId: "1:625155412624:web:4b23abe8bdf69cc67cbe15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
