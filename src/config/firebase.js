// src/config/firebase.js (ou .ts si tu utilises TypeScript)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBwORRFvBEjFoSSF2lZTEB2D6ulnQU22i8",
  authDomain: "projet-stage-66ff4.firebaseapp.com",
  projectId: "projet-stage-66ff4",
  storageBucket: "projet-stage-66ff4.appspot.com", // ✅ corrigé ici
  messagingSenderId: "883380655979",
  appId: "1:883380655979:web:5dbd3f20a428df9acd9e2e"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

// Initialisation Authentification
const auth = getAuth(app);

// Exporter auth
export { auth };
