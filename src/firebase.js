import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDRE4ioO2JvGQ7rG8XqUQaKoFx82IphCms",
  authDomain: "netflix-clone-dd2c5.firebaseapp.com",
  projectId: "netflix-clone-dd2c5",
  storageBucket: "netflix-clone-dd2c5.firebasestorage.app",
  messagingSenderId: "260455998759",
  appId: "1:260455998759:web:282619296983a9f458b502",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
      toast.error(error.code.split('/') [1].split('-').join(' '))
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
   toast.error(error.code.split('/') [1].split('-').join(' '))

    
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out ✅");
  } catch (error) {
    console.error("Logout error ❌", error);
  }
};

export {auth, db, login, signup, logout}