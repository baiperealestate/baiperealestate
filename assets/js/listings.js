fetch("./data/listings.json")
  .then(response => response.json())
  .then(listings => {
    const container = document.getElementById("listings");
    container.innerHTML = "";

    listings.forEach(item => {
      container.innerHTML += `
        <div class="listing-card">
          <img src="${item.images[0]}" alt="${item.title}">
          <div class="listing-content">
            <h3>${item.title}</h3>
            <p class="price">${item.price}</p>
            <p>${item.location}</p>
            <p>${item.bedrooms} Beds • ${item.bathrooms} Baths • ${item.size}</p>
          </div>
        </div>
      `;
    });
  })
  .catch(error => {
    console.error("Listings error:", error);
  });
