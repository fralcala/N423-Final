import "./scss/styles.scss";
import $ from "jquery";

import * as Home from "./pages/home.js";
import * as Profile from "./pages/profile.js";
import * as Saved from "./pages/saved.js";
import * as Search from "./pages/search.js";

const routes = {
  home: Home,
  profile: Profile,
  saved: Saved,
  search: Search,
};

// //
// router
function changeRoute(routeName) {
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
  // NAV CLICK HANDLER — VERY IMPORTANT
  $("nav").on("click", "a[data-route]", function (e) {
    e.preventDefault(); // stop page reload
    const route = $(this).data("route");
    changeRoute(route);
  });

  // Load default route on page load
  changeRoute("home");
});

window.changeRoute = changeRoute;

// //
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
