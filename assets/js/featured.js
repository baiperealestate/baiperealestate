
fetch("assets/data/listing.json")
  .then(response => response.json())
  .then(listings => {

    const container = document.getElementById("listings");

    listings
      .filter(listing => listing.featured === true)
      .forEach(listing => {

        const card = document.createElement("a");
        card.href = "property.html";
        card.className = "listing-card";

        // Store data for details page
        card.dataset.id = listing.id;
        card.dataset.title = listing.title;
        card.dataset.price = listing.price;
        card.dataset.location = listing.location;
        card.dataset.image = listing.image;

        card.innerHTML = `
          <img src="${listing.image}" alt="${listing.title}">
          <div class="listing-info">
            <h3>${listing.title}</h3>
            <div class="price">${listing.price}</div>
            <div class="location">${listing.location}</div>
            <span class="view-btn">View Details</span>
          </div>
        `;

        card.addEventListener("click", () => {
          localStorage.setItem("selectedProperty", JSON.stringify(listing));
        });

        container.appendChild(card);
      });
  })
  .catch(error => console.error("Error loading listings:", error));
