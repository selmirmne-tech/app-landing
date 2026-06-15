import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCIo7jynlobq1RUNhHFpOzD7kUdtv7qR14",
  authDomain: "prijave-95663.firebaseapp.com",
  databaseURL: "https://prijave-95663-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "prijave-95663",
  storageBucket: "prijave-95663.firebasestorage.app",
  messagingSenderId: "807431087581",
  appId: "1:807431087581:web:92fd63298eb94c2b200234",
  measurementId: "G-FWEM6NQNQQ"
};
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

// AUTH (OVO JE NOVO)
export const auth = getAuth(app);