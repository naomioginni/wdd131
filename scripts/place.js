// place.js – Nigeria Country Page JavaScript

// ── Footer: copyright year & last modified ───────────────────
const yearEl = document.getElementById('current-year');
const modEl  = document.getElementById('last-modified');

if (yearEl) yearEl.textContent = new Date().getFullYear();
if (modEl)  modEl.textContent  = document.lastModified;

// ── Wind Chill Calculation ───────────────────────────────────
// Static weather values for Lagos, Nigeria
const temperature = 28;   // °C
const windSpeed   = 12;   // km/h

/**
 * calculateWindChill - Metric formula (°C, km/h)
 * Formula: 13.12 + 0.6215T - 11.37(V^0.16) + 0.3965T(V^0.16)
 * @param {number} temp  - Temperature in °C
 * @param {number} speed - Wind speed in km/h
 * @returns {number} Wind chill factor in °C
 */
function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// ── Display Wind Chill ───────────────────────────────────────
const windChillEl = document.getElementById('wind-chill');

if (windChillEl) {
  // Only calculate if conditions are met: temp <= 10°C AND windSpeed > 4.8 km/h
  if (temperature <= 10 && windSpeed > 4.8) {
    const chill = calculateWindChill(temperature, windSpeed);
    windChillEl.textContent = chill.toFixed(1) + '°C';
  } else {
    // Conditions not met (Lagos is tropical — temp is always above 10°C)
    windChillEl.textContent = 'N/A';
  }
}