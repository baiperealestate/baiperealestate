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
const priceMinInput = document.getElementById("priceMin");
const priceMaxInput = document.getElementById("priceMax");
const locationSearch = document.getElementById("locationSearch");
const keywordSearch = document.getElementById("keywordSearch");
const searchBtn = document.getElementById("searchBtn");

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
        listingsContainer.innerHTML = lang === "nl"
  ? "<p>Advertenties volgen binnenkort.</p>"
  : "<p>Listings coming soon.</p>";

      });

    function renderListings(listings) {

      listingsContainer.innerHTML = "";

      if (!listings || listings.length === 0) {

        const lang = getCurrentLang();
listingsContainer.innerHTML = lang === "nl"
  ? "<p>Er zijn geen resultaten gevonden die overeenkomen met uw selectie..</p>"
  : "<p>No listings match your selection.</p>";
        return;

      }

      listings.forEach(item => {

        const card = document.createElement("article");
        card.className = "listing-card hide";

        const imgSrc = item.images && item.images.length
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

  function filterListings() {

  const selectedCategory = categoryFilter?.value.toLowerCase() || "all";

  const minPrice = Number(priceMinInput?.value) || 0;
  const maxPrice = Number(priceMaxInput?.value) || Infinity;

  const locationValue = locationSearch?.value.toLowerCase().trim() || "";
  const keywordValue = keywordSearch?.value.toLowerCase().trim() || "";

  const filtered = allListings.filter(item => {

    const type = item.propertyType?.toLowerCase() || "";
    const status = item.status?.toLowerCase() || "";

    const price = Number(item.price) || 0;

    const title = item.title?.toLowerCase() || "";
    const location = item.location?.toLowerCase() || "";
    const reference = item.reference?.toLowerCase() || "";

    /* CATEGORY */

    let categoryMatch = true;

    if (selectedCategory !== "all") {

      if (selectedCategory === "lots") {

        categoryMatch =
          type === "lots" ||
          type === "land";

      } else {

        categoryMatch =
          status === selectedCategory ||
          type === selectedCategory;

      }

    }

    /* PRICE */

    const priceMatch =
      price >= minPrice &&
      price <= maxPrice;

    /* LOCATION */

    const locationMatch =
      location.includes(locationValue);

    /* KEYWORD */

    const keywordMatch =
      title.includes(keywordValue) ||
      reference.includes(keywordValue);

    return (
      categoryMatch &&
      priceMatch &&
      locationMatch &&
      keywordMatch
    );

  });

  renderListings(filtered);

}

/* CATEGORY CHANGE */

if (categoryFilter) {
  categoryFilter.addEventListener("change", filterListings);
}

/* SEARCH BUTTON */

if (searchBtn) {
  searchBtn.addEventListener("click", filterListings);
}

/* LIVE FILTERING */

[priceMinInput, priceMaxInput, locationSearch, keywordSearch]
.forEach(input => {

  if (!input) return;

  input.addEventListener("input", filterListings);

});

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
    const priceEl = document.getElementById("price");

priceEl.dataset.price = Number(property.price);

priceEl.textContent =
  formatPrice(Number(property.price));
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
     PROPERTY GALLERY + LIGHTBOX
  ===================================================== */

  function initGallery(images) {

    if (!images || images.length === 0) return;

    const imageEl = document.getElementById("propertyImage");

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImage");

    const nextBtn = document.querySelector(".slider-btn.next");
    const prevBtn = document.querySelector(".slider-btn.prev");

    const lightNext = document.querySelector(".lightbox-arrow.next");
    const lightPrev = document.querySelector(".lightbox-arrow.prev");

    const closeBtn = document.querySelector(".lightbox-close");

    const zoomIn = document.getElementById("zoomIn");
    const zoomOut = document.getElementById("zoomOut");

    let currentIndex = 0;
    let scale = 1;

    function showImage(index) {

      currentIndex = index;

      const src = images[currentIndex] || "/assets/images/placeholder.jpg";

      imageEl.src = src;

      if (lightboxImg) {
        lightboxImg.src = src;
      }

    }

    showImage(0);

    /* SLIDER */

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        showImage((currentIndex + 1) % images.length);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        showImage((currentIndex - 1 + images.length) % images.length);
      });
    }

    /* OPEN LIGHTBOX */

    if (imageEl && lightbox) {

      imageEl.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImg.src = images[currentIndex];

        scale = 1;

        lightboxImg.style.transform = "scale(1)";

      });

    }

    /* CLOSE LIGHTBOX */

    if (closeBtn && lightbox) {

      closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
      });

    }

    /* LIGHTBOX NAVIGATION */

    if (lightNext) {

      lightNext.addEventListener("click", () => {
        showImage((currentIndex + 1) % images.length);
      });

    }

    if (lightPrev) {

      lightPrev.addEventListener("click", () => {
        showImage((currentIndex - 1 + images.length) % images.length);
      });

    }

    /* ZOOM */

    if (zoomIn) {

      zoomIn.addEventListener("click", () => {

        scale += 0.2;

        lightboxImg.style.transform = `scale(${scale})`;

      });

    }

    if (zoomOut) {

      zoomOut.addEventListener("click", () => {

        scale = Math.max(1, scale - 0.2);

        lightboxImg.style.transform = `scale(${scale})`;

      });

    }

    /* SWIPE MOBILE */

    if (lightbox) {

      let startX = 0;

      lightbox.addEventListener("touchstart", e => {
        startX = e.changedTouches[0].screenX;
      });

      lightbox.addEventListener("touchend", e => {

        const endX = e.changedTouches[0].screenX;

        if (startX - endX > 50) {
          showImage((currentIndex + 1) % images.length);
        }

        if (endX - startX > 50) {
          showImage((currentIndex - 1 + images.length) % images.length);
        }

      });

    let scale = 1;

// Scroll wheel zoom (desktop)
lightboxImg.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (e.deltaY < 0) {
    scale += 0.15;
  } else {
    scale -= 0.15;
  }

  scale = Math.min(Math.max(1, scale), 4);

  lightboxImg.style.transform = `scale(${scale})`;
});

   lightboxImg.addEventListener("click", () => {
  scale = 1;
  lightboxImg.style.transform = "scale(1)";
});

 let startDistance = 0;

lightboxImg.addEventListener("touchstart", (e) => {
  if (e.touches.length === 2) {
    startDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );
  }
});

lightboxImg.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    const newDistance = Math.hypot(
      e.touches[0].pageX - e.touches[1].pageX,
      e.touches[0].pageY - e.touches[1].pageY
    );

    const zoom = newDistance / startDistance;

    scale = Math.min(Math.max(1, zoom), 4);

    lightboxImg.style.transform = `scale(${scale})`;
  }
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

  /* =====================================================
     NEWSLETTER
  ===================================================== */

  const newsletterForm = document.getElementById("newsletterForm");
  const openNewsletter = document.getElementById("openNewsletter");
  const openNewsletterBlog = document.getElementById("openNewsletterBlog");

  function openNewsletterForm() {

    if (!newsletterForm) return;

    newsletterForm.style.display = "block";

    newsletterForm.scrollIntoView({
      behavior: "smooth"
    });

  }

  if (openNewsletter) {
    openNewsletter.addEventListener("click", openNewsletterForm);
  }

  if (openNewsletterBlog) {
    openNewsletterBlog.addEventListener("click", openNewsletterForm);
  }

});

function openJourney(type) {

let content = "";

if(type === "buy"){

content = `
<h2>Buying Property in Curaçao</h2>

<p>
Buying property is an important decision. At Bai Pe Real Estate
we guide buyers through the process with professional advice,
market insights, and a structured approach.
</p>

<h3>How We Guide You</h3>

<ul>
<li>Understanding your needs and investment goals</li>
<li>Identifying suitable properties</li>
<li>Property viewings and evaluation</li>
<li>Market advice and negotiation strategy</li>
<li>Guidance through the purchase process</li>
</ul>

<a href="contact.html" class="btn">Contact Us</a>
<br><br>
<button class="btn close-btn" onclick="closeJourney()">Close</button>
`;

}

else if(type === "sell"){

content = `
<h2>Selling Your Property</h2>

<p>
Selling a property requires more than just listing it online.
We use a structured marketing strategy to position your property
correctly in the market.
</p>

<h3>Our Selling Strategy</h3>

<ul>
<li>Professional property evaluation</li>
<li>Strategic pricing based on market data</li>
<li>Professional property presentation</li>
<li>Targeted marketing</li>
<li>Negotiation and transaction guidance</li>
</ul>

<a href="contact.html" class="btn">Contact Us</a>
<br><br>
<button class="btn close-btn" onclick="closeJourney()">Close</button>
`;

}

else if(type === "rent"){

content = `
<h2>Rental Services</h2>

<p>
Whether you are looking for a rental property or want to rent
out your investment, we provide professional assistance to
make the process simple and secure.
</p>

<h3>How We Assist</h3>

<ul>
<li>Marketing rental properties</li>
<li>Tenant screening</li>
<li>Viewing coordination</li>
<li>Rental agreements</li>
<li>Guidance throughout the rental process</li>
</ul>

<a href="contact.html" class="btn">Contact Us</a>
<br><br>
<button class="btn close-btn" onclick="closeJourney()">Close</button>
`;

}

const details = document.getElementById("journeyDetails");
const contentBox = document.getElementById("journeyContent");

contentBox.innerHTML = content;
details.style.display = "block";

details.scrollIntoView({
behavior: "smooth"
});

}

function closeJourney(){

const details = document.getElementById("journeyDetails");

details.style.display = "none";

}

/* ===============================
   SCROLL ANIMATION
=============================== */

document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".fade-up").forEach(el => {
    observer.observe(el);
  });

});

/* =====================================================
   LANGUAGE SYSTEM - COMPLETE (SWITCH + LINKS)
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const langSwitcher = document.getElementById("languageSwitcher");
  const path = window.location.pathname;
  const isNL = path.startsWith("/nl/");

  /* ================================
     SET DROPDOWN STATE
  ================================ */
  if (langSwitcher) {
    langSwitcher.value = isNL ? "nl" : "en";

    const savedLang = localStorage.getItem("lang");

    if (savedLang && savedLang !== langSwitcher.value) {
      switchLanguage(savedLang);
    }

    langSwitcher.addEventListener("change", function () {
      const selectedLang = this.value;

      localStorage.setItem("lang", selectedLang);
      switchLanguage(selectedLang);
    });
  }

/* ================================
     SWITCH LANGUAGE
  ================================ */
function switchLanguage(lang) {

  let currentPath = window.location.pathname;
  let query = window.location.search; // ✅ THIS IS THE FIX

  currentPath = currentPath.replace(/^\/+/, "");
  currentPath = currentPath.replace(/^nl\//, "");

  if (currentPath === "") {
    currentPath = "index.html";
  }

  let newUrl = (lang === "nl")
    ? "/nl/" + currentPath + query
    : "/" + currentPath + query;

  window.location.href = newUrl;
}
   
  /* ================================
     LOCALIZE ALL LINKS
  ================================ */
 const links = document.querySelectorAll("a[href$='.html']");

  links.forEach(link => {
    let href = link.getAttribute("href");

    // Skip external links
    if (!href || href.startsWith("http")) return;

    href = href.replace(/^\/?nl\//, "");
    
link.href = isNL ? "/nl/" + href : "/" + href;
  });

});

