import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADqVlOHVlaEi24kdf5COWkkyHI-hvOLW4",
  authDomain: "open-chat-fc8b8.firebaseapp.com",
  projectId: "open-chat-fc8b8",
  storageBucket: "open-chat-fc8b8.appspot.com",
  messagingSenderId: "969311426018",
  appId: "1:969311426018:web:1a0a4d6f78dff5892395bb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
