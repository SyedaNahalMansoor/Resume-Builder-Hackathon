import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcCI_65EyZgQ_b70F7Ycq3Oyn_AWHYMmc",
  authDomain: "hackathon-d5888.firebaseapp.com",
  projectId: "hackathon-d5888",
  storageBucket: "hackathon-d5888.firebasestorage.app",
  messagingSenderId: "1069877498466",
  appId: "1:1069877498466:web:0e67872cd4d1f29c64373b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);