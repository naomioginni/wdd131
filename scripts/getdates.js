// Dynamically populate the current copyright year
const yearSpan = document.getElementById("currentyear");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// Dynamically populate the last modified date
document.getElementById("lastModified").innerHTML =
  "Last Modification: " + document.lastModified;
