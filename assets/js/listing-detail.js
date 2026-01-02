const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(p => p.id == propertyId);
    if (!property) return;

    document.getElementById("propertyTitle").textContent = property.title;
    document.getElementById("propertyDescription").textContent = property.description;

    const featuresList = document.getElementById("featuresList");
    featuresList.innerHTML = "";
    property.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresList.appendChild(li);
    });

    // Image slider
    let current = 0;
    const mainImage = document.getElementById("mainImage");
    mainImage.src = property.images[0];

    document.getElementById("nextBtn").onclick = () => {
      current = (current + 1) % property.images.length;
      mainImage.src = property.images[current];
    };

    document.getElementById("prevBtn").onclick = () => {
      current = (current - 1 + property.images.length) % property.images.length;
      mainImage.src = property.images[current];
    };
  })
  .catch(err => console.error("Details error:", err));
