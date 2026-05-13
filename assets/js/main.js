function getCurrentLang() {
  return window.location.pathname.startsWith("/nl/")
    ? "nl"
    : "en";
}

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     MOBILE NAVIGATION
  ===================================================== */

  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav-links");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }

  /* =====================================================
     LISTINGS PAGE
  ===================================================== */

  const listingsContainer = document.getElementById("listings");
  const categoryFilter = document.getElementById("categoryFilter");
  const priceMinInput = document.getElementById("priceMin");
  const priceMaxInput = document.getElementById("priceMax");
  const locationSearch = document.getElementById("locationSearch");
  const keywordSearch = document.getElementById("keywordSearch");
  const searchBtn = document.getElementById("searchBtn");

  if (listingsContainer) {

    let allListings = [];

    const lang = getCurrentLang();

    const dataFile =
      lang === "nl"
        ? "/assets/data/listings-nl.json"
        : "/assets/data/listings.json";

    /* ================= LOAD DATA ================= */

    fetch(dataFile)
      .then(res => res.json())
      .then(data => {
        allListings = data;
        renderListings(allListings);
      })
      .catch(err => {
        console.error("Listings error:", err);
        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Advertenties volgen binnenkort.</p>"
            : "<p>Listings coming soon.</p>";
      });

    /* ================= RENDER ================= */

    function renderListings(listings) {

      listingsContainer.innerHTML = "";

      if (!listings || listings.length === 0) {
        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Er zijn geen resultaten gevonden.</p>"
            : "<p>No listings found.</p>";
        return;
      }

      listings.forEach(item => {

        const card = document.createElement("article");
        card.className = "listing-card";

        const imgSrc =
          item.images?.length
            ? item.images[0]
            : "/assets/images/placeholder.jpg";

        card.innerHTML = `
          <div class="listing-image">
            <img src="${imgSrc}" alt="${item.title}" loading="lazy">
            ${item.featured ? `<span class="badge">Featured</span>` : ""}
          </div>

          <div class="listing-content">
            <h3>${item.title}</h3>

            <p class="price" data-price="${Number(item.price)}">
              ${formatPrice(Number(item.price))}
            </p>

            <p class="location">${item.location}</p>

            <div class="cta">
              <a href="/${lang === "nl" ? "nl/" : ""}property.html?id=${item.id}" class="btn">
                ${lang === "nl" ? "Bekijk details" : "View Details"}
              </a>
            </div>
          </div>
        `;

        listingsContainer.appendChild(card);
      });
    }

    /* ================= FILTER ================= */

    window.filterListings = function () {

      if (!allListings || allListings.length === 0) return;

      const selectedCategory =
        categoryFilter?.value.toLowerCase() || "all";

      let minPrice = Number(priceMinInput?.value);
      let maxPrice = Number(priceMaxInput?.value);

      if (isNaN(minPrice)) minPrice = 0;
      if (isNaN(maxPrice)) maxPrice = 8000000;

      const locationValue =
        locationSearch?.value.toLowerCase().trim() || "";

      const keywordValue =
        keywordSearch?.value.toLowerCase().trim() || "";

      const filtered = allListings.filter(item => {

        const type =
          (item.propertyType || "").toLowerCase().trim();

        const status =
          (item.status || "").toLowerCase().trim();

        const priceXCG = Number(item.price) || 0;

        const rate =
          (window.exchangeRates && window.exchangeRates[window.currentCurrency])
            ? window.exchangeRates[window.currentCurrency]
            : 1;

        const convertedPrice = priceXCG * rate;

        const title = item.title?.toLowerCase() || "";
        const location = item.location?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";
        const reference = item.reference?.toLowerCase() || "";

        let categoryMatch = true;

        if (selectedCategory !== "all") {

          if (selectedCategory === "lots") {
            categoryMatch = type === "lots" || type === "land";
          } else {
            categoryMatch =
              status === selectedCategory ||
              type === selectedCategory;
          }
        }

        const priceMatch =
          convertedPrice >= minPrice &&
          convertedPrice <= maxPrice;

        const locationMatch =
          !locationValue ||
          location.includes(locationValue);

        const keywordMatch =
          !keywordValue ||
          title.includes(keywordValue) ||
          description.includes(keywordValue) ||
          location.includes(keywordValue) ||
          reference.includes(keywordValue);

        return (
          categoryMatch &&
          priceMatch &&
          locationMatch &&
          keywordMatch
        );
      });

      renderListings(filtered);
    };

    /* ================= EVENTS ================= */

    if (categoryFilter) {
      categoryFilter.addEventListener("change", window.filterListings);
    }

    if (searchBtn) {
      searchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.filterListings();
      });
    }

    [
      priceMinInput,
      priceMaxInput,
      locationSearch,
      keywordSearch
    ].forEach(input => {
      if (!input) return;
      input.addEventListener("input", window.filterListings);
    });

    document.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        window.filterListings();
      }
    });
  }

  /* =====================================================
     PROPERTY PAGE (UNCHANGED – SAFE)
  ===================================================== */

  const imageEl = document.getElementById("propertyImage");
  const featuresEl = document.getElementById("features");

  if (imageEl && featuresEl) {
    loadProperty();
  }

  async function loadProperty() {
    const params = new URLSearchParams(window.location.search);
    const propertyId = params.get("id");
    if (!propertyId) return;

    try {
      const lang = getCurrentLang();

      const dataFile =
        lang === "nl"
          ? "/assets/data/listings-nl.json"
          : "/assets/data/listings.json";

      const res = await fetch(dataFile);
      const listings = await res.json();

      const property = listings.find(p => p.id === propertyId);
      if (!property) return;

      document.getElementById("title").textContent = property.title;

      const priceEl = document.getElementById("price");
      priceEl.dataset.price = Number(property.price);
      priceEl.textContent = formatPrice(Number(property.price));
      updatePrices();

      document.getElementById("location").textContent = property.location;
      document.getElementById("bedrooms").textContent = property.bedrooms;
      document.getElementById("bathrooms").textContent = property.bathrooms;
      document.getElementById("size").textContent = property.size;
      document.getElementById("description").textContent = property.description;

      featuresEl.innerHTML = "";
      property.features.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        featuresEl.appendChild(li);
      });

      initGallery(property.images);

    } catch (err) {
      console.error("Property page error:", err);
    }
  }

});
