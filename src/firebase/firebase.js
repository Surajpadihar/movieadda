
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAbAPVdu9QiwVsgRGHJlpb0obIsqxaONrQ",
  authDomain: "filmyadda-56a0b.firebaseapp.com",
  projectId: "filmyadda-56a0b",
  storageBucket: "filmyadda-56a0b.appspot.com",
  messagingSenderId: "582282007800",
  appId: "1:582282007800:web:eed96c537c4087dfec170d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieRef = collection(db,"movies");
export const reviewRef = collection(db,"reviews");
export const userRef = collection(db,"user");
export default app;