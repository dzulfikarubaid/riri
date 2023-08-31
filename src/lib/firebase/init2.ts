// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY2,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN2,
  projectId: process.env.FIREBASE_PROJECT_ID2,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET2,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID2,
  appId: process.env.FIREBASE_APP_ID2
};

// Initialize Firebase
const app2 = initializeApp(firebaseConfig);
export default app2