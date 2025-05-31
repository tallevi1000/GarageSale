function displayCatalog(data, container = document.getElementById("catalog")) {
  Object.entries(data).forEach(([categoryName, categoryValue]) => {
    const categorySection = document.createElement("section");
    categorySection.className = "category";

    const title = document.createElement("h2");
    title.className = "category-title";

    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "►";

    const titleText = document.createElement("span");
    titleText.className = "title-text";
    titleText.textContent = ` ${categoryName}`;

    title.appendChild(arrow);
    title.appendChild(titleText);
    categorySection.appendChild(title);

    const contentDiv = document.createElement("div");
    contentDiv.className = "category-content collapsed";

    if (Array.isArray(categoryValue)) {
      const itemGrid = createItemGrid(categoryValue);
      contentDiv.appendChild(itemGrid);
    } else {
      displayCatalog(categoryValue, contentDiv); // Recursive for subcategories
    }

    title.addEventListener("click", () => {
      contentDiv.classList.toggle("collapsed");
      arrow.textContent = contentDiv.classList.contains("collapsed") ? "►" : "▼";
    });

    categorySection.appendChild(contentDiv);
    container.appendChild(categorySection);
  });
}

function createItemGrid(items) {
  const itemGrid = document.createElement("div");
  itemGrid.className = "item-grid";

  items.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    const img = document.createElement("img");
    img.src = `images/${item.image}`;
    img.alt = item.name;
    img.className = "item-image";
    img.addEventListener("click", () => createImageModal(`images/${item.image}`));

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.innerHTML = `<strong>Price:</strong> ₪${item.price}`;

    itemDiv.appendChild(img);
    itemDiv.appendChild(name);
    itemDiv.appendChild(price);
    itemGrid.appendChild(itemDiv);
  });

  return itemGrid;
}
