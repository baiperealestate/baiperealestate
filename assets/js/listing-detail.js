const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("/assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const property = data.find(p => p.id == id);

    document.getElementById("propertyTitle").textContent = property.title;
    document.getElementById("propertyDescription").textContent = property.description;

    const features = document.getElementById("featuresList");
    property.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      features.appendChild(li);
    });

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
  });
