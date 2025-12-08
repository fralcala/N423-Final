import "./scss/styles.scss";
import $ from "jquery";

// routes
import * as Home from "./pages/home.js";
import * as Profile from "./pages/profile.js";
import * as Saved from "./pages/saved.js";
import * as Search from "./pages/search.js";
import * as Recipe from "./pages/recipe.js";

// import {
//   collection,
//   addDoc,
//   doc,
//   updateDoc,
//   onSnapshot,
//   deleteDoc,
// } from "firebase/firestore";

//  //  //  //  //  //  //
// // //  //  //  //  //

// router
const routes = {
  home: Home,
  profile: Profile,
  saved: Saved,
  search: Search,
  recipe: Recipe,
};

function changeRoute(routeName) {
  // For recipes
  if (routeName.startsWith("recipe-")) {
    const id = routeName.replace("recipe-", "");

    // Render placeholder
    $("#app").html(Recipe.render(id));

    // Load real data
    if (typeof Recipe.init === "function") {
      Recipe.init(id);
    }

    window.location.hash = routeName;
    return;
  }

  const page = routes[routeName];

  if (!page || !page.render) {
    $("#app").html("<h1>404 — Page Not Found</h1>");
    return;
  }

  // Insert that page's HTML
  $("#app").html(page.render());

  // Run init if it exists
  if (typeof page.init === "function") {
    page.init();
  }

  // Optional: update hash without reloading
  window.location.hash = routeName;
}

$(document).ready(function () {
  $(document).on("click", "a[data-route]", function (e) {
    e.preventDefault();
    const route = $(this).data("route");
    changeRoute(route);
  });

  // Load default route on page load
  changeRoute("home");
});

window.changeRoute = changeRoute;

// // //  //  //  //
// // //  //  //  //

// Toggle top nav
$("#navToggle").on("click", function (e) {
  e.preventDefault();
  $(".links-container").slideToggle();
});

// Handle routing for nav items
$(".top-nav").on("click", "a[data-route]", function (e) {
  e.preventDefault();

  const route = $(this).data("route");
  changeRoute(route);

  // optional: close the menu after clicking a link
  $(".links-container").slideUp();
});

// // //  //  //  //  //
//  //  //  //  //  //  //
// Signin/up & Database

// const addDogForm = document.getElementById("addDogNameForm");
// const dogNamesListDiv = document.querySelector(".dogsNames");

// async function addDogNameToDB(dogName) {
//   let dogObject = { name: dogName };
//   await addDoc(collection(db, "dogs"), dogObject)
//     .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id);
//       addDogForm.reset();
//     })
//     .catch((error) => {
//       console.error("Error adding document: ", error);
//     });
// }

// onSnapshot(collection(db, "dogs"), (snapshot) => {
//   dogNamesListDiv.innerHTML = "";
//   let htmlString = "";

//   snapshot.forEach((doc) => {
//     console.log("Current data: ", doc.data().name);
//     if (doc.data().name != undefined) {
//       htmlString += `
//     <div>
//       <input value="${doc.data().name}" disabled />
//       <button class="editButton" data-id="${doc.id}">Edit</button>
//       <button class="deleteButton" data-id="${doc.id}">Delete</button>
//     </div>
//     `;
//     }
//   });
//   dogNamesListDiv.innerHTML = htmlString;

// const deleteButtons = document.querySelectorAll(".deleteButton");
// deleteButtons.forEach((button) => {
//   button.addEventListener("click", async (e) => {
//     const id = e.target.getAttribute("data-id");
//     console.log("Delete button clicked for ID:", id);
//     await deleteDoc(doc(db, "dogs", id))
//       .then(() => {
//         console.log("Document successfully deleted!");
//       })
//       .catch((error) => {
//         console.error("Error removing document: ", error);
//       });
//   });
// });

//   const editButtons = document.querySelectorAll(".editButton");
//   editButtons.forEach((button) => {
//     button.addEventListener("click", async (e) => {
//       const id = e.target.getAttribute("data-id");
//       const inputField = e.target.previousElementSibling;
//       if (e.target.textContent === "Edit") {
//         inputField.disabled = false;
//         inputField.focus();
//         e.target.textContent = "Save";
//       } else {
//         // Save logic here
//         inputField.disabled = true;
//         e.target.textContent = "Edit";
//         const newName = inputField.value;
//         console.log(
//           "Save button clicked for ID:",
//           id,
//           "with new name:",
//           newName
//         );
//         // Update the document in Firestore
//         const docRef = doc(db, "dogs", id);
//         await updateDoc(docRef, { name: newName })
//           .then(() => {
//             console.log("Document successfully updated!");
//           })
//           .catch((error) => {
//             console.error("Error updating document: ", error);
//           });
//       }
//     });
//   });
// });

// addDogForm?.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const dogName = document.getElementById("dogNameInput").value;
//   addDogNameToDB(dogName);
// });
