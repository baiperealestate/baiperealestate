fetch("assets/data/listings.json")
  .then(response => response.json())
  .then(data => {
    const listings = document.getElementById("listings");

    data.forEach(property => {
      listings.innerHTML += `
        <a href="property.html?id=${property.id}" class="listing-card">
          <img src="${property.images[0]}" alt="${property.title}">
          <div class="listing-info">
            <h3>${property.title}</h3>
            <p class="price">${property.price}</p>
            <p class="location">${property.location}</p>
            <span class="view-btn">View Details</span>
          </div>
        </a>
      `;
    });
  })
  .catch(err => console.error("Listings load error:", err));
