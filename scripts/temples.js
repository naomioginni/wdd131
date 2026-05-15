// temples.js – Temple Album JavaScript

// ── Footer: copyright year & last modified ──────────────────
// Dynamically populate the current copyright year
const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Dynamically populate the last modified date
document.getElementById("lastModified").innerHTML =
  "Last Modification: " + document.lastModified;

// ── Hamburger menu toggle ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Toggle between ☰ and ✕
    hamburger.innerHTML = isOpen ? '&#10005;' : '&#9776;';
  });

  // Close menu when a nav link is tapped (mobile UX)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.innerHTML = '&#9776;';
    });
  });
}
