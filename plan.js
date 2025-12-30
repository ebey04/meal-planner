
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
    }
}


export {renderMeals}; 