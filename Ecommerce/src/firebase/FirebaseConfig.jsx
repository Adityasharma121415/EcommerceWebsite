// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOijwEZtLorWtnvaxKdU4_mhXl9vhs3jU",
  authDomain: "shopify-df924.firebaseapp.com",
  projectId: "shopify-df924",
  storageBucket: "shopify-df924.appspot.com",
  messagingSenderId: "1028706239687",
  appId: "1:1028706239687:web:3e3814e3b0cbf1cb5c2ae2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }