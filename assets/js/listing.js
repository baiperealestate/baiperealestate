const params = new URLSearchParams(window.location.search);
const propertyId = parseInt(params.get("id"));

const property = properties.find(p => p.id === propertyId);

if (!property) {
  document.querySelector(".container").innerHTML =
    "<h2>Property not found</h2>";
} else {
  document.getElementById("propertyTitle").textContent = property.title;
  document.getElementById("propertyPrice").textContent = property.price;
  document.getElementById("propertyLocation").textContent = property.location;
  document.getElementById("propertyCategory").textContent = property.category;
  document.getElementById("propertyType").textContent = property.type;
  document.getElementById("propertyImage").src = property.image;
  document.getElementById("propertyDescription").textContent = property.description;
}
