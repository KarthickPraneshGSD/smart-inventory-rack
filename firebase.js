// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIZtoVNy88BFnBrJP74jPdZAv01JvfqsU",
  authDomain: "smart-inventory-rack.firebaseapp.com",
  projectId: "smart-inventory-rack",
  storageBucket: "smart-inventory-rack.appspot.com",
  messagingSenderId: "1081356245240",
  appId: "1:1081356245240:web:80173a12a979bb6ce2030d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

console.log("🔥 Firebase initialized", db);