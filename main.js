/* =========================
    RECIPE SECTION
    =========================*/ 
    const recipes = new Map([
    ["Savory Stuffed Pumpkin", { 
        ingredients: ["ground turkey", "quinoa blend", "onion", "garlic", "curry powder", "cumin", "clove", "green vegetable", "sweet pumpkin", "gruyere cheese"],
        instructions: "Preheat oven to 350*. Cook quinoa blend to instructions. In a pan saute the garlic and onion till translucent. Add in the green vegetable & ground turkey. When oven is heated, cut pumpkin in half, clean out, drizzle with oil and bake cut side down for about 20 mins.Once turkey is cooked through add in spices & quinoa blend. Stuff par-baked pumpkin and bake again for about 20 minutes. Add the cheese for the last 5 minutes.",
        category: "Dinner"
    }],
    ["Lentil Turkey Chili", {
        ingredients: ["ground turkey", "dry lentils", "diced tomatoes", "black beans", "sweet potato", "onion", "bell peppers", "garlic", "veggie broth", "tomato paste", "chili powder", "smoked paprika", "cumin", "black pepper"],
        instructions: "Brown the turkey. Add vegetables. Add spices. Mix in lentils, beans, diced tomatoes, sweet potato, and broth. Stir and bring to a boil. Simmer for 25 to 30 minutes. Season to taste.",
        category: "Dinner"
    }],
    ["Lentil Sloppy Joe", {
        ingredients: ["dry lentils", "sloppy joe sauce", "onion", "bell pepper", "sweet potatoes", "seasonings"],
        instructions: "Dice and air fry the sweet potato. Cook the lentils. Saute the onion and bell pepper till tender. Add in the cooked lentils and sloppy joe sauce. Stir and simmer for 5 to 10 minutes. Serve over sweet potatoes.",
        category: "Dinner"
    }]
]);

const recipeForm = document.getElementById("recipe-form");

recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    if (recipes.has(title)) {
    alert("That recipe already exists!");
    return;
}

    recipes.set(title, {
        ingredients: ingredients.split(','),
        instructions: instructions
    })

    recipesShow()

    recipeForm.reset();

})



const recipeContainer = document.getElementById("recipes-container");

function recipesShow() {
    recipeContainer.innerHTML = "";
    for (let [key, recipe] of recipes ) {
        const title = document.createElement("h3");
        title.textContent = key;

        const details = document.createElement("div");
        details.classList.add("details");
        
        const ingredients = document.createElement("p");
        ingredients.innerHTML = `<span class="bold">Ingredients:</span> ${recipe.ingredients.join(", ")}`;

        const instructions = document.createElement("p");
        instructions.innerHTML = `<span class="bold">Instructions:</span> ${recipe.instructions}`;

        const category = document.createElement("p");
        category.innerHTML = `<span class="bold">Category:</span> ${recipe.category}`;



        recipeContainer.appendChild(title);
        recipeContainer.appendChild(details);
        details.appendChild(ingredients);
        details.appendChild(instructions);
        details.appendChild(category);
        
    }
}

recipeContainer.addEventListener("click", (event) => {
    if (event.target.matches("h3")) {
    const details = event.target.nextElementSibling;
    details.classList.toggle("open");
    }
});

recipesShow();

/* =========================
    WEEKLY PLAN SECTION
   =========================*/ 

    const mealGrid = document.getElementById('mealGrid');
    const toggleBtn = document.getElementById('myToggle');
    let currentView = 'list';

    const meals = new Array(7).fill(''); // creates 7 empty slots


    function renderMeals(viewType) {
  mealGrid.innerHTML = ''; // clear old content

  meals.forEach((meal, i) => {
    const cell = document.createElement('div');
    cell.classList.add('meal-cell');

    const header = document.createElement('h3');
    header.textContent = viewType === 'dated'
      ? ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]
      : i + 1;

    const body = document.createElement('p');
    body.textContent = meal;

    cell.append(header, body);
    mealGrid.append(cell);
  });
}

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


renderMeals(currentView);

/* =========================
    GROCERIES SECTION
   =========================*/ 
const groceries = new Set();

const groceriesRender = () => {
    const listEl = document.getElementById("grocery-shopping");
    listEl.innerHTML = "";

    for (const item of groceries) {
        const li = document.createElement("li");
        li.dataset.item = item;

        const displayText = item.charAt(0).toUpperCase() + item.slice(1);
        li.textContent = displayText;
        

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
        groceries.delete(item);
        groceriesSave();
        groceriesRender();
    });

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox"; 

    li.prepend(checkBox);
    li.appendChild(deleteBtn);
    listEl.appendChild(li);
    }
};

const groceriesSave = () => {
    localStorage.setItem("groceries", JSON.stringify([...groceries]));

};

const groceriesLoad = () => {
    const raw = localStorage.getItem("groceries");
    if (!raw) return;
    try {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
            groceries.clear();
            arr.forEach(x => groceries.add(x));
        }
    } catch (e) {
        console.warn("Bad data in storage, clearing.", e);
        localStorage.removeItem("groceries");
    }
};

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

const clearCheckedBtn = document.getElementById("clear-checked-btn");
clearCheckedBtn.addEventListener("click", () => {
    checkedBoxes = document.querySelectorAll('#grocery-shopping input[type="checkbox"]:checked');

    checkedBoxes.forEach(checkbox => {
  const itemName = checkbox.parentElement.dataset.item;
  groceries.delete(itemName);

  groceriesSave();
  groceriesRender();
});

})

groceriesLoad();
groceriesRender();