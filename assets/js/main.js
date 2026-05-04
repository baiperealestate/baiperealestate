/* =====================================================
   BAI PE REAL ESTATE – MAIN JS
   Clean Professional Structure
===================================================== */

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

  if (listingsContainer) {
    let allListings = [];

    fetch("assets/data/listings.json")
      .then(res => res.json())
      .then(data => {
        allListings = data;
        renderListings(allListings);
      })
      .catch(err => {
        console.error("Listings error:", err);
        listingsContainer.innerHTML = "<p>Listings coming soon.</p>";
      });

    function renderListings(listings) {
      listingsContainer.innerHTML = "";

      if (!listings || listings.length === 0) {
        listingsContainer.innerHTML = "<p>No listings match your selection.</p>";
        return;
      }

      listings.forEach(item => {
        const card = document.createElement("article");
        card.className = "listing-card hide";

        const imgSrc = item.images && item.images.length
          ? item.images[0]
          : "assets/images/placeholder.jpg";

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
              <a href="property.html?id=${item.id}" class="btn-details">View Details</a>
            </div>
          </div>
        `;

        listingsContainer.appendChild(card);
        setTimeout(() => card.classList.remove("hide"), 20);
      });
    }

    if (categoryFilter) {
      categoryFilter.addEventListener("change", e => {
        const selected = e.target.value.toLowerCase();

        const filtered = selected === "all"
          ? allListings
          : allListings.filter(item => {
              const type = item.propertyType?.toLowerCase();
              const status = item.status?.toLowerCase();

              if (selected === "lots") {
                return type === "lots" || type === "land";
              }

              return status === selected || type === selected;
            });

        renderListings(filtered);
      });
    }
  }

  /* =====================================================
     PROPERTY PAGE
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
      const res = await fetch("assets/data/listings.json");
      const listings = await res.json();
      const property = listings.find(p => p.id === propertyId);

      if (!property) return;

      document.getElementById("title").textContent = property.title;
      document.getElementById("price").textContent = property.price;
      document.getElementById("location").textContent = property.location;
      document.getElementById("bedrooms").textContent = property.bedrooms;
      document.getElementById("bathrooms").textContent = property.bathrooms;
      document.getElementById("size").textContent = property.size;
      document.getElementById("description").textContent = property.description;

      const propertyField = document.getElementById("propertyField");
      const propertyUrl = document.getElementById("propertyUrl");

      if (propertyField) {
        propertyField.value = `${property.title} | ${property.price} | ${property.location}`;
      }

      if (propertyUrl) {
        propertyUrl.value = window.location.href;
      }

      featuresEl.innerHTML = "";

      property.features.forEach(feature => {
        const li = document.createElement("li");
        li.textContent = feature;
        featuresEl.appendChild(li);
      });

      initGallery(property.images);

    } catch (err) {
      console.error("Property page error:", err);
    }
  }

  /* =====================================================
     PROPERTY GALLERY
  ===================================================== */

  function initGallery(images) {
    if (!images || images.length === 0) return;

    const imageEl = document.getElementById("propertyImage");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImage");

    let currentIndex = 0;
    let scale = 1;

    function showImage(index) {
      currentIndex = index;
      const src = images[currentIndex] || "assets/images/placeholder.jpg";
      imageEl.src = src;
      if (lightboxImg) lightboxImg.src = src;
    }

    showImage(0);

    if (imageEl && lightbox) {
      imageEl.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = images[currentIndex];
        scale = 1;
        lightboxImg.style.transform = "scale(1)";
      });
    }
  }

  /* =====================================================
     CONTACT FORM TRACKING
  ===================================================== */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      const propertyField = document.getElementById("propertyField");
      const propertyUrl = document.getElementById("propertyUrl");

      const title = document.getElementById("title")?.innerText || "";
      const price = document.getElementById("price")?.innerText || "";
      const location = document.getElementById("location")?.innerText || "";

      if (propertyField && !propertyField.value) {
        propertyField.value = `${title} | ${price} | ${location}`;
      }

      if (propertyUrl && !propertyUrl.value) {
        propertyUrl.value = window.location.href;
      }
    });
  }

});

/* =====================================================
   JOURNEY MODAL
===================================================== */

function openJourney(type) {
  let content = "";

  if (type === "buy") {
    content = `
      <h2>Buying Property in Curaçao</h2>
      <p>We guide buyers through the full process professionally.</p>
      <button onclick="closeJourney()">Close</button>
    `;
  }

  if (type === "sell") {
    content = `
      <h2>Selling Your Property</h2>
      <p>We use a structured marketing strategy.</p>
      <button onclick="closeJourney()">Close</button>
    `;
  }

  if (type === "rent") {
    content = `
      <h2>Rental Services</h2>
      <p>We assist with rentals professionally.</p>
      <button onclick="closeJourney()">Close</button>
    `;
  }

  document.getElementById("journeyContent").innerHTML = content;
  document.getElementById("journeyDetails").style.display = "block";
}

function closeJourney() {
  document.getElementById("journeyDetails").style.display = "none";
}

/* =====================================================
   LANGUAGE SWITCHER - SMART PER PAGE
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const langSwitcher = document.getElementById("languageSwitcher");

  if (!langSwitcher) return;

  langSwitcher.addEventListener("change", function () {

    const lang = this.value;

    // Current page path
    let currentPath = window.location.pathname;

    // Remove starting slash
    currentPath = currentPath.replace(/^\/+/, "");

    // Remove nl/ if already inside Dutch folder
    currentPath = currentPath.replace(/^nl\//, "");

    // If homepage empty
    if (currentPath === "") {
      currentPath = "index.html";
    }

    // Translate page
    if (lang === "nl") {
      window.location.href = "/nl/" + currentPath;
    } else {
      window.location.href = "/" + currentPath;
    }

  });

});
