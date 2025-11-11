import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUIcX0syM1ptIHI4k4RDonK1qHRvWKeHo",
  authDomain: "cprg306-assignments-81c39.firebaseapp.com",
  projectId: "cprg306-assignments-81c39",
  storageBucket: "cprg306-assignments-81c39.firebasestorage.app",
  messagingSenderId: "129499114231",
  appId: "1:129499114231:web:5c1a1f89dc7d8c1da581f2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;