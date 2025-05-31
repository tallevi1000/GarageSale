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

    // Category title
    const title = document.createElement("h2");
    title.className = "category-title";

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

    categorySection.appendChild(itemGrid);
    container.appendChild(categorySection);

    // Collapse/expand toggle
    title.addEventListener("click", () => {
      itemGrid.classList.toggle("collapsed");
      arrow.textContent = itemGrid.classList.contains("collapsed") ? "►" : "▼";
    });
  });
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
