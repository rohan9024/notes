
import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDHzjMRZMUZnLoVCDVscu2PsuB9VMHBhEU",
  authDomain: "notes-6462b.firebaseapp.com",
  projectId: "notes-6462b",
  storageBucket: "notes-6462b.appspot.com",
  messagingSenderId: "939471836868",
  appId: "1:939471836868:web:649a2cf06c8f8831d31b91",
  measurementId: "G-6EHSD6EMJN"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app);

export { db, auth, storage };