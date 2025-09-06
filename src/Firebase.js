// src/Firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB78ywQCvGm45bZaAlG_e4bRShEe0MdruQ",
  authDomain: "my-final-project-fe617.firebaseapp.com",
  projectId: "my-final-project-fe617",
  storageBucket: "my-final-project-fe617.firebasestorage.app",
  messagingSenderId: "553698086348",
  appId: "1:553698086348:web:000c39b211eecbfb99a169",
  measurementId: "G-ZZW4PFMV7B"
};

// Инициализация Firebase.
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Провайдеры.
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();

// Функции входа.
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);
