fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const featured = data.slice(0, 3); // first 3 listings
    const container = document.getElementById("featuredListings");

    featured.forEach(property => {
      container.innerHTML += `
        <div class="property-card">
          <img src="${property.images[0]}" alt="${property.title}">
          <div class="property-content">
            <h3>${property.title}</h3>
            <p>${property.location}</p>
            <div class="property-price">${property.price}</div>
            <a href="listing.html?id=${property.id}" class="btn" style="margin-top:10px; display:inline-block;">
              View Details
            </a>
          </div>
        </div>
      `;
    });
  });

