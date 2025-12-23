document.addEventListener('DOMContentLoaded', () => {
  fetch('data/listings.json')
    .then(response => response.json())
    .then(listings => {
      const container = document.getElementById('listings-container');

      listings.forEach(item => {
        const card = document.createElement('div');
        card.className = 'property-card';

        card.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="property-info">
            <span class="badge">${item.category}</span>
            <h3>${item.title}</h3>
            <p class="price">${item.price}</p>
            <p class="location">${item.location}</p>
            <p class="details">
              ${item.bedrooms} Beds • ${item.bathrooms} Baths • ${item.size}
            </p>
            <a href="${item.url}" class="btn-small">View Details</a>
          </div>
        `;

        container.appendChild(card);
      });
    })
    .catch(error => console.error('Error loading listings:', error));
});
