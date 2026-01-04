fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById("listingsGrid");

    data.forEach(property => {
      const card = document.createElement("div");
      card.className = "listing-card";

      card.innerHTML = `
        <img src="${property.images[0]}">
        <h3>${property.title}</h3>
        <p>${property.location}</p>
        <strong>${property.price}</strong>

        <a href="property.html?id=${property.id}" class="btn">
          View Details
        </a>
      `;

      grid.appendChild(card);
    });
  })
  .catch(err => console.error("Listings error:", err));
