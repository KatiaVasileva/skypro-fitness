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
  apiKey: "AIzaSyCsNZL9OWoTFVXZZf9zmqT5wTQeQx_naXc",
  authDomain: "skyfitnesspro-5d4b3.firebaseapp.com",
  projectId: "skyfitnesspro-5d4b3",
  storageBucket: "skyfitnesspro-5d4b3.appspot.com",
  messagingSenderId: "429558793401",
  appId: "1:429558793401:web:9e3da8762041d22a958768",
  //measurementId: "G-S26PVJKL9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app)
//const analytics = getAnalytics(app);

export { app, auth, db };