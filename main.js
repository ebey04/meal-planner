const groceries = new Set();

const groceriesRender = () => {
    const listEl = document.getElementById("grocery-shopping");
    listEl.innerHTML = "";

    for (const item of groceries) {
        const li = document.createElement("li");
        li.dataset.item = item;

        const displayText = item.charAt(0).toUpperCase() + item.slice(1);
        li.textContent = displayText;
        listEl.appendChild(li);
    }
}

const groceriesSave = () => {
    localStorage.setItem("groceries", JSON.stringify([...groceries]));

}

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
}

document.getElementById("groceries-btn").addEventListener("click", () => {
    const input = document.getElementById("groceries-manual");
    const newItem = input.value.trim().toLowerCase();

    if (!newItem) return;

    if (groceries.has(newItem)) {
        let li = document.querySelector(`#grocery-shopping li[data-item="${newItem}"]`);

        if (!li) {
            render();
        li = document.querySelector(`#grocery-shopping li[data-item="${newItem}"]`); 
    if (!li) return;  
        }

        li.classList.add("highlight");
        setTimeout(() => {
            li.classList.remove("highlight");
        }, 1800);
    }
    else { groceries.add(newItem);
        groceriesSaves();
        groceriesLoad();
        input.value = "";
    }
});

groceriesLoad();
groceriesRender();