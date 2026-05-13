// ========================================
// BAI PE REAL ESTATE — CURRENCY SYSTEM
// ========================================

const exchangeRates = {
  USD: 1,
  EUR: 0.92,
  XCG: 1.79
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

function formatPrice(priceUSD) {

  if (!priceUSD || isNaN(priceUSD)) return "";

  const converted =
    priceUSD * exchangeRates[currentCurrency];

  if (currentCurrency === "USD") {

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(converted);

  }

  if (currentCurrency === "EUR") {

    return new Intl.NumberFormat("nl-NL", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0
    }).format(converted);

  }

  return `XCG ${converted.toLocaleString("en-US", {
    maximumFractionDigits: 0
  })}`;
}
