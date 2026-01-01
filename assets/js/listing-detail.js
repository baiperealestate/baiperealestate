const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(p => p.id === propertyId);
    if (!property) return;

    // TEXT CONTENT
    document.getElementById("propertyTitle").innerText = property.title;
    document.getElementById("propertyDescription").innerText = property.description;

    // FEATURES
    const featuresList = document.getElementById("featuresList");
    featuresList.innerHTML = "";
    property.features.forEach(feature => {
      const li = document.createElement("li");
      li.innerText = feature;
      featuresList.appendChild(li);
    });

    // IMAGE SLIDER
    let currentImage = 0;
    const mainImage = document.getElementById("mainImage");
    mainImage.src = property.images[0];

    document.getElementById("prevBtn").onclick = () => {
      currentImage = (currentImage - 1 + property.images.length) % property.images.length;
      mainImage.src = property.images[currentImage];
    };

    document.getElementById("nextBtn").onclick = () => {
      currentImage = (currentImage + 1) % property.images.length;
      mainImage.src = property.images[currentImage];
    };
  })
  .catch(err => console.error("Detail page error:", err));
