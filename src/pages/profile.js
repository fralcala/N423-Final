import $ from "jquery";
import { auth } from "../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export function render() {
  return `
  <div class="profileHolder">
  <div class="signUpIn">
    <h2>Log In</h2>
    <form id="loginForm">
      <label for="email">Email:</label>
      <input
        type="email"
        id="loginEmail"
        placeholder="Enter your email"
        required
      />
      <label for="password">Password:</label>
      <input
        type="password"
        id="loginPassword"
        placeholder="Password"
        required
      />
      <button type="submit">Log In</button>
    </form>

    <div class="divider">Don't have an account? Sign Up!</div>
    <h2>Sign Up</h2>
    <form id="signupForm">
      <label for="email">Email:</label>
      <input
        type="email"
        id="signupEmail"
        placeholder="Email"
        required
      />
      <label for="password">Password:</label>
      <input
        type="password"
        id="signupPassword"
        placeholder="Enter your password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  </div>
  <button class="hidden" id="logoutButton">Log Out</button>
  </div>
      `;
}

export function init() {
  console.log("Profile loaded");

  // Signin/up
  const signUpIn = document.querySelector(".signUpIn");
  const logoutButton = document.getElementById("logoutButton");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  async function signup(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed up:", userCredential.user);
      signupForm.reset();
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  async function login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user);
      loginForm.reset();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      signUpIn?.classList.add("hidden");
      logoutButton?.classList.remove("hidden");
    } else {
      signUpIn?.classList.remove("hidden");
      logoutButton?.classList.add("hidden");
    }
  });

  async function logout() {
    try {
      await signOut(auth);
      console.log("User signed out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  signupForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    console.log("Signing up with", email, password);
    signup(email, password);
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    console.log("Logging in with", email, password);
    login(email, password);
  });

  document.getElementById("logoutButton")?.addEventListener("click", () => {
    logout();
  });
}
