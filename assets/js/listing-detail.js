const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

let images = [];
let currentIndex = 0;

fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(item => item.id === listingId);
    if (!property) return;

    images = property.images;

    document.getElementById("propertyTitle").textContent = property.title;
    document.getElementById("propertyDescription").textContent = property.description;

    const featuresList = document.getElementById("featuresList");
    property.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    document.getElementById("mainImage").src = images[0];
  });

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("mainImage").src = images[currentIndex];
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("mainImage").src = images[currentIndex];
};
