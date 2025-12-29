const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const listing = data.find(l => l.id === listingId);
    if (!listing) return;

    document.getElementById("listing-details").innerHTML = `
      <h1>${listing.title}</h1>
      <p class="price">${listing.price}</p>

      <div class="gallery">
        ${listing.images.map(img => `<img src="${img}">`).join("")}
      </div>

      ${listing.video ? `
        <iframe src="${listing.video}" frameborder="0" allowfullscreen></iframe>
      ` : ""}

      <p>${listing.description}</p>

      <ul class="features">
        <li>Bedrooms: ${listing.bedrooms}</li>
        <li>Bathrooms: ${listing.bathrooms}</li>
        <li>Size: ${listing.size}</li>
      </ul>

      <a href="https://wa.me/59996654776" class="btn">Contact Agent</a>
    `;
  });
