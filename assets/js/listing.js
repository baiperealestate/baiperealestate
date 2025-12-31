fetch("assets/data/listings.json")
  .then(response => response.json())
  .then(data => {
    const listingsContainer = document.getElementById("listings");

    data.forEach(property => {
      const card = document.createElement("a");
      card.href = `listing.html?id=${property.id}`;
      card.className = "listing-card";

      card.innerHTML = `
        <img src="${property.images[0]}" alt="${property.title}">
        <h3>${property.title}</h3>
        <p>${property.price}</p>
        <p>${property.location}</p>
      `;

      listingsContainer.appendChild(card);
    });
  })
  .catch(error => console.error("Listings error:", error));

