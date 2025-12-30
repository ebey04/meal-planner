
const meals = new Array(7).fill(''); 


function renderMeals(mealGrid, currentView) {
    mealGrid.innerHTML = ''; 

    meals.forEach((meal, i) => {
        const cell = document.createElement('div');
        cell.classList.add('meal-cell');
        cell.dataset.index = i;

        const header = document.createElement('h3');
        header.textContent = currentView === 'dated'
            ? ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i]
            : i + 1;

        const body = document.createElement('p');
        body.textContent = meal;

        cell.append(header, body);
        mealGrid.append(cell);
        }
    )
}

function saveMeals() {
    localStorage.setItem("myMeals", JSON.stringify(meals));
}

function loadMeals() {
    const storedMeals = localStorage.getItem("myMeals");
    if (storedMeals) {
        meals = JSON.parse(storedMeals);
    }
}

function setMeals(index, value) {
    meals[index] = value;
    saveMeals();
}


export {meals, renderMeals, saveMeals, loadMeals, setMeals}