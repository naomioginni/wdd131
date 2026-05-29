// filtered-temples.js

// ── Temple Data Array (12 temples) ──────────────────────────
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // ── 5 additional temples with verified image URLs ─────────
  {
    templeName: "Salt Lake",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Nauvoo Illinois",
    location: "Nauvoo, Illinois, United States",
    dedicated: "2002, June, 27",
    area: 54000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/nauvoo-illinois-temple/nauvoo-illinois-temple-50576-main.jpg"
  },
  {
    templeName: "Los Angeles California",
    location: "Los Angeles, California, United States",
    dedicated: "1956, March, 11",
    area: 190614,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/los-angeles-california-temple/los-angeles-california-temple-38945-main.jpg"
  },
  {
    templeName: "San Diego California",
    location: "San Diego, California, United States",
    dedicated: "1993, April, 25",
    area: 72000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
  }
];

// ── Helper: get dedication year from "YYYY, Month, D" ────────
function getDedicationYear(dateStr) {
  return parseInt(dateStr.split(",")[0].trim());
}

// ── Filter temples based on active filter ───────────────────
function filterTemples(filter) {
  switch (filter) {
    case "old":
      return temples.filter(t => getDedicationYear(t.dedicated) < 1900);
    case "new":
      return temples.filter(t => getDedicationYear(t.dedicated) > 2000);
    case "large":
      return temples.filter(t => t.area > 90000);
    case "small":
      return temples.filter(t => t.area < 10000);
    default:
      return temples;
  }
}

// ── Build a single temple card element ──────────────────────
function createTempleCard(temple) {
  const card = document.createElement("figure");
  card.classList.add("temple-card");

  card.innerHTML = `
    <div class="card-body">
      <h3>${temple.templeName}</h3>
      <p><span>Location:</span> ${temple.location}</p>
      <p><span>Dedicated:</span> ${temple.dedicated}</p>
      <p><span>Size:</span> ${temple.area.toLocaleString()} sq ft</p>
    </div>
    <img
      src="${temple.imageUrl}"
      alt="${temple.templeName} Temple"
      loading="lazy"
    />
  `;
  return card;
}

// ── Render filtered temples into gallery ────────────────────
function displayTemples(filter = "all") {
  const gallery = document.getElementById("gallery");
  const heading = document.getElementById("filter-heading");
  gallery.innerHTML = "";

  const filtered = filterTemples(filter);

  const labels = {
    all: "Home",
    old: "Old Temples",
    new: "New Temples",
    large: "Large Temples",
    small: "Small Temples"
  };
  heading.textContent = labels[filter] || "Home";

  if (filtered.length === 0) {
    const msg = document.createElement("p");
    msg.classList.add("no-results");
    msg.textContent = "No temples match this filter.";
    gallery.appendChild(msg);
    return;
  }

  filtered.forEach(temple => {
    gallery.appendChild(createTempleCard(temple));
  });
}

// ── Nav filtering ────────────────────────────────────────────
const navLinks = document.querySelectorAll("nav#main-nav a");

navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = link.dataset.filter;

    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const nav = document.getElementById("main-nav");
    const hamburger = document.getElementById("hamburger");
    nav.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.innerHTML = "&#9776;";

    displayTemples(filter);
  });
});

// ── Hamburger toggle ─────────────────────────────────────────
const hamburger = document.getElementById("hamburger");
const mainNav   = document.getElementById("main-nav");

if (hamburger && mainNav) {
  hamburger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", isOpen);
    hamburger.innerHTML = isOpen ? "&#10005;" : "&#9776;";
  });
}

// ── Footer ───────────────────────────────────────────────────
const yearEl = document.getElementById("current-year");
const modEl  = document.getElementById("last-modified");
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl)  modEl.textContent  = document.lastModified;

// ── Initial load ─────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const homeLink = document.querySelector('nav a[data-filter="all"]');
  if (homeLink) homeLink.classList.add("active");
  displayTemples("all");
});