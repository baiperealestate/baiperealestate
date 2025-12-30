const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let currentIndex = 0;
let images = [];

fetch("./data/listings.json")
  .then(res => res.json())
  .then(data => {
    const listing = data.find(item => item.id === id);

    if (!listing) return;

    images = listing.images;

    document.getElementById("title").textContent = listing.title;
    document.getElementById("price").textContent = listing.price;
    document.getElementById("location").textContent = listing.location;
    document.getElementById("description").textContent = listing.description;

    const features = document.getElementById("features");
    listing.features.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      features.appendChild(li);
    });

    updateImage();
  });

function updateImage() {
  document.getElementById("mainImage").src = images[currentIndex];
}

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImage();
};

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImage();
};
