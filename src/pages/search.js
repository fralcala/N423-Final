import $ from "jquery";

export function render() {
  return `<h1>Welcome to the Search Page</h1>
<div id="clickMe" class="btn">Click Me</div>`;
}

export function init() {
  console.log("search function called");

  $("#clickMe").on("click", function () {
    alert("You clicked the button on the Search Page!");
  });
}
