function getCurrentLang() {
  return window.location.pathname.startsWith("/nl/") ? "nl" : "en";
}

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
    const lang = getCurrentLang();
    const dataFile = lang === "nl"
      ? "/assets/data/listings-nl.json"
      : "/assets/data/listings.json";

    fetch(dataFile)
      .then(res => res.json())
      .then(data => {
        allListings = data;
        renderListings(allListings);
      })
      .catch(err => {
        console.error("Listings error:", err);
        const lang = getCurrentLang();
        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Advertenties volgen binnenkort.</p>"
            : "<p>Listings coming soon.</p>";
      });

    function renderListings(listings) {
      listingsContainer.innerHTML = "";

      if (!listings || listings.length === 0) {
        const lang = getCurrentLang();
        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Er zijn geen resultaten gevonden die overeenkomen met uw selectie..</p>"
            : "<p>No listings match your selection.</p>";
        return;
      }

      listings.forEach(item => {
        const card = document.createElement("article");
        card.className = "listing-card hide";

        const imgSrc =
          item.images && item.images.length
            ? item.images[0]
            : "/assets/images/placeholder.jpg";

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
              <a href="/${getCurrentLang() === "nl" ? "nl/" : ""}property.html?id=${item.id}" class="btn">
                ${getCurrentLang() === "nl" ? "Bekijk details" : "View Details"}
              </a>
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

        const filtered =
          selected === "all"
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
      const lang = getCurrentLang();
      const dataFile = lang === "nl"
        ? "/assets/data/listings-nl.json"
        : "/assets/data/listings.json";

      const res = await fetch(dataFile);
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

      /* FORM TRACKING */
      const propertyField = document.getElementById("propertyField");
      const propertyUrl = document.getElementById("propertyUrl");

      if (propertyField) {
        propertyField.value = `${property.title} | ${property.price} | ${property.location}`;
      }

      if (propertyUrl) {
        propertyUrl.value = window.location.href;
      }

      /* FEATURES */
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
