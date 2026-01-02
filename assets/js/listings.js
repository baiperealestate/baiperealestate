fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("listings");
    container.innerHTML = "";

    data.forEach(property => {
      const card = document.createElement("a");
      card.href = `listing.html?id=${property.id}`;
      card.className = "listing-card";

      card.innerHTML = `
        <div class="listing-image">
          <img src="${property.images[0]}" alt="${property.title}">
        </div>
        <div class="listing-info">
          <h3>${property.title}</h3>
          <p class="price">${property.price}</p>
          <p class="location">${property.location}</p>
          <span class="view-btn">View Details</span>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error("Listings error:", err));
