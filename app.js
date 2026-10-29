(() => {
  "use strict";
  const config = window.APP_CONFIG || { modules: {} };
  const pages = {
    inicio: { title: "Início", description: "Central de suporte", pill: "Portal" },
    ...(config.modules || {})
  };
  const sidebar = document.getElementById("sidebar");
  const scrim = document.getElementById("scrim");
  const menuToggle = document.getElementById("menuToggle");
  const welcome = document.getElementById("welcome");
  const homeContent = document.getElementById("homeContent");
  const pageHeading = document.getElementById("pageHeading");
  const pageTitle = document.getElementById("pageTitle");
  const pageDescription = document.getElementById("pageDescription");
  const pageCrumb = document.getElementById("pageCrumb");
  const modulePill = document.getElementById("modulePill");
  const viewerSection = document.getElementById("viewerSection");
  const viewerLabel = document.getElementById("viewerLabel");
  const viewerUrlHint = document.getElementById("viewerUrlHint");
  const viewerEmpty = document.getElementById("viewerEmpty");
  const frameWrap = document.getElementById("frameWrap");
  const frame = document.getElementById("moduleFrame");
  const frameLoading = document.getElementById("frameLoading");
  const linkMode = document.getElementById("linkMode");
  const openExternal = document.getElementById("openExternal");
  const reloadFrame = document.getElementById("reloadFrame");
  const openLinkNow = document.getElementById("openLinkNow");
  let currentUrl = "";

  function closeMenu() {
    sidebar.classList.remove("open");
    scrim.classList.remove("show");
  }
  function safeUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return "";
    try {
      const parsed = new URL(raw, window.location.href);
      return ["http:", "https:"].includes(parsed.protocol) ? parsed.href : "";
    } catch (_) { return ""; }
  }
  function showHome() {
    currentUrl = "";
    welcome.hidden = false;
    homeContent.hidden = false;
    pageHeading.hidden = true;
    viewerSection.hidden = true;
    document.querySelectorAll("[data-page]").forEach(el => el.classList.toggle("active", el.dataset.page === "inicio"));
    pageCrumb.textContent = "Início";
    closeMenu();
  }
  function openModule(key) {
    const item = pages[key];
    if (!item || key === "inicio") return showHome();
    currentUrl = safeUrl(item.url);
    welcome.hidden = true;
    homeContent.hidden = true;
    pageHeading.hidden = false;
    viewerSection.hidden = false;
    pageTitle.textContent = item.title || key;
    pageDescription.textContent = item.description || "Tela integrada do módulo.";
    pageCrumb.textContent = item.title || key;
    modulePill.textContent = item.title || "Módulo";
    viewerLabel.textContent = item.title || "Tela integrada";
    viewerUrlHint.textContent = currentUrl || "Adicione a URL em config.js para conectar este módulo.";
    viewerEmpty.hidden = true;
    frameWrap.hidden = true;
    linkMode.hidden = true;
    frameLoading.classList.remove("done");
    frame.removeAttribute("src");
    openExternal.disabled = !currentUrl;
    reloadFrame.disabled = !currentUrl || item.mode === "link";
    document.querySelectorAll(".nav-item").forEach(el => el.classList.toggle("active", el.dataset.page === key));
    if (!currentUrl) {
      viewerEmpty.hidden = false;
    } else if (item.mode === "link") {
      linkMode.hidden = false;
    } else {
      frameWrap.hidden = false;
      frame.src = currentUrl;
    }
    closeMenu();
  }
  document.querySelectorAll("[data-page]").forEach(el => {
    el.addEventListener("click", () => {
      const key = el.dataset.page;
      if (key === "inicio") showHome(); else openModule(key);
    });
  });
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    scrim.classList.toggle("show");
  });
  scrim.addEventListener("click", closeMenu);
  frame.addEventListener("load", () => frameLoading.classList.add("done"));
  openExternal.addEventListener("click", () => { if (currentUrl) window.open(currentUrl, "_blank", "noopener,noreferrer"); });
  openLinkNow.addEventListener("click", () => { if (currentUrl) window.open(currentUrl, "_blank", "noopener,noreferrer"); });
  reloadFrame.addEventListener("click", () => {
    if (!currentUrl) return;
    frameLoading.classList.remove("done");
    frame.src = currentUrl;
  });
  // Se um token já existir no navegador, ele permanece disponível para páginas
  // hospedadas na mesma origem. Este portal não envia token automaticamente a URLs externas.
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(console.warn));
  }
  showHome();
})();