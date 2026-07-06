import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForHackathonEvaluator",
  authDomain: "sanchalakai.firebaseapp.com",
  projectId: "sanchalakai",
  storageBucket: "sanchalakai.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

export const app = initializeApp(firebaseConfig);
