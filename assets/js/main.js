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
        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Advertenties volgen binnenkort.</p>"
            : "<p>Listings coming soon.</p>";
      });

    function renderListings(listings) {
      listingsContainer.innerHTML = "";

      if (!listings || listings.length === 0) {
        listingsContainer.innerHTML =
          lang === "nl"
            ? "<p>Er zijn geen resultaten gevonden die overeenkomen met uw selectie.</p>"
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
      <p>Buying property is an important decision...</p>
      <button onclick="closeJourney()">Close</button>
    `;
  }

  const details = document.getElementById("journeyDetails");
  const contentBox = document.getElementById("journeyContent");

  contentBox.innerHTML = content;
  details.style.display = "block";
}

function closeJourney() {
  document.getElementById("journeyDetails").style.display = "none";
}
