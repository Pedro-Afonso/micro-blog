// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
/* import { getAnalytics } from "firebase/analytics"; */
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.env.VITE_API_KEY,
  authDomain: import.meta.env.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.env.VITE_APP_ID,
  measurementId: import.meta.env.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
/* const analytics = getAnalytics(app); */

const db = getFirestore(app);

export { db };