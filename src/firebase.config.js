import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJPara_-jLYrEv3xHHXqQmwW11EjfjWqU",
  authDomain: "madhouse-marketplace.firebaseapp.com",
  projectId: "madhouse-marketplace",
  storageBucket: "madhouse-marketplace.appspot.com",
  messagingSenderId: "317048837083",
  appId: "1:317048837083:web:a9bb9e96b55bc8d14b0dfe",
  measurementId: "G-L232BYPRR6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore();