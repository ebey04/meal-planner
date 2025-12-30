let recipes = new Map([
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

function saveRecipes() {
  // Convert Map → Array before saving
    localStorage.setItem("myRecipes", JSON.stringify([...recipes]));
}

function loadRecipes() {
    const storedRecipes = localStorage.getItem("myRecipes");
    if (storedRecipes) {
        // Parse the stored array and rebuild Map
        recipes = new Map(JSON.parse(storedRecipes));
    }
}

export {recipesShow, saveRecipes, loadRecipes}