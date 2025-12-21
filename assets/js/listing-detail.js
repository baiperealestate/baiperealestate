const container = document.getElementById("propertyDetail");

// Get ID from URL
const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(item => item.id === propertyId);

    if (!property) {
      container.innerHTML = "<p>Property not found.</p>";
      return;
    }

    renderProperty(property);
  })
  .catch(err => {
    container.innerHTML = "<p>Error loading property.</p>";
    console.error(err);
  });

function renderProperty(property) {
  const imagesHtml = property.images
    .map(img => `<img src="${img}" alt="${property.title}">`)
    .join("");

  container.innerHTML = `
    <div class="property-detail">

      <h1>${property.title}</h1>
      <p>${property.location}</p>
      <h2 class="property-price">${property.price}</h2>

      <div class="property-gallery" style="margin:25px 0;">
        ${imagesHtml}
      </div>

      <div class="property-features">
        <div class="feature-box">${property.bedrooms} Bedrooms</div>
        <div class="feature-box">${property.bathrooms} Bathrooms</div>
        <div class="feature-box">${property.size}</div>
        <div class="feature-box">${property.category}</div>
      </div>

      <p style="margin-top:20px;">${property.description}</p>

      <a href="contact.html" class="btn" style="margin-top:25px;">
        Contact Agent
      </a>

    </div>
  `;
}
