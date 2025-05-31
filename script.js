document.addEventListener("DOMContentLoaded", () => {
  fetch("data/items.json")
    .then((response) => response.json())
    .then((data) => displayCatalog(data))
    .catch((error) => console.error("Error loading items:", error));
});

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


function createImageModal(imageSrc) {
  const overlay = document.createElement("div");
  overlay.className = "image-overlay";

  const img = document.createElement("img");
  img.src = imageSrc;
  img.className = "overlay-image";

  const closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.textContent = "✕";

  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
    document.body.classList.remove("no-scroll");
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
      document.body.classList.remove("no-scroll");
    }
  });

  overlay.appendChild(closeBtn);
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");
}
