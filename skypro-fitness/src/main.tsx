import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyA8RfKsYSgTAjfbhAxxcZ8hk6e0Xak3w44",
  authDomain: "skypro-fitness-b31e8.firebaseapp.com",
  projectId: "skypro-fitness-b31e8",
  storageBucket: "skypro-fitness-b31e8.appspot.com",
  messagingSenderId: "225486768493",
  appId: "1:225486768493:web:aa942b32b25470128b7264",
  measurementId: "G-EJ52489FNP"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
