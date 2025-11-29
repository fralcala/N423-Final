import $ from "jquery";

export function render() {
  return `<h1>Welcome to the Account Page</h1>
<div id="clickMe" class="btn">Click Me</div>`;
}

export function init() {
  console.log("account function called");

  $("#clickMe").on("click", function () {
    alert("You clicked the button on the Account Page!");
  });
}
