const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(item => item.id === listingId);
    if (!property) return;

    // TEXT CONTENT
    document.getElementById("propertyTitle").textContent = property.title;
    document.getElementById("propertyDescription").textContent = property.description;

    // FEATURES
    const featuresList = document.getElementById("featuresList");
    featuresList.innerHTML = "";
    property.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    // SLIDESHOW
    const mainImage = document.getElementById("mainImage");
    let index = 0;
    mainImage.src = property.images[index];

    document.getElementById("nextBtn").onclick = () => {
      index = (index + 1) % property.images.length;
      mainImage.src = property.images[index];
    };

    document.getElementById("prevBtn").onclick = () => {
      index = (index - 1 + property.images.length) % property.images.length;
      mainImage.src = property.images[index];
    };
  })
  .catch(err => console.error("Details error:", err));
