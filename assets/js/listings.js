fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("listings");

    data.forEach(p => {
      const card = document.createElement("a");
      card.href = `listing.html?id=${p.id}`;
      card.className = "listing-card";

      card.innerHTML = `
        <div class="listing-image">
          <img src="${p.images[0]}" alt="${p.title}">
        </div>
        <div class="listing-info">
          <h3>${p.title}</h3>
          <p class="price">${p.price}</p>
          <p class="location">${p.location}</p>
          <span class="view-btn">View Details</span>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => console.error("Listings error:", err));
