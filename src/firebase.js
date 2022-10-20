// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjXQjJwkEMYJfDXmQj99SLzFtsoOTakz8",
  authDomain: "realtor-clone-react-8a873.firebaseapp.com",
  projectId: "realtor-clone-react-8a873",
  storageBucket: "realtor-clone-react-8a873.appspot.com",
  messagingSenderId: "626683998298",
  appId: "1:626683998298:web:c3e9a9cc97b09429416863"
};

// Initialize Firebase
 initializeApp(firebaseConfig);
 export const db = getFirestore()