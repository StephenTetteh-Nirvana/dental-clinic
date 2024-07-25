import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBd4EzFiGzpaHJvHsf_Ucp3FknIP5zCF-U",
  authDomain: "dental-clinic-42556.firebaseapp.com",
  projectId: "dental-clinic-42556",
  storageBucket: "dental-clinic-42556.appspot.com",
  messagingSenderId: "280623813974",
  appId: "1:280623813974:web:9a7a1404d616283dff32f7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
  db,
  auth
}