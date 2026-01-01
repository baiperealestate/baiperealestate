fetch("/assets/data/listings.json")

  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("listings");
    container.innerHTML = "";

    data.forEach(listing => {
      const card = document.createElement("div");
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
  .catch(error => {
    console.error("Listings error:", error);
  });
