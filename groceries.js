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

export {groceriesLoad, groceriesRender, groceriesSave}