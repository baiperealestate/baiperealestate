const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

let currentIndex = 0;
let images = [];

fetch("assets/data/listings.json")
  .then(res => res.json())
  .then(data => {
    const listing = data.find(item => item.id === listingId);

    if (!listing) {
      document.body.innerHTML = "<h2>Property not found</h2>";
      return;
    }

    // BASIC INFO
    document.getElementById("title").textContent = listing.title;
    document.getElementById("price").textContent = listing.price;
    document.getElementById("location").textContent = listing.location;
    document.getElementById("description").textContent = listing.description;

    // FEATURES
    const featuresEl = document.getElementById("features");
    listing.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      featuresEl.appendChild(li);
    });

    // GALLERY
    images = listing.images;
    const mainImage = document.getElementById("mainImage");
    mainImage.src = images[0];

    document.querySelector(".next").onclick = () => {
      currentIndex = (currentIndex + 1) % images.length;
      mainImage.src = images[currentIndex];
    };

    document.querySelector(".prev").onclick = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      mainImage.src = images[currentIndex];
    };
  })
  .catch(err => {
    console.error(err);
    document.body.innerHTML = "<h2>Error loading property</h2>";
  });
