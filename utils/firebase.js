// config/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC367XzCq3kRvDXchFbUXhMYCiwoVvm6Vs",
  authDomain: "orb-nexus.firebaseapp.com",
  projectId: "orb-nexus",
  storageBucket: "orb-nexus.appspot.com",
  messagingSenderId: "116591897182",
  appId: "1:116591897182:web:d1f243eefb0de3145c22cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
