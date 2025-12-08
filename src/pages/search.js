import $ from "jquery";

function getRecipes() {
  let ranRecipeURL = "https://www.themealdb.com/api/json/v1/1/random.php";

  $.getJSON(ranRecipeURL, (data) => {
    // console.log(data);
    const container = $(".results-container");
    container.empty(); // Clear previous content

    let requests = []; //creates array for the requests

    // Makes 10 calls to the api
    for (let i = 0; i < 10; i++) {
      requests.push(
        $.getJSON("https://www.themealdb.com/api/json/v1/1/random.php")
      );
    }

    $.when.apply($, requests).done(function (...results) {
      results.forEach((result) => {
        const data = result[0];
        const meal = data.meals[0];

        container.append(`
          <a href="#" data-route="recipe-${meal.idMeal}">
            <div class="result">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

                <div class="result-text">
                  <h2>${meal.strMeal}</h2>
                  <p>${meal.strArea} | ${meal.strCategory}</p>
                </div>
            </div>
           </a>
         `);
      });
    });
  });
}

function searchRecipes(query) {
  if (!query) {
    getFeaturedRecipesTemp();
    return;
  }

  $.getJSON(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    (data) => {
      const container = $(".results-container");
      container.empty();

      if (!data.meals) {
        container.html("<p>No results found.</p>");
        return;
      }

      data.meals.forEach((meal) => {
        container.append(`
          <a href="#" data-route="recipe-${meal.idMeal}">
            <div class="result">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />

                <div class="result-text">
                  <h2>${meal.strMeal}</h2>
                  <p>${meal.strArea} | ${meal.strCategory}</p>
                </div>
            </div>
           </a>
         `);
      });
    }
  );
}

// Spoonacular API
const apiKey = "01ad11f4f61b4811baead8409f960737";

function searchByIngredients(ingredientsArray) {
  if (!ingredientsArray.length) return;

  const ingredientsStr = ingredientsArray.join(",");
  $.getJSON(
    `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsStr}&number=10&ranking=1&ignorePantry=true&apiKey=${apiKey}`,
    (data) => {
      const container = $(".results-container");
      container.empty();
      if (!data || data.length === 0) {
        container.html("<p>No recipes found.</p>");
        return;
      }

      data.forEach((recipe) => {
        container.append(`
        <a href="#" data-route="recipe-${recipe.id}">
          <div class="result">
            <img src="${recipe.image}" alt="${recipe.title}" />
            <div class="result-text">
              <h2>${recipe.title}</h2>
              <p>Used Ingredients: ${recipe.usedIngredientCount} | Missing: ${recipe.missedIngredientCount}</p>
            </div>
          </div>
        </a>
      `);
      });
    }
  );
}

export function render() {
  return `<div class="search-page">
  <div class="search-wrapper">
    <div class="search-bar">
    
      <i class="fa fa-bars" id="filterToggle"></i>
      
      <input type="search" id="site-search" name="q" placeholder="Search..." />
      <i class="fa fa-search"></i>
    </div>
    <div class="filter-container">
    <label><input type="checkbox" value="tomato"> Tomato</label>
    <label><input type="checkbox" value="cheese"> Cheese</label>
    <label><input type="checkbox" value="garlic"> Garlic</label>
    <label><input type="checkbox" value="flour"> Flour</label>
    <label><input type="checkbox" value="sugar"> Sugar</label>
    <label><input type="checkbox" value="eggs"> Eggs</label>
<button id="searchByIngredientsBtn">Search</button>
    </div>
    </div>
    <div class="results-container"></div>
  </div>`;
}

export function init() {
  console.log("search function called");

  // Filter toggle
  $(document).off("click", "#filterToggle");
  $(document).on("click", "#filterToggle", function (e) {
    e.preventDefault();
    $(".filter-container").slideToggle();
  });

  // Initial load of recipes and regular search
  getRecipes();
  $("#site-search").on("input", function () {
    const query = $(this).val().trim();
    searchRecipes(query);
  });

  // Search by ingredients by using the checkboxes
  $("#searchByIngredientsBtn").on("click", function () {
    const selected = $("input[type=checkbox]:checked")
      .map((i, el) => el.value)
      .get();
    searchByIngredients(selected);
  });
}
