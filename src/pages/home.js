import $ from "jquery";

// Spoonacular API
const apiKey = "01ad11f4f61b4811baead8409f960737";

function getFeaturedRecipes() {
  let featuredURL = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`;

  $.getJSON(featuredURL, (data) => {
    console.log(data);

    const container = $(".featured-container");
    container.empty(); // Clear previous content

    data.recipes.forEach((recipe) => {
      container.append(`
        <div class="featured">
          <img src="${recipe.image}" alt="${recipe.title}" />
          <h2>${recipe.title}</h2>
        </div>
      `);
    });
  });
}

// the meal DB
function getFeaturedRecipesTemp() {
  let ranRecipeURL = "https://www.themealdb.com/api/json/v1/1/random.php";

  $.getJSON(ranRecipeURL, (data) => {
    // console.log(data);
    const container = $(".featured-container");
    container.empty(); // Clear previous content

    let requests = []; //creates array for the requests

    // Makes 10 calls to the api
    for (let i = 0; i < 10; i++) {
      requests.push(
        $.getJSON("https://www.themealdb.com/api/json/v1/1/random.php")
      );
    }

    // When the ... appears on the left side of an assignment operator or in function parameters, it collects multiple elements into a single array or object.
    // Once all ten random recipes are called the data is added to featured
    $.when.apply($, requests).done(function (...results) {
      results.forEach((result) => {
        const data = result[0];
        const meal = data.meals[0];

        container.append(`
           <div class="featured">
             <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
           <h2>${meal.strMeal}</h2>
           </div>
         `);
      });
    });
  });
}

export function render() {
  return `
  <div class="featured-section">
    <h1>Featured</h1>
    <div class="featured-container"></div>
  </div>
  
  <div class="your-recipes-section">
  <h1>Your Recipes</h1>
  <div class="your-recipes-container"></div>
  </div>
  `;
}

export function init() {
  // getFeaturedRecipes();
  getFeaturedRecipesTemp();
}
