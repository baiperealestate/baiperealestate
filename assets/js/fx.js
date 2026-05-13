// ========================================
// BAI PE REAL ESTATE — CURRENCY SYSTEM
// ========================================

const exchangeRates = {
  XCG: 1,
  USD: 0.56,
  EUR: 0.52
};

let currentCurrency =
  localStorage.getItem("baipe_currency") || "USD";

document.addEventListener("DOMContentLoaded", () => {

  const languageSwitcher =
    document.getElementById("languageSwitcher");

  if (!languageSwitcher) return;

  if (document.getElementById("currencySwitcher")) return;

  const currencySwitcher =
    document.createElement("select");

  currencySwitcher.id = "currencySwitcher";
  currencySwitcher.className = "language-switcher";

  currencySwitcher.innerHTML = `
    <option value="USD">USD $</option>
    <option value="EUR">EUR €</option>
    <option value="XCG">XCG ƒ</option>
  `;

  currencySwitcher.value = currentCurrency;

  languageSwitcher.insertAdjacentElement(
    "afterend",
    currencySwitcher
  );

  currencySwitcher.addEventListener("change", () => {

    currentCurrency = currencySwitcher.value;

    localStorage.setItem(
      "baipe_currency",
      currentCurrency
    );

    location.reload();
  });

});

function formatPrice(priceXCG) {

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
