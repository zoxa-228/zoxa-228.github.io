// === ПЛАВНАЯ ПРОКРУТКА ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    }
  });
});

// === СМЕНА ЯЗЫКА ===
const select = document.getElementById("languageSwitcher");
const userLang = localStorage.getItem("lang") || "ru";

select.value = userLang;
loadLang(userLang);

select.addEventListener("change", e => {
  const lang = e.target.value;
  localStorage.setItem("lang", lang);
  loadLang(lang);
});

function loadLang(lang) {
  fetch(`./locales/${lang}.json`)
    .then(res => res.json())
    .then(data => applyLang(data))
    .catch(() => console.error("Ошибка загрузки языка"));
}

function applyLang(data) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const keys = el.getAttribute("data-i18n").split(".");
    let value = data;
    keys.forEach(k => (value = value[k]));
    if (value) el.textContent = value;
  });
}
