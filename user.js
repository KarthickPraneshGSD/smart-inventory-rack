console.log("✅ user.js loaded");

const itemSelect = document.getElementById("itemSelect");
const statusText = document.getElementById("status");
const indicator = document.getElementById("rackIndicator");

let inventoryMap = {};

/* ==================================
   REAL-TIME INVENTORY FROM FIRESTORE
================================== */
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

/* ==================================
   SEND RACK COMMAND TO ESP32
================================== */
function updateActiveRack(rack) {
  db.collection("control").doc("activeRack").set({
    rack: rack
  }).then(() => {
    console.log("💡 Rack command sent:", rack);
  }).catch(err => {
    console.error("❌ Firestore write failed", err);
  });
}

/* ==================================
   USER ACTION: FIND ITEM
================================== */
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

    // 🔥 Trigger ESP32 LED ON
    updateActiveRack(item.rack);

  } else {
    statusText.textContent = "Item not available";
    indicator.style.background = "yellow";

    // 🔥 Trigger ESP32 BLINK
    updateActiveRack("NA");

    setTimeout(() => {
      indicator.style.background = "gray";
    }, 800);
  }
}
