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

const timeWindows = document.querySelectorAll(".time-window");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (timeWindows.length) {
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    timeWindows.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    timeWindows.forEach((el) => revealObserver.observe(el));
  }
}
