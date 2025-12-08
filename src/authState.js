import { getAuth, onAuthStateChanged } from "firebase/auth";

export let currentUser = null;

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  console.log("Auth state changed:", user?.email || "No user");
});
