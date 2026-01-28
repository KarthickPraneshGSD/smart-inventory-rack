console.log("✅ user.js loaded");

const itemSelect = document.getElementById("itemSelect");
const statusText = document.getElementById("status");
const indicator = document.getElementById("rackIndicator");

let inventoryMap = {};

/* ================================
   REAL-TIME INVENTORY SYNC
================================ */
db.collection("items").onSnapshot(snapshot => {
  itemSelect.innerHTML = "";
  inventoryMap = {};

  snapshot.forEach(doc => {
    const item = doc.data();
    inventoryMap[item.name] = item;

    const option = document.createElement("option");
    option.value = item.name;
    option.textContent = item.name;
    itemSelect.appendChild(option);
  });

  console.log("🔄 Inventory synced");
});

/* ================================
   UPDATE ACTIVE RACK (ESP32)
================================ */
function updateActiveRack(rack) {
  db.collection("control").doc("activeRack").set({
    rack: rack
  }).then(() => {
    console.log("💡 Active rack updated:", rack);
  }).catch(err => {
    console.error("❌ Firestore write failed", err);
  });
}

/* ================================
   FIND ITEM (USER ACTION)
================================ */
function findItem() {
  const name = itemSelect.value;
  const item = inventoryMap[name];

  if (!item) {
    statusText.textContent = "Item not found";
    indicator.style.background = "gray";
    return;
  }

  if (item.available) {
    statusText.textContent = `Item available in Rack ${item.rack}`;

    indicator.style.background =
      item.rack === "A" ? "red" :
      item.rack === "B" ? "green" :
      item.rack === "C" ? "blue" : "gray";

    // 🔥 SEND RACK TO ESP32
    updateActiveRack(item.rack);

  } else {
    statusText.textContent = "Item not available";
    indicator.style.background = "yellow";

    setTimeout(() => {
      indicator.style.background = "gray";
    }, 800);
  }
}
