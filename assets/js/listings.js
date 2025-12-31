fetch("/assets/data/listings.json")

  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("listings");
    container.innerHTML = "";

    data.forEach(listing => {
      const card = document.createElement("div");
      card.className = "listing-card";

      card.innerHTML = `
        <img src="${listing.images[0]}" alt="${listing.title}">
        <div class="listing-info">
          <h3>${listing.title}</h3>
          <p class="price">${listing.price}</p>
          <p class="location">${listing.location}</p>
          <a href="listing.html?id=${listing.id}" class="btn">View Details</a>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Listings error:", error);
  });
