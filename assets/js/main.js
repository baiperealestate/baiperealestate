document.addEventListener("DOMContentLoaded", () => {

  /* =============================
     MOBILE HAMBURGER MENU
  ============================== */
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("open");
    });

    // Close menu when clicking a link (mobile UX)
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });
  }

  /* =============================
     LISTINGS PAGE LOADER
     (runs ONLY if listings exist)
  ============================== */
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
              <img src="${item.thumbnail}" alt="${item.title}">
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
        console.error("Listings load error:", err);
        listingsContainer.innerHTML = "<p>Listings coming soon.</p>";
      });
  }

});



