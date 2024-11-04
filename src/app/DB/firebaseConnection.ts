// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-b41Lz9HJiIi0SauEDdTHuwLEpr2tSwM",
  authDomain: "inknowaguy.firebaseapp.com",
  projectId: "inknowaguy",
  storageBucket: "inknowaguy.appspot.com",
  messagingSenderId: "907859805743",
  appId: "1:907859805743:web:fe1af6b03b357f43aa68da",
  measurementId: "G-RVZLYKPC9W"
};

// Initialize Firebase
export const app= initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const storage=getStorage(app);