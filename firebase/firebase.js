import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFTWfSaDb6x3zsiC4YP6R69fnmjxZPhuk",
    authDomain: "todo-17912.firebaseapp.com",
    projectId: "todo-17912",
    storageBucket: "todo-17912.appspot.com",
    messagingSenderId: "584104324595",
    appId: "1:584104324595:web:02001c55ab675bab5f3686"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)