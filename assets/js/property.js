document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  console.log("Property ID:", id);

  if (!id) {
    document.body.innerHTML = "<h1>Property not found</h1>";
    return;
  }

  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(data => {
      const property = data.find(p => p.id === id);

      console.log("Matched property:", property);

      if (!property) {
        document.body.innerHTML = "<h1>Property not found</h1>";
        return;
      }

      let index = 0;
      const img = document.getElementById("mainImage");

      img.src = property.images[index];

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
    })
    .catch(err => {
      console.error("Property load error:", err);
      document.body.innerHTML = "<h1>Error loading property</h1>";
    });
});
