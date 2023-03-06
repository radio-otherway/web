(function initTheme() {
  var theme = localStorage.getItem("theme") || "synthwave";
  document.querySelector("html").setAttribute("data-theme", theme);
})();
