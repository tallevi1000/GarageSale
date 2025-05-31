function displayCatalog(data) {
  const container = document.getElementById("catalog");
  container.innerHTML = "";

  Object.entries(data).forEach(([category, items]) => {
    const categorySection = document.createElement("section");
    categorySection.className = "category";

    // Category Title (clickable)
    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = category;
    title.addEventListener("click", () => {
      itemGrid.classList.toggle("collapsed");
    });
    categorySection.appendChild(title);

    // Item Grid (initially visible)
    const itemGrid = document.createElement("div");
    itemGrid.className = "item-grid";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
        <img src="images/${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p><strong>Price:</strong> ₪${item.price}</p>
      `;
      itemGrid.appendChild(itemDiv);
    });

    categorySection.appendChild(itemGrid);
    container.appendChild(categorySection);
  });
}
