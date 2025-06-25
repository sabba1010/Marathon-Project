// src/firebase/firebase.config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbMzcz7wEzgqOuackNQ0tfiVrrJnSjdF4",
  authDomain: "marathon-auth-56d09.firebaseapp.com",
  projectId: "marathon-auth-56d09",
  appId: "1:842949305017:web:ba881dafa2b39588823168",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
