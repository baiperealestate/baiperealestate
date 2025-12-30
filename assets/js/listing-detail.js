const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const listing = data.find(item => item.id === listingId);
    if (!listing) return;

    const container = document.getElementById("listing-details");

    // Image slider
    const imagesHtml = listing.images.map(img =>
      `<img src="${img}" class="slide">`
    ).join("");

    // Features
    const featuresHtml = listing.features.map(f =>
      `<li>${f}</li>`
    ).join("");

    container.innerHTML = `
      <div class="slider">
        ${imagesHtml}
      </div>

      <h1>${listing.title}</h1>
      <p class="price">${listing.price}</p>
      <p class="location">${listing.location}</p>

      <p class="description">${listing.description}</p>

      <h3>Property Features</h3>
      <ul class="features">
        ${featuresHtml}
      </ul>
    `;

    activateSlider();
  });

function activateSlider() {
  let index = 0;
  const slides = document.querySelectorAll(".slide");

  slides.forEach((s, i) => {
    s.style.display = i === 0 ? "block" : "none";
  });

  setInterval(() => {
    slides[index].style.display = "none";
    index = (index + 1) % slides.length;
    slides[index].style.display = "block";
  }, 4000);
}
