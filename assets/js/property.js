fetch("assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const featured = data.filter(p => p.featured);

    featured.forEach(property => {
      featuredContainer.innerHTML += `
        <div class="property-card">
          <img src="${property.images[0]}" alt="${property.title}">
          <h3>${property.title}</h3>
          <p>${property.location}</p>

          <a href="property.html?id=${property.id}" class="btn">
            View Details
          </a>
        </div>
      `;
    });
  });
