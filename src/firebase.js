// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEqZhmDYaTtzBh5jtV3vpHmYkKsXGw2hc",
  authDomain: "todo-app-73851.firebaseapp.com",
  projectId: "todo-app-73851",
  storageBucket: "todo-app-73851.appspot.com",
  messagingSenderId: "447823297851",
  appId: "1:447823297851:web:8253be0a640ab974324b1e",
  measurementId: "G-6ZSSKDNSPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)