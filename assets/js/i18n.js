const defaultLang = "en";
const langSelector = document.getElementById("languageSwitcher");

function loadLanguage(lang) {
  fetch(`lang/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (data[key]) el.textContent = data[key];
      });
      localStorage.setItem("language", lang);
    });
}

const savedLang = localStorage.getItem("language") || defaultLang;
loadLanguage(savedLang);
