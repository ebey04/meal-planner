import {groceriesLoad, groceriesRender, groceriesSave} from "./groceries.js";
import {renderMeals} from "./plan.js";
import {recipesShow, saveRecipes, loadRecipes} from "./recipes.js";

/*DOM ELEMENTS*/

const recipeForm = document.getElementById("recipe-form");
const recipeContainer = document.getElementById("recipes-container");
const mealGrid = document.getElementById('mealGrid');
const toggleBtn = document.getElementById('myToggle');
const clearCheckedBtn = document.getElementById("clear-checked-btn");

/*LISTENERS*/

recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const category = document.getElementById("category").value;

    if (recipes.has(title)) {
    alert("That recipe already exists!");
    return;
}

    recipes.set(title, {
        ingredients: ingredients.split(','),
        instructions: instructions,
        category: category
    })

    saveRecipes();
    recipesShow();

    recipeForm.reset();

})

recipeContainer.addEventListener("click", (event) => {
    if (event.target.matches("h3")) {
    const details = event.target.nextElementSibling;
    details.classList.toggle("open");
    }
});


toggleBtn.addEventListener('change', () => {
    const isChecked = toggleBtn.checked;

    // swap view class
    mealGrid.classList.toggle('dated-view', isChecked);
    mealGrid.classList.toggle('undated-view', !isChecked);

    // update current view variable
    currentView = isChecked ? 'dated' : 'undated';

    // re-render with the current view
    renderMeals(currentView);
});

clearCheckedBtn.addEventListener("click", () => {
    checkedBoxes = document.querySelectorAll('#grocery-shopping input[type="checkbox"]:checked');

    checkedBoxes.forEach(checkbox => {
    const itemName = checkbox.parentElement.dataset.item;
    groceries.delete(itemName);

    groceriesSave();
    groceriesRender();
});

})

document.getElementById("groceries-btn").addEventListener("click", () => {
    const input = document.getElementById("groceries-manual");
    const newItem = input.value.trim().toLowerCase();

    if (!newItem) return;

    if (groceries.has(newItem)) {
        let li = document.querySelector(`#grocery-shopping li[data-item="${newItem}"]`);

        if (!li) {
            groceriesRender();
        li = document.querySelector(`#grocery-shopping li[data-item="${newItem}"]`); 
    if (!li) return;  
        }

        li.classList.add("highlight");
        setTimeout(() => {
            li.classList.remove("highlight");
        }, 1800);
    }
    else { groceries.add(newItem);
        groceriesSave();
        groceriesRender();
        input.value = "";
    }
});

/*FUNCTION CALLS*/

loadRecipes();
recipesShow();
renderMeals(currentView);
groceriesLoad();
groceriesRender();