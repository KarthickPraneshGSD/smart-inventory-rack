if (!localStorage.getItem("inventory")) {
  const initialInventory = [
    { name: "Hammer", rack: "B", available: true },
    { name: "Screwdriver", rack: "A", available: true },
    { name: "Drill", rack: "C", available: false }
  ];
  localStorage.setItem("inventory", JSON.stringify(initialInventory));
}

// Get inventory
function getInventory() {
  return JSON.parse(localStorage.getItem("inventory"));
}

// Save inventory
function saveInventory(inv) {
  localStorage.setItem("inventory", JSON.stringify(inv));
}

// Populate dropdown
function populateDropdown(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  select.innerHTML = "";
  const inventory = getInventory();

  inventory.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.name;
    opt.text = item.name;
    select.appendChild(opt);
  });
}

// Sync across tabs
window.addEventListener("storage", e => {
  if (e.key === "inventory") {
    populateDropdown("itemSelect");
    populateDropdown("removeSelect");
  }
});