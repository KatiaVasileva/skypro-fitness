// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3CTRcISPpWmBuCqT7_4q8qDrvwBcYR9s",
  authDomain: "fitness-cee19.firebaseapp.com",
  databaseURL:
    "https://fitness-cee19-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitness-cee19",
  storageBucket: "fitness-cee19.appspot.com",
  messagingSenderId: "299938279026",
  appId: "1:299938279026:web:70f45eed5a15e75df2dceb",
  //measurementId: "G-S26PVJKL9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
//const analytics = getAnalytics(app);

export { app, auth, db };
