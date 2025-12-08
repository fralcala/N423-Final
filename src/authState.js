import { auth } from "./firebase.js"; // use the initialized auth
import { onAuthStateChanged } from "firebase/auth";

export let currentUser = null;

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  console.log("Auth state changed:", user?.email || "No user");
});
