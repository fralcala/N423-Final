import $ from "jquery";

export function render() {
  return `<h1>Welcome to the Saved Page</h1>
<div id="clickMe" class="btn">Click Me</div>`;
}

export function init() {
  console.log("saved function called");

  $("#clickMe").on("click", function () {
    alert("You clicked the button on the Saved Page!");
  });
}
