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

    itemDiv.addEventListener("click", () =>
      createImageModal(item.images || [item.image], item.name, item.price, item.description)
    );

    const img = document.createElement("img");
    img.src = `images/${(item.images && item.images[0]) || item.image}`;
    img.alt = item.name;
    img.className = "item-image";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.innerHTML = `<strong>Price:</strong> ₪${item.price}`;

    const firstImage = item.images[0]; // e.g., "5.jpg"
    const itemNumber = firstImage.split('/').pop().split('.')[0]; // extracts "5"

    const itemNumberEl = document.createElement('p');
    itemNumberEl.textContent = `מוצר #${itemNumber}`;
    itemDiv.appendChild(itemNumberEl);


    itemDiv.appendChild(img);
    itemDiv.appendChild(name);
    itemDiv.appendChild(price);
    itemGrid.appendChild(itemDiv);
  });

  return itemGrid;
}

function createImageModal(imageList, name, price, description) {
  let currentIndex = 0;

  const overlay = document.createElement("div");
  overlay.className = "image-overlay";

  const contentBox = document.createElement("div");
  contentBox.className = "overlay-content-box";

  const img = document.createElement("img");
  img.className = "overlay-image";
  img.src = `images/${imageList[currentIndex]}`;
  img.alt = name;

  const prevBtn = document.createElement("button");
  prevBtn.className = "nav-btn prev-btn";
  prevBtn.textContent = "❮";
  prevBtn.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateModal();
    }
  });

  const nextBtn = document.createElement("button");
  nextBtn.className = "nav-btn next-btn";
  nextBtn.textContent = "❯";
  nextBtn.addEventListener("click", () => {
    if (currentIndex < imageList.length - 1) {
      currentIndex++;
      updateModal();
    }
  });

  function updateModal() {
    img.src = `images/${imageList[currentIndex]}`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === imageList.length - 1;

    prevBtn.style.opacity = prevBtn.disabled ? 0.3 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? 0.3 : 1;
  }

  const nameElem = document.createElement("h2");
  nameElem.textContent = name;

  const priceElem = document.createElement("p");
  priceElem.innerHTML = `<strong>מחיר:</strong> ₪${price}`;

  const descElem = document.createElement("p");
  descElem.innerHTML = `<strong>תיאור:</strong> ${description || "—"}`;

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

  // Append elements
  contentBox.appendChild(prevBtn);
  contentBox.appendChild(img);
  contentBox.appendChild(nextBtn);
  contentBox.appendChild(nameElem);
  contentBox.appendChild(priceElem);
  contentBox.appendChild(descElem);

  overlay.appendChild(closeBtn);
  overlay.appendChild(contentBox);
  document.body.appendChild(overlay);
  document.body.classList.add("no-scroll");

  updateModal(); // Initialize navigation state
}
