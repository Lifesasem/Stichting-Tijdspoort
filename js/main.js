const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector(".main-nav");
const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuButton && mainNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Menu sluiten" : "Menu openen"
    );
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Menu openen");
    });
  });
}

document.querySelectorAll('a[aria-disabled="true"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
  });
});

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const heroVideo = document.querySelector("[data-hero-video]");

if (heroVideo && !prefersReducedMotion) {
  heroVideo.setAttribute("preload", "auto");
  heroVideo.muted = true;

  const playFromStart = () => {
    heroVideo.currentTime = 0;
    heroVideo.play().catch(() => {
      // Autoplay kan door de browser worden geblokkeerd; de poster blijft dan zichtbaar.
    });
  };

  if ("IntersectionObserver" in window) {
    const heroVideoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playFromStart();
          }
        });
      },
      { threshold: 0.4 }
    );

    heroVideoObserver.observe(heroVideo);
  } else {
    playFromStart();
  }
}

const routeScenes = document.querySelectorAll("[data-route-scene]");
const routeFill = document.querySelector(".route-line-fill");

if (routeScenes.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    routeScenes.forEach((scene) => scene.classList.add("is-active"));
    if (routeFill) {
      routeFill.style.height = "100%";
    }
  } else {
    const routeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-active");
            const index = Array.from(routeScenes).indexOf(entry.target);
            if (routeFill) {
              routeFill.style.height = `${
                ((index + 1) / routeScenes.length) * 100
              }%`;
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    routeScenes.forEach((scene) => routeObserver.observe(scene));
  }
}

