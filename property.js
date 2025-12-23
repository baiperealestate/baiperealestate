const params = new URLSearchParams(window.location.search);
const propertyId = params.get("id");

fetch("data/listings.json")
  .then(res => res.json())
  .then(listings => {
    const property = listings.find(item => item.id == propertyId);

    if (!property) return;

    document.getElementById("property-image").src = property.image;
    document.getElementById("property-title").textContent = property.title;
    document.getElementById("property-price").textContent = property.price;
    document.getElementById("property-location").textContent = property.location;
    document.getElementById("property-description").textContent = property.description;

    document.getElementById("whatsapp-link").href =
      "https://wa.me/59996654776?text=I'm%20interested%20in%20" +
      encodeURIComponent(property.title);
  });
