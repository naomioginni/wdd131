// scripts/project.js — Explore Lagos

// ─── 1. Data: Array of Objects ────────────────────────────────────────────────
let packingList = JSON.parse(localStorage.getItem("lagosList")) || [
    { item: "Mosquito Repellent", packed: false },
    { item: "Lightweight Rain Jacket", packed: false },
    { item: "Power Bank", packed: false },
    { item: "Naira Cash (₦)", packed: false },
    { item: "Sunscreen", packed: false },
    { item: "Comfortable Walking Shoes", packed: false }
];

// ─── 2. DOM Selection ─────────────────────────────────────────────────────────
const listContainer  = document.getElementById("packing-list");
const itemInput      = document.getElementById("new-item");
const addButton      = document.getElementById("add-btn");
const progressEl     = document.querySelector(".packing-progress");

// ─── 3. Render the Packing List ───────────────────────────────────────────────
function renderList() {
    if (!listContainer) return; // Only runs on planning.html

    listContainer.innerHTML = "";

    // Array method: forEach with template literals
    packingList.forEach((listItem, index) => {
        const packedClass = listItem.packed ? "packed" : "";
        const checkedAttr = listItem.packed ? "checked" : "";

        const htmlString = `
            <div class="list-item">
                <input 
                    type="checkbox" 
                    id="item-${index}" 
                    aria-label="${listItem.item}"
                    onchange="toggleItem(${index})" 
                    ${checkedAttr}
                >
                <span class="${packedClass}">${listItem.item}</span>
            </div>
        `;
        listContainer.innerHTML += htmlString;
    });

    updateProgress();
    saveToStorage();
}

// ─── 4. Progress Counter ──────────────────────────────────────────────────────
function updateProgress() {
    if (!progressEl) return;

    // Array method: filter
    const packedCount = packingList.filter(item => item.packed).length;
    const total = packingList.length;

    // Conditional branching
    if (packedCount === total && total > 0) {
        progressEl.innerHTML = `<span>${packedCount}</span> / ${total} items packed — You're ready! 🎉`;
    } else {
        progressEl.innerHTML = `<span>${packedCount}</span> / ${total} items packed`;
    }
}

// ─── 5. Add a New Item ────────────────────────────────────────────────────────
function addItem(event) {
    event.preventDefault();

    const newItemText = itemInput.value.trim();

    if (newItemText !== "") {
        packingList.push({ item: newItemText, packed: false });
        itemInput.value = "";
        itemInput.focus();
        renderList();
    } else {
        // Conditional branching – visual feedback, no alert
        itemInput.style.borderColor = "#e74c3c";
        itemInput.placeholder = "Please type an item first!";
        setTimeout(() => {
            itemInput.style.borderColor = "";
            itemInput.placeholder = "Add a new item...";
        }, 1800);
    }
}

// ─── 6. Toggle Packed Status ──────────────────────────────────────────────────
function toggleItem(index) {
    packingList[index].packed = !packingList[index].packed;
    renderList();
}

// ─── 7. LocalStorage ─────────────────────────────────────────────────────────
function saveToStorage() {
    localStorage.setItem("lagosList", JSON.stringify(packingList));
}

// ─── 8. Form Submission Feedback ─────────────────────────────────────────────
function initContactForm() {
    const form = document.querySelector("form");
    const successMsg = document.querySelector(".form-success");

    if (!form || !successMsg) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nameField  = document.getElementById("name");
        const emailField = document.getElementById("email");

        // Conditional branching for validation
        if (!nameField.value.trim() || !emailField.value.trim()) {
            return;
        }

        const firstName = nameField.value.trim().split(" ")[0];
        successMsg.textContent = `Thanks, ${firstName}! Your message was sent. We'll reply within 24 hours.`;
        successMsg.style.display = "block";
        form.reset();

        setTimeout(() => {
            successMsg.style.display = "none";
        }, 5000);
    });
}

// ─── 9. Active Navigation Highlight ──────────────────────────────────────────
function highlightActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "project.html";
    const navLinks = document.querySelectorAll(".links a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        // Conditional branching
        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}

// ─── 10. Enter Key Support for Packing Input ─────────────────────────────────
function initPackingKeyListener() {
    if (!itemInput) return;
    itemInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addItem(event);
        }
    });
}

// ─── 11. Event Listeners ─────────────────────────────────────────────────────
if (addButton) {
    addButton.addEventListener("click", addItem);
}

// ─── Initialize ───────────────────────────────────────────────────────────────
highlightActiveNav();
initContactForm();
renderList();
initPackingKeyListener();