function getCurrentLang() {
  return window.location.pathname.startsWith("/nl/") ? "nl" : "en";
}

/* =====================================================
   MAIN JS – CLEAN VERSION
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

  let allListings = [];

  if (listingsContainer) {

    const lang = getCurrentLang();

    const dataFile =
      lang === "nl"
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
            ? "<p>Geen resultaten gevonden.</p>"
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
            <img src="${imgSrc}" alt="${item.title}">
            ${item.featured ? `<span class="badge">Featured</span>` : ""}
          </div>

          <div class="listing-content">
            <h3>${item.title}</h3>

            <p class="price">
              ${typeof formatPrice === "function"
                ? formatPrice(item.price)
                : item.price}
            </p>

            <p class="location">${item.location}</p>

            <div class="cta">
              <a href="/${getCurrentLang() === "nl" ? "nl/" : ""}property.html?id=${item.id}" class="btn">
                ${getCurrentLang() === "nl" ? "Bekijk details" : "View Details"}
              </a>
            </div>
          </div>
        `;

        listingsContainer.appendChild(card);
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

                return type === selected || status === selected;
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

    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;

    const lang = getCurrentLang();

    const dataFile =
      lang === "nl"
        ? "/assets/data/listings-nl.json"
        : "/assets/data/listings.json";

    try {

      const res = await fetch(dataFile);
      const listings = await res.json();

      const property = listings.find(p => p.id === id);
      if (!property) return;

      document.getElementById("title").textContent = property.title;
      document.getElementById("price").textContent = property.price;
      document.getElementById("location").textContent = property.location;
      document.getElementById("bedrooms").textContent = property.bedrooms;
      document.getElementById("bathrooms").textContent = property.bathrooms;
      document.getElementById("size").textContent = property.size;
      document.getElementById("description").textContent = property.description;

      const featuresEl = document.getElementById("features");
      featuresEl.innerHTML = "";

      property.features?.forEach(f => {
        const li = document.createElement("li");
        li.textContent = f;
        featuresEl.appendChild(li);
      });

      initGallery(property.images);

    } catch (err) {
      console.error("Property error:", err);
    }
  }

  function initGallery(images = []) {

    const imageEl = document.getElementById("propertyImage");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImage");

    let index = 0;
    let scale = 1;

    function show(i) {
      index = i;
      const src = images[index] || "/assets/images/placeholder.jpg";
      imageEl.src = src;
      lightboxImg.src = src;
    }

    show(0);

    document.querySelector(".slider-btn.next")?.addEventListener("click", () => {
      show((index + 1) % images.length);
    });

    document.querySelector(".slider-btn.prev")?.addEventListener("click", () => {
      show((index - 1 + images.length) % images.length);
    });

    imageEl?.addEventListener("click", () => {
      lightbox.classList.add("active");
    });

    document.querySelector(".lightbox-close")?.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  }

  /* =====================================================
     SCROLL ANIMATION
  ===================================================== */

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-up").forEach(el => observer.observe(el));

  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const newsletterForm = document.getElementById("newsletterForm");

  function openNewsletterForm() {
    if (!newsletterForm) return;
    newsletterForm.style.display = "block";
    newsletterForm.scrollIntoView({ behavior: "smooth" });
  }

  document.getElementById("openNewsletter")?.addEventListener("click", openNewsletterForm);
  document.getElementById("openNewsletterBlog")?.addEventListener("click", openNewsletterForm);

});

/* =====================================================
   JOURNEY MODAL (GLOBAL)
===================================================== */

function openJourney(type) {
  const box = document.getElementById("journeyContent");
  const details = document.getElementById("journeyDetails");

  if (!box || !details) return;

  box.innerHTML = `<h2>${type}</h2><p>Content loaded.</p>`;
  details.style.display = "block";
}
