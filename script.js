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

    // Create category title
    const title = document.createElement("h2");
    title.className = "category-title";
    title.textContent = category;

    // Create item grid
    const itemGrid = document.createElement("div");
    itemGrid.className = "item-grid";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p><strong>Price:</strong> ₪${item.price}</p>
      `;
      itemGrid.appendChild(itemDiv);
    });

    // Append title and item grid to category section
    categorySection.appendChild(title);
    categorySection.appendChild(itemGrid);
    container.appendChild(categorySection);

    // Add click event listener to toggle visibility
    title.addEventListener("click", () => {
      itemGrid.classList.toggle("collapsed");
    });
  });
}
