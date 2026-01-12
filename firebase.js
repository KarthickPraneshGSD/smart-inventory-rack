const firebaseConfig = {
  apiKey: "AIzaSyBIZtoVNy88BFnBrJP74jPdZAv01JvfqsU",
  authDomain: "smart-inventory-rack.firebaseapp.com",
  projectId: "smart-inventory-rack",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

console.log("🔥 Firebase initialized");
