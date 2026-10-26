// Sprachwahl (DE/EN, Standard: EN) und Foto-Fallback. Läuft im <head>, damit die Seite
// direkt in der richtigen Sprache erscheint und nicht kurz flackert.
(function () {
  var root = document.documentElement;
  var KEY = "lang";

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* privater Modus */ }
  }

  function apply(lang) {
    root.setAttribute("data-lang", lang);
    root.setAttribute("lang", lang);
    // Seitentitel pro Sprache steht in <html data-title-de="…" data-title-en="…">
    var title = root.getAttribute("data-title-" + lang);
    if (title) document.title = title;
  }

  var params = new URLSearchParams(location.search);
  var fromUrl = params.get("lang");
  var initial =
    (fromUrl === "de" || fromUrl === "en") ? fromUrl :
    (/^(de|en)$/.test(stored()) && stored()) ||
    "en";
  apply(initial);

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-lang"));

    document.querySelectorAll("[data-lang-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = root.getAttribute("data-lang") === "en" ? "de" : "en";
        apply(next);
        store(next);
      });
    });

    var img = document.querySelector("[data-portrait]");
    if (img) {
      var fig = img.closest(".portrait");
      var missing = function () { fig.classList.add("is-missing"); };
      if (img.complete && img.naturalWidth === 0) missing();
      img.addEventListener("error", missing);
    }
  });
})();
