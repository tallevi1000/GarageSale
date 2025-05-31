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

    const title = document.createElement("h2");
    title.textContent = category;
    categorySection.appendChild(title);

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

    categorySection.appendChild(itemGrid);
    container.appendChild(categorySection);
  });
}
