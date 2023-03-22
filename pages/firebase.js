import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdz-t3BG3NJX8KcOmw9b1A1-ZA0xzwuMs",
    authDomain: "ecommer-68e01.firebaseapp.com",
    projectId: "ecommer-68e01",
    storageBucket: "ecommer-68e01.appspot.com",
    messagingSenderId: "867366814382",
    appId: "1:867366814382:web:b08d89723f561da11ee33f",
    measurementId: "G-ZXD3B66Y80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)