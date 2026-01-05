const id = new URLSearchParams(window.location.search).get("id");

fetch("assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(p => p.id === id);
    if (!property) return;

    let index = 0;
    const img = document.getElementById("mainImage");

    img.src = property.images[0];

    document.getElementById("prevBtn").onclick = () => {
      index = (index - 1 + property.images.length) % property.images.length;
      img.src = property.images[index];
    };

    document.getElementById("nextBtn").onclick = () => {
      index = (index + 1) % property.images.length;
      img.src = property.images[index];
    };

    document.getElementById("propertyTitle").textContent = property.title;
    document.getElementById("propertyDescription").textContent = property.description;
    document.getElementById("featuresList").innerHTML =
      property.features.map(f => `<li>${f}</li>`).join("");
  });
