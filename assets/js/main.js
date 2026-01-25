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

  const imageSrc = item.images && item.images.length
    ? item.images[0]
    : "assets/images/placeholder.jpg";

  card.innerHTML = `
    <div class="listing-image">
      <img src="${imageSrc}" alt="${item.title}" loading="lazy">
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

document.addEventListener("DOMContentLoaded", async () => {
  const imageEl = document.getElementById("propertyImage");
  const featuresEl = document.getElementById("features");

  if (!imageEl || !featuresEl) return; // not on property page

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("id");

  if (!propertyId) return;

  try {
    const res = await fetch("assets/data/listings.json");
    const listings = await res.json();
    const property = listings.find(p => p.id === propertyId);

    if (!property) return;

    /* BASIC INFO */
    document.getElementById("title").textContent = property.title;
    document.getElementById("price").textContent = property.price;
    document.getElementById("location").textContent = property.location;
    document.getElementById("bedrooms").textContent = property.bedrooms;
    document.getElementById("bathrooms").textContent = property.bathrooms;
    document.getElementById("size").textContent = property.size;
    document.getElementById("description").textContent = property.description;

    /* FEATURES */
    featuresEl.innerHTML = "";
    property.features.forEach(feature => {
      const li = document.createElement("li");
      li.textContent = feature;
      featuresEl.appendChild(li);
    });

    /* IMAGE SLIDER */
    let currentIndex = 0;
    imageEl.src = property.images[0];

    document.querySelector(".slider-btn.next")
      .addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % property.images.length;
        imageEl.src = property.images[currentIndex];
      });

    document.querySelector(".slider-btn.prev")
      .addEventListener("click", () => {
        currentIndex =
          (currentIndex - 1 + property.images.length) %
          property.images.length;
        imageEl.src = property.images[currentIndex];
      });

      /* ===================== CURRENCY CONVERSION ===================== */
    // Only run if price element exists and FX & formatAmount are defined
    if (property.price &&
        document.getElementById("price-xcg") &&
        document.getElementById("price-usd") &&
        document.getElementById("price-eur") &&
        typeof FX !== "undefined" &&
        typeof formatAmount === "function") {

      const rawXCG = parseInt(property.price.replace(/[^\d]/g, ""), 10);

      document.getElementById("price-xcg").textContent =
        formatAmount(rawXCG, "XCG");

      document.getElementById("price-usd").textContent =
        "≈ " + formatAmount(FX.toUSD(rawXCG), "USD");

      document.getElementById("price-eur").textContent =
        "≈ " + formatAmount(FX.toEUR(rawXCG), "EUR");
    }

  } catch (err) {
    console.error("Property page error:", err);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("openNewsletter");
  const form = document.getElementById("newsletterForm");

  if (!btn || !form) return;

  btn.addEventListener("click", () => {
    form.classList.toggle("active");
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const listingsContainer = document.getElementById("listings");
  const categoryFilter = document.getElementById("categoryFilter");
  let allListings = [];

  if (!listingsContainer) return;

  // Load listings
  fetch("assets/data/listings.json")
    .then(res => res.json())
    .then(data => {
      allListings = data;
      renderListings(allListings);
    })
    .catch(err => {
      console.error("Error loading listings:", err);
      listingsContainer.innerHTML = "<p>Listings will be available soon.</p>";
    });

  // Render function (keeps premium card design)
  function renderListings(listings) {
    listingsContainer.innerHTML = "";

    if (!listings || listings.length === 0) {
      listingsContainer.innerHTML = "<p>No listings match your selection.</p>";
      return;
    }

    listings.forEach(item => {
      const card = document.createElement("article");
      card.className = "listing-card hide";

      const imgSrc = item.images && item.images.length ? item.images[0] : "assets/images/placeholder.jpg";

      card.innerHTML = `
        <div class="listing-image">
          <img src="${imgSrc}" alt="${item.title}" loading="lazy">
          ${item.featured ? `<span class="badge">Featured</span>` : ""}
        </div>
        <div class="listing-content">
          <h3>${item.title}</h3>
          <p class="price">${item.price}</p>
          <p class="location">${item.location}</p>
          <div class="cta">
            <a href="property.html?id=${item.id}" class="btn-details"> View Details</a>
          </div>
        </div>
      `;
      listingsContainer.appendChild(card);

      // Smooth fade-in for premium feel
      setTimeout(() => card.classList.remove("hide"), 20);
    });
  }

  // Category filter event
  if (categoryFilter) {
    categoryFilter.addEventListener("change", e => {
      const selected = e.target.value.toLowerCase();

      const filtered = selected === "all"
        ? allListings
        : allListings.filter(item => 
            (item.status && item.status.toLowerCase() === selected) ||
            (item.propertyType && item.propertyType.toLowerCase() === selected)
          );

      renderListings(filtered);
    });
  }
});

