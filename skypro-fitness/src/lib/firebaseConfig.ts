import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDpVSTytoO4f6FeYm8KI3eU6xfVCQbXxpA",
  authDomain: "fitness-1-fc14d.firebaseapp.com",
  projectId: "fitness-1-fc14d",
  storageBucket: "fitness-1-fc14d.firebasestorage.app",
  messagingSenderId: "869691870202",
  appId: "1:869691870202:web:299bef71db78b90344f243"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db, firebaseConfig};