import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC3CTRcISPpWmBuCqT7_4q8qDrvwBcYR9s",
  authDomain: "fitness-cee19.firebaseapp.com",
  databaseURL: "https://fitness-cee19-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-cee19",
  storageBucket: "fitness-cee19.firebasestorage.app",
  messagingSenderId: "299938279026",
  appId: "1:299938279026:web:70f45eed5a15e75df2dceb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db, firebaseConfig};