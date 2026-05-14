// ========================================
// BAI PE REAL ESTATE - FX SYSTEM
// ========================================

const exchangeRates = {
  XCG: 1,
  USD: 0.56,
  EUR: 0.52
};

let currentCurrency =
  localStorage.getItem("currency") || "XCG";

// ========================================
// FORMAT PRICE
// ========================================

function formatPrice(price) {

  if (!price || isNaN(price)) {
    return "";
  }

  const converted =
    price * exchangeRates[currentCurrency];

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
// INIT SWITCHER
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  const currencySwitcher =
    document.getElementById("currencySwitcher");

  if (!currencySwitcher) return;

  currencySwitcher.value = currentCurrency;

  currencySwitcher.addEventListener("change", () => {

    currentCurrency = currencySwitcher.value;

    localStorage.setItem(
      "currency",
      currentCurrency
    );

    // RE-RENDER LISTINGS
    if (window.refreshListings) {
      window.refreshListings();
    }

  });

});
