// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = { 
  apiKey: "AIzaSyAEKUxhHnO7X0bZeJkZ50-o_8wYZlhyzTw", 
  authDomain: "iknowaguy-64f8b.firebaseapp.com", 
  databaseURL: "https://iknowaguy-64f8b-default-rtdb.firebaseio.com", 
  projectId: "iknowaguy-64f8b", 
  storageBucket: "iknowaguy-64f8b.firebasestorage.app", 
  messagingSenderId: "765314059389", 
  appId: "1:765314059389:web:492af9c47f918570517514", 
  measurementId: "G-G548S1JH6D" 
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db=getFirestore(app);
export const storage=getStorage(app);