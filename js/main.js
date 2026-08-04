/**
 * Stichting Tijdspoort – main.js
 * Vanilla JavaScript, geen externe bibliotheken.
 *
 * Inhoud:
 * 1. Mobiel navigatiemenu (hamburger)
 * 2. Actieve navigatielink op basis van scroll (Intersection Observer)
 * 3. Formuliervalidatie en verzending
 * 4. Voettekst: huidig jaar invullen
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────────────────────
     1. MOBIEL NAVIGATIEMENU
     ───────────────────────────────────────────────────────────── */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav   = document.getElementById('main-nav');
  const navLinks  = mainNav ? mainNav.querySelectorAll('.nav-link') : [];

  function sluitmenu() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menu openen');
  }

  function openMenu() {
    if (!mainNav || !navToggle) return;
    mainNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menu sluiten');
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mainNav.classList.contains('is-open');
      if (isOpen) {
        sluitmenu();
      } else {
        openMenu();
      }
    });

    /* Sluit menu bij klikken op een link (mobiel) */
    navLinks.forEach(function (link) {
      link.addEventListener('click', sluitmenu);
    });

    /* Sluit menu bij Escape-toets */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') sluitmenu();
    });

    /* Sluit menu bij klikken buiten het navigatiegebied */
    document.addEventListener('click', function (e) {
      if (
        mainNav.classList.contains('is-open') &&
        !mainNav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        sluitmenu();
      }
    });
  }

  /* ─────────────────────────────────────────────────────────────
     2. ACTIEVE NAVIGATIELINK (SCROLL SPY)
     ───────────────────────────────────────────────────────────── */
  const secties = document.querySelectorAll('section[id]');

  if (secties.length > 0 && 'IntersectionObserver' in window) {
    const observerOpties = {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const actieveId = entry.target.id;

          navLinks.forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === '#' + actieveId) {
              link.setAttribute('aria-current', 'page');
            } else {
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, observerOpties);

    secties.forEach(function (sectie) {
      observer.observe(sectie);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     3. FORMULIERVALIDATIE EN VERZENDING
     ───────────────────────────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const statusEl    = document.getElementById('formulier-status');

  /**
   * Toont een foutmelding bij een invoerveld.
   * @param {HTMLElement} invoer
   * @param {string} bericht
   */
  function toonFout(invoer, bericht) {
    const foutEl = document.getElementById(invoer.id + '-fout');
    if (foutEl) foutEl.textContent = bericht;
    invoer.setAttribute('aria-invalid', 'true');
    invoer.classList.add('formulier-input--fout');
  }

  /**
   * Wist een foutmelding bij een invoerveld.
   * @param {HTMLElement} invoer
   */
  function wisfout(invoer) {
    const foutEl = document.getElementById(invoer.id + '-fout');
    if (foutEl) foutEl.textContent = '';
    invoer.removeAttribute('aria-invalid');
    invoer.classList.remove('formulier-input--fout');
  }

  /**
   * Valideert het gehele formulier.
   * @returns {boolean} true als alles geldig is
   */
  function valideerFormulier() {
    let geldig = true;

    const naam   = document.getElementById('naam');
    const email  = document.getElementById('email');
    const bericht = document.getElementById('bericht');

    /* Naam */
    if (!naam.value.trim()) {
      toonFout(naam, 'Vul uw naam in.');
      geldig = false;
    } else {
      wisfout(naam);
    }

    /* E-mail */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      toonFout(email, 'Vul uw e-mailadres in.');
      geldig = false;
    } else if (!emailRegex.test(email.value.trim())) {
      toonFout(email, 'Vul een geldig e-mailadres in.');
      geldig = false;
    } else {
      wisfout(email);
    }

    /* Bericht */
    if (!bericht.value.trim()) {
      toonFout(bericht, 'Vul uw bericht in.');
      geldig = false;
    } else if (bericht.value.trim().length < 10) {
      toonFout(bericht, 'Uw bericht is te kort (minimaal 10 tekens).');
      geldig = false;
    } else {
      wisfout(bericht);
    }

    return geldig;
  }

  if (contactForm) {
    /* Live validatie bij het verlaten van een veld */
    ['naam', 'email', 'bericht'].forEach(function (id) {
      const invoer = document.getElementById(id);
      if (invoer) {
        invoer.addEventListener('blur', function () {
          if (invoer.value.trim() !== '') {
            valideerFormulier();
          }
        });
      }
    });

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      /* Verwijder eerdere statusmelding */
      if (statusEl) {
        statusEl.textContent = '';
        statusEl.className = 'formulier-status';
      }

      if (!valideerFormulier()) {
        /* Zet focus op het eerste veld met fout */
        const eersteOngeldig = contactForm.querySelector('[aria-invalid="true"]');
        if (eersteOngeldig) eersteOngeldig.focus();
        return;
      }

      /* Simuleer asynchrone verzending */
      const verzendKnop = contactForm.querySelector('[type="submit"]');
      if (verzendKnop) {
        verzendKnop.disabled = true;
        verzendKnop.textContent = 'Bezig met versturen…';
      }

      setTimeout(function () {
        /* Reset knop */
        if (verzendKnop) {
          verzendKnop.disabled = false;
          verzendKnop.textContent = 'Bericht versturen';
        }

        /* Toon bevestiging */
        if (statusEl) {
          statusEl.textContent =
            'Bedankt voor uw bericht! We nemen zo snel mogelijk contact met u op.';
          statusEl.className = 'formulier-status formulier-status--succes';
          statusEl.focus();
        }

        /* Reset formulier */
        contactForm.reset();
        ['naam', 'email', 'bericht'].forEach(function (id) {
          const invoer = document.getElementById(id);
          if (invoer) wisfout(invoer);
        });
      }, 1200);
    });
  }

  /* ─────────────────────────────────────────────────────────────
     4. VOETTEKST – HUIDIG JAAR
     ───────────────────────────────────────────────────────────── */
  const jaarEl = document.getElementById('footer-jaar');
  if (jaarEl) {
    jaarEl.textContent = new Date().getFullYear();
  }
})();
