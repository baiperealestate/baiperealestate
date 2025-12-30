console.log("Listings JS loaded");

fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("listings");

    data.forEach(listing => {
      container.innerHTML += `
  <div class="property-card">
    <div class="property-image">
      <img src="${listing.images[0]}" alt="${listing.title}">
    </div>

    <div class="property-content">
      <h3>${listing.title}</h3>
      <p class="property-location">${listing.location}</p>
      <p class="property-price">${listing.price}</p>

      <a href="listing.html?id=${listing.id}" class="property-btn">
        View Details
      </a>
    </div>
  </div>
`;
  
    });
  });
