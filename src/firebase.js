import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

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
    alert(error);
  }
};

const login = async (email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error);
    alert(error)
    
  }
};

const logout = () => {
    signOut(suth)
}


export {auth, db, login, signup, logout}