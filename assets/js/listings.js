const listingsGrid = document.getElementById("listingsGrid");
const categoryFilter = document.getElementById("categoryFilter");

let properties = [];

// Fetch listings
fetch("data/listings.json")
  .then(response => response.json())
  .then(data => {
    properties = data;
    displayListings(properties);
  })
  .catch(error => {
    listingsGrid.innerHTML = "<p>Unable to load listings.</p>";
    console.error(error);
  });

// Display properties
function displayListings(listings) {
  listingsGrid.innerHTML = "";

  if (listings.length === 0) {
    listingsGrid.innerHTML = "<p>No properties found.</p>";
    return;
  }

  listings.forEach(property => {
    const card = document.createElement("div");
    card.className = "property-card";

    card.innerHTML = `
      <img src="${property.image}" alt="${property.title}">
      <div class="property-content">
        <h3>${property.title}</h3>
        <p>${property.location}</p>
        <p>${property.bedrooms} Beds • ${property.bathrooms} Baths • ${property.size}</p>
        <div class="property-price">${property.price}</div>
        <a href="listing.html?id=${property.id}" class="btn" style="margin-top:15px; display:inline-block;">
          View Details
        </a>
      </div>
    `;

    listingsGrid.appendChild(card);
  });
}

// Filter by category
categoryFilter.addEventListener("change", () => {
  const value = categoryFilter.value;

  if (value === "all") {
    displayListings(properties);
  } else {
    const filtered = properties.filter(p => p.category === value || p.type === value);
    displayListings(filtered);
  }
});

