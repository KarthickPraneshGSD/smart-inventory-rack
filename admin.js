const ADMIN_PIN = "8901425000625";

function login() {
  let pin = document.getElementById("pin").value;
  if (pin === ADMIN_PIN) {
    document.getElementById("adminPanel").style.display = "block";
  } else {
    alert("Invalid PIN");
  }
}

// Add or update item
function addItem() {
  let name = document.getElementById("itemName").value;
  let rack = document.getElementById("rackSelect").value;
  let available = document.getElementById("statusSelect").value === "true";

  let existing = inventory.find(i => i.name === name);
  if (existing) {
    existing.rack = rack;
    existing.available = available;
    document.getElementById("adminMsg").textContent = "Item updated!";
  } else {
    inventory.push({name: name, rack: rack, available: available});
    document.getElementById("adminMsg").textContent = "Item added!";
    // Update User dropdown
    let select = document.getElementById('itemSelect');
    let option = document.createElement('option');
    option.value = name;
    option.text = name;
    select.add(option);
  }
}
