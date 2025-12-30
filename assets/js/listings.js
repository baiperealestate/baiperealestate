console.log("Listings JS loaded");

fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("listings");

    data.forEach(listing => {
      container.innerHTML += `
        <div class="listing-card">
          <img src="${listing.images[0]}" alt="${listing.title}">
          <div class="listing-info">
            <h3>${listing.title}</h3>
            <p class="price">${listing.price}</p>
            <p>${listing.location}</p>
            <a href="listing.html?id=${listing.id}" class="btn">
              View Details
            </a>
          </div>
        </div>
      `;
    });
  });
