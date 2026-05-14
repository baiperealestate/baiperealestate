// ========================================
// BAI PE REAL ESTATE — CURRENCY SYSTEM
// ========================================

const exchangeRates = {
  XCG: 1,
  USD: 0.56,
  EUR: 0.52
};

// Default currency = XCG
let currentCurrency =
  localStorage.getItem("currency") || "XCG";

// ========================================
// FORMAT PRICE
// ========================================

ffunction formatPrice(priceXCG) {

  if (!priceXCG || isNaN(priceXCG)) return "";

  const converted =
    priceXCG * exchangeRates[currentCurrency];

  // USD
  if (currentCurrency === "USD") {

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(converted);

  }

  // EUR
  if (currentCurrency === "EUR") {

    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(converted);

  }

  // XCG
  return `XCG ${converted.toLocaleString("en-US", {
    maximumFractionDigits: 0
  })}`;
}
// ========================================
// UPDATE ALL PRICES
// ========================================

function updatePrices() {

  document.querySelectorAll("[data-price]")
    .forEach(el => {

      const originalPrice =
        Number(el.dataset.price);

      if (!isNaN(originalPrice)) {

        el.textContent =
          formatPrice(originalPrice);

      }

    });

}

// ========================================
// UPDATE PLACEHOLDERS
// ========================================

function updatePricePlaceholders() {

  const minInput =
    document.getElementById("priceMin");

  const maxInput =
    document.getElementById("priceMax");

  if (!minInput || !maxInput) return;

  const currencyLabel =
    currentCurrency === "USD"
      ? "USD"
      : currentCurrency === "EUR"
      ? "EUR"
      : "XCG";

  minInput.placeholder =
    `Min ${currencyLabel}`;

  maxInput.placeholder =
    `Max ${currencyLabel}`;
}

// ========================================
// INIT
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const currencySwitcher =
    document.getElementById("currencySwitcher");

  if (!currencySwitcher) return;

  // Set saved currency
  currencySwitcher.value =
    currentCurrency;

  // Initial updates
  updatePrices();
  updatePricePlaceholders();

  // Currency change
  currencySwitcher.addEventListener("change", () => {

    currentCurrency =
      currencySwitcher.value;

    localStorage.setItem(
      "currency",
      currentCurrency
    );

    updatePrices();
    updatePricePlaceholders();

    // Refresh listing filters
    if (window.filterListings) {
      window.filterListings();
    }

  });

});
