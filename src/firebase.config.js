// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMcCSgMq4dKGbeY8LyYV3BQe283Wsk0es",
  authDomain: "house-marketplace-app-7b381.firebaseapp.com",
  projectId: "house-marketplace-app-7b381",
  storageBucket: "house-marketplace-app-7b381.appspot.com",
  messagingSenderId: "940566476763",
  appId: "1:940566476763:web:89c6fdf1c42b9cb60ed9fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
