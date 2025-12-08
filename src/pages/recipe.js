import $ from "jquery";

function getRecipe(id) {
  $.getJSON(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
    function (data) {
      if (!data.meals) {
        $(".recipe-page").html("<h1>Recipe Not Found</h1>");
        return;
      }

      const meal = data.meals[0];

      //  //   start of ingredients list//
      let ingredientsHTML = "<ul>";

      //   loops through ingredients and measurements
      for (let i = 1; i <= 20; i++) {
        // Get ingredient and measure from api
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim() !== "") {
          ingredientsHTML += `<li>${ingredient} — ${measure}</li>`;
        }
      }

      ingredientsHTML += "</ul>";
      //   // end of ingredients list//

      $(".recipe-content").html(`
      
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="recipe-details">
        <h2>${meal.strMeal}</h2>

        <div class="section">
            <h3>Ingredients:/</h3>
            ${ingredientsHTML}
        </div>
        
        <div class="section">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        </div>

    
    `);

      $("#backBtn").on("click", () => {
        changeRoute("home");
      });
    }
  );
}

export function render() {
  return `
  <div class="recipe-page">
    <div class="buttons">        
        <button id="backBtn"><i class="fa-solid fa-arrow-left"></i></button>
        <button id="saveBtn"><i class="fa-solid fa-bookmark"></i></button>
    </div>
    <div class="recipe-content">
        <p>Loading recipe...</p>
    </div>
</div>`;
}

export function init(id) {
  console.log("recipe function called");
  getRecipe(id);
}
