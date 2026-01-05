fetch("assets/data/listings.json")
  .then(res => res.json())
  .then(properties => {
    const container = document.getElementById("listings");

    properties.forEach(p => {
      container.innerHTML += `
        <a href="property.html?id=${p.id}" class="listing-card">
          <div class="listing-image">
            <img src="${p.images[0]}" alt="${p.title}">
          </div>
          <div class="listing-info">
            <h3>${p.title}</h3>
            <p class="price">${p.price}</p>
            <p class="location">${p.location}</p>
            <span class="view-btn">View Details</span>
          </div>
        </a>
      `;
    });
  })
  .catch(err => console.error("Listings error:", err));
