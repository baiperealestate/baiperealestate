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


 
const listingsContainer = document.getElementById("listings");

if (listingsContainer) {
  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(data => {
      listingsContainer.innerHTML = "";

      data.forEach(item => {
        const card = document.createElement("article");
        card.className = "listing-card";

        card.innerHTML = `
          <div class="listing-image">
            <img src="${item.images[0]}" alt="${item.title}">
            ${item.featured ? `<span class="badge">Featured</span>` : ``}
          </div>

          <div class="listing-content">
            <h3>${item.title}</h3>
            <p class="price">${item.price}</p>
            <p class="location">${item.location}</p>

            <a href="property.html?id=${item.id}" class="btn">
              View Details
            </a>
          </div>
        `;

        listingsContainer.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Listings error:", err);
      listingsContainer.innerHTML = "<p>Listings coming soon.</p>";
    });
}
