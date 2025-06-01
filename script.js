document.addEventListener("DOMContentLoaded", () => {
  fetch("data/items.json")
    .then((response) => response.json())
    .then((data) => displayCatalog(data))
    .catch((error) => console.error("Error loading items:", error));
});

function displayCatalog(data, container = document.getElementById("catalog")) {
  const sortedEntries = Object.entries(data).sort((a, b) =>
    a[0].localeCompare(b[0], undefined, { sensitivity: "base" })
  );

  sortedEntries.forEach(([categoryName, categoryValue]) => {
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
      displayCatalog(categoryValue, contentDiv);
    }

    title.addEventListener("click", () => {
      contentDiv.classList.toggle("collapsed");
      arrow.textContent = contentDiv.classList.contains("collapsed") ? "►" : "▼";
    });

    categorySection.appendChild(contentDiv);
    container.appendChild(categorySection);
  });
}

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

    // Make the entire item clickable
    itemDiv.addEventListener("click", () =>
      createImageModal(`images/${item.image}`, item.name, item.price, item.description)
    );

    const img = document.createElement("img");
    img.src = `images/${item.image}`;
    img.alt = item.name;
    img.className = "item-image";

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

function createImageModal(imageSrc, name, price, description) {
  const overlay = document.createElement("div");
  overlay.className = "image-overlay";

  const contentWrapper = document.createElement("div");
  contentWrapper.style.textAlign = "center";
  contentWrapper.style.maxWidth = "90%";
  contentWrapper.style.maxHeight = "90%";
  contentWrapper.style.color = "white";

  const img = document.createElement("img");
  img.src = imageSrc;
  img.className = "overlay-image";

  const nameElem = document.createElement("h2");
  nameElem.textContent = name;

  const priceElem = document.createElement("p");
  priceElem.innerHTML = `<strong>Price:</strong> ₪${price}`;

  const descElem = document.createElement("p");
  descElem.innerHTML = `<strong>Description:</strong> ${description || "—"}`;

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

  contentWrapper.appendChild(img);
  contentWrapper.appendChild(nameElem);
  contentWrapper.appendChild(priceElem);
  contentWrapper.appendChild(descElem);

  overlay.appendChild(closeBtn);
  overlay.appendChild(contentWrapper);
  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");
}
