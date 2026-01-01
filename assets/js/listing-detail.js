const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(item => item.id === listingId);
    if (!property) return;

    // SLIDESHOW
    let currentIndex = 0;
    const imageEl = document.getElementById("mainImage");

    imageEl.src = property.images[currentIndex];

    document.getElementById("prevBtn").onclick = () => {
      currentIndex =
        currentIndex === 0 ? property.images.length - 1 : currentIndex - 1;
      imageEl.src = property.images[currentIndex];
    };

    document.getElementById("nextBtn").onclick = () => {
      currentIndex =
        currentIndex === property.images.length - 1 ? 0 : currentIndex + 1;
      imageEl.src = property.images[currentIndex];
    };

    // DESCRIPTION
    document.getElementById("propertyTitle").textContent = property.title;
    document.getElementById("propertyDescription").textContent =
      property.description;

    // FEATURES
    const featuresList = document.getElementById("featuresList");
    property.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });
  });
