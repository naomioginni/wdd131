// form.js – Product Review Form JavaScript

// ── Product Array ────────────────────────────────────────────
const products = [
  { id: "fc-1888", name: "flux capacitor",     averagerating: 4.5 },
  { id: "fc-2050", name: "power laces",        averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits",      averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor",averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer",     averagerating: 5.0 }
];

// ── Populate Product Select Dynamically ─────────────────────
const selectEl = document.getElementById("product-name");

if (selectEl) {
  products.forEach(product => {
    const option = document.createElement("option");
    option.value = product.id;         // id used as value
    option.textContent = product.name; // name used for display
    selectEl.appendChild(option);
  });
}

// ── localStorage Review Counter ──────────────────────────────
const STORAGE_KEY = "reviewCount";

// On review.html — increment counter and display it
const counterEl = document.getElementById("review-count");

if (counterEl) {
  // Get current count, increment, save back
  let count = parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
  count++;
  localStorage.setItem(STORAGE_KEY, count);
  counterEl.textContent = count;
}

// ── Footer: copyright year & last modified ───────────────────
const yearEl = document.getElementById("current-year");
const modEl  = document.getElementById("last-modified");

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl)  modEl.textContent  = document.lastModified;
