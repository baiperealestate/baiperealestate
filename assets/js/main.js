document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");

  if (!hamburger || !nav) return;

  hamburger.addEventListener("click", function () {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close menu when clicking a link (mobile UX)
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
});


let currentIndex = 0;
const images = property.images; // array from your data

function showImage(index) {
  document.getElementById("mainImage").src = images[index];
}

document.querySelector(".next").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
};

document.querySelector(".prev").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
};

fetch("assets/data/listings.json")
  .then(res => res.json())
  .then(listings => {
    const grid = document.getElementById("listingsGrid");

    listings.forEach(property => {
      const card = document.createElement("article");
      card.className = "listing-card";

      card.innerHTML = `
        <div class="listing-image">
          <img src="${property.images[0]}" alt="${property.title}">
          <span class="badge">${property.status}</span>
        </div>

        <div class="listing-content">
          <h3>${property.title}</h3>
          <p class="price">${property.price}</p>
          <p class="location">${property.location}</p>

          <ul class="features">
            ${property.features.slice(0, 4).map(f => `<li>${f}</li>`).join("")}
          </ul>

          <div class="cta">
            <a href="tel:+59996654776" class="btn-primary">Call</a>
            <a href="mailto:info@baiperealestate.com" class="btn-secondary">Email</a>
            <a href="property.html?id=${property.id}" class="btn-outline">View Details</a>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  });

document.addEventListener("DOMContentLoaded", () => {
  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(listings => {
      const grid = document.getElementById("listingsGrid");
      if (!grid) return;

      listings.forEach(property => {
        const card = document.createElement("article");
        card.className = "listing-card";

        card.innerHTML = `
          <div class="listing-image">
            <img src="${property.images[0]}" alt="${property.title}">
            <span class="badge">${property.status}</span>
          </div>

          <div class="listing-content">
            <h3>${property.title}</h3>
            <p class="price">${property.price}</p>
            <p class="location">${property.location}</p>

            <div class="cta">
              <a href="property.html?id=${property.id}" class="btn-outline">View Details</a>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });
    });
});

  const listingsContainer = document.getElementById("listings");
  const filter = document.getElementById("categoryFilter");

  if (!listingsContainer) return;

  fetch("assets/data/listings.json")
    .then(response => {
      if (!response.ok) throw new Error("Listings JSON not found");
      return response.json();
    })
    .then(data => {
      renderListings(data);

      if (filter) {
        filter.addEventListener("change", () => {
          const value = filter.value;
          const filtered =
            value === "all"
              ? data
              : data.filter(item =>
                  item.status === value || item.propertyType === value
                );
          renderListings(filtered);
        });
      }
    })
    .catch(error => console.error("Listings error:", error));

  function renderListings(items) {
    listingsContainer.innerHTML = "";

    items.forEach(item => {
      const card = document.createElement("article");
      card.className = "listing-card";

      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="listing-info">
          <h3>${item.title}</h3>
          <p class="location">${item.location}</p>
          <p class="price">${item.price}</p>
          <a href="property.html?id=${item.id}" class="btn">View Details</a>
        </div>
      `;

      listingsContainer.appendChild(card);
    });
  }
});
