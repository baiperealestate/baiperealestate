const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

let currentIndex = 0;
let images = [];

fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(p => p.id === propertyId);
    if (!property) return;

    // TEXT CONTENT
    document.getElementById("propertyTitle").textContent = property.title;
    document.getElementById("propertyPrice").textContent = property.price;
    document.getElementById("propertyLocation").textContent = property.location;
    document.getElementById("propertyDescription").textContent = property.description;

    document.getElementById("beds").textContent = property.bedrooms;
    document.getElementById("baths").textContent = property.bathrooms;
    document.getElementById("size").textContent = property.size;

    document.getElementById("featuresList").innerHTML =
      property.features.map(f => `<li>${f}</li>`).join("");

    // IMAGES
    images = property.images;
    document.getElementById("galleryImage").src = images[0];
  });

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  document.getElementById("galleryImage").src = images[currentIndex];
};

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  document.getElementById("galleryImage").src = images[currentIndex];
};
