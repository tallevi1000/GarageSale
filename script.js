document.addEventListener("DOMContentLoaded", () => {
  fetch("data/items.json")
    .then((response) => response.json())
    .then((data) => displayCatalog(data))
    .catch((error) => console.error("Error loading items:", error));
});

function displayCatalog(data) {
  const container = document.getElementById("catalog");
  container.innerHTML = "";

  Object.entries(data).forEach(([category, items]) => {
    const categorySection = document.createElement("section");
    categorySection.className = "category";

    // Create category title wrapper
    const title = document.createElement("h2");
    title.className = "category-title";

    // Create arrow + text + count
    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "▼";

    const titleText = document.createElement("span");
    titleText.className = "title-text";
    titleText.textContent = ` ${category} (${items.length})`;

    title.appendChild(arrow);
    title.appendChild(titleText);
    categorySection.appendChild(title);

    // Item grid
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

    // Toggle visibility + arrow direction
    title.addEventListener("click", () => {
      itemGrid.classList.toggle("collapsed");
      arrow.textContent = itemGrid.classList.contains("collapsed") ? "►" : "▼";
    });
  });
}
