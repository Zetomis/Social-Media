import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdY-7XospTmVjt2Coe6qKzpmbBrXjWsdU",
    authDomain: "social-media-245de.firebaseapp.com",
    projectId: "social-media-245de",
    storageBucket: "social-media-245de.appspot.com",
    messagingSenderId: "234582288607",
    appId: "1:234582288607:web:2013600e4ac0623f2da16a",
    measurementId: "G-S24DY4V6JE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
