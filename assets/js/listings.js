/* =====================================================
   LISTINGS LOADER (EN / NL)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const isNL = window.location.pathname.startsWith("/nl/");
  const currentLang = isNL ? "nl" : "en";

  const dataPath = currentLang === "nl"
    ? "/assets/data/nl/listings.json"
    : "/assets/data/listings.json";

  const container = document.getElementById("listings");

  async function loadListings() {
    try {
      const response = await fetch(dataPath);
      const listings = await response.json();

      displayListings(listings);

    } catch (error) {
      console.error("Error loading listings:", error);
      container.innerHTML = "<p>Failed to load listings.</p>";
    }
  }

  function displayListings(listings) {
    if (!container) return;

    container.innerHTML = listings.map(listing => {

      return `
        <div class="listing-card">

          <img src="${listing.images[0]}" alt="${listing.title}">

          <h3>${listing.title}</h3>

          <p>${listing.price}</p>

          <p>${listing.status}</p>

          <p>${listing.location}</p>

          <a href="${currentLang === "nl" ? "/nl/" : "/"}property.html?id=${listing.id}" class="btn">
            ${currentLang === "nl" ? "Bekijk woning" : "View Property"}
          </a>

        </div>
      `;

    }).join("");
  }

  loadListings();

});

