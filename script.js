function displayCatalog(data, container = document.getElementById("catalog")) {
  Object.entries(data).forEach(([categoryName, categoryValue]) => {
    const categorySection = document.createElement("section");
    categorySection.className = "category";

    const title = document.createElement("h2");
    title.className = "category-title";

    const arrow = document.createElement("span");
    arrow.className = "arrow";
    arrow.textContent = "►";

    const totalCount = countItems(categoryValue);

    const titleText = document.createElement("span");
    titleText.className = "title-text";
    titleText.textContent = ` ${categoryName} (${totalCount})`;

    title.appendChild(arrow);
    title.appendChild(titleText);
    categorySection.appendChild(title);

    const contentDiv = document.createElement("div");
    contentDiv.className = "category-content collapsed";

    if (Array.isArray(categoryValue)) {
      const itemGrid = createItemGrid(categoryValue);
      contentDiv.appendChild(itemGrid);
    } else {
      displayCatalog(categoryValue, contentDiv); // Recursively render subcategories
    }

    title.addEventListener("click", () => {
      contentDiv.classList.toggle("collapsed");
      arrow.textContent = contentDiv.classList.contains("collapsed") ? "►" : "▼";
    });

    categorySection.appendChild(contentDiv);
    container.appendChild(categorySection);
  });
}

// 🔁 Recursively count items in a category or subcategory
function countItems(categoryValue) {
  if (Array.isArray(categoryValue)) {
    return categoryValue.length;
  }
  let total = 0;
  for (const sub of Object.values(categoryValue)) {
    total += countItems(sub);
  }
  return total;
}
