console.log("URL:", window.location.href);
console.log("ID from URL:", id);


document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.body.innerHTML = "<h1>Property not found</h1>";
    return;
  }

  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(data => {
      const property = data.find(p => p.id === id);

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
      console.error(err);
      document.body.innerHTML = "<h1>Error loading property</h1>";
    });
});

<a href="property.html?id=${property.id}" class="btn">
  View Details
</a>
