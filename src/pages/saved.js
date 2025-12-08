import $ from "jquery";
import { currentUser } from "../authState.js";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function loadSaved() {
  if (!currentUser) {
    console.log("User is not logged in.");
    return;
  }

  const savedRef = collection(db, "users", currentUser.uid, "saved");

  onSnapshot(savedRef, (snapshot) => {
    const container = document.querySelector(".saved-list");
    container.innerHTML = "";

    snapshot.forEach((doc) => {
      const meal = doc.data();
      container.innerHTML += `
        <div class="saved-recipe">
          <a href="#" data-route="recipe-${meal.idMeal}">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <h2>${meal.strMeal}</h2></a>
        </div>
      `;
    });
  });
}

export function render() {
  return `
  <div class="saved-page">
    <h1>Your Recipes</h1>
    <div class="saved-list">
    </div>
  </div>
  `;
}

export function init() {
  console.log("saved function called");

  loadSaved();
}
