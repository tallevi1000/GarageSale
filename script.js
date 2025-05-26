fetch('data/items.json')
  .then(res => res.json())
  .then(data => {
    const catalog = document.getElementById('catalog');

    for (const category in data) {
      const catDiv = document.createElement('div');
      catDiv.className = 'category';

      const title = document.createElement('h2');
      title.textContent = category;
      catDiv.appendChild(title);

      const itemsDiv = document.createElement('div');
      itemsDiv.className = 'items';

      data[category].forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        itemDiv.innerHTML = `
          <img src="images/${item.image}" alt="${item.name}" />
          <h3>${item.name}</h3>
          <p><strong>Price:</strong> ₪${item.price}</p>
        `;
        itemsDiv.appendChild(itemDiv);
      });

      catDiv.appendChild(itemsDiv);
      catalog.appendChild(catDiv);
    }
  });
