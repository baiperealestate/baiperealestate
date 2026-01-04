fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("listingsGrid");

    data.forEach(listing => {
      const card = document.createElement("div");
      card.className = "listing-card";

      card.innerHTML = `
        <img src="${listing.image}" alt="${listing.title}">
        <h3>${listing.title}</h3>
        <p>${listing.location}</p>
        <strong>${listing.price}</strong>

        <a href="property.html?id=${listing.id}" class="btn">
          View Details
        </a>
      `;

      grid.appendChild(card);
    });
  });
