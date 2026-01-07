const ADMIN_PIN = "8901425000625";

console.log("✅ admin.js loaded");

// LOGIN
function login() {
  const pin = document.getElementById("pin").value;

  if (pin === ADMIN_PIN) {
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("pin").style.display = "none";
    loadItems();
  } else {
    alert("Invalid PIN");
  }
}

function logout() {
  document.getElementById("adminPanel").style.display = "none";
  document.getElementById("pin").style.display = "block";
  document.getElementById("pin").value = "";
}

// ADD / UPDATE ITEM
function addItem() {
  const name = document.getElementById("itemName").value.trim().toLowerCase();
  const rack = document.getElementById("rackSelect").value;
  const available = document.getElementById("statusSelect").value === "true";

  if (!name) return alert("Enter item name");

  db.collection("items").doc(name).set({
    name,
    rack,
    available,
    updatedAt: new Date()
  }).then(() => {
    document.getElementById("adminMsg").textContent = "Item saved successfully";
    loadItems();
  }).catch(err => {
    console.error(err);
    alert("Firestore write failed");
  });
}

// REMOVE ITEM
function removeItem() {
  const name = document.getElementById("removeSelect").value;

  if (!name) return;

  db.collection("items").doc(name).delete().then(() => {
    document.getElementById("removeMsg").textContent =
      `Item "${name}" removed`;
    loadItems();
  });
}

// LOAD ITEMS INTO REMOVE DROPDOWN
function loadItems() {
  const select = document.getElementById("removeSelect");
  select.innerHTML = "";

  db.collection("items").get().then(snapshot => {
    snapshot.forEach(doc => {
      const opt = document.createElement("option");
      opt.value = doc.id;
      opt.textContent = doc.id;
      select.appendChild(opt);
    });
  });
}