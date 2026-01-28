<!DOCTYPE html>
<html>
<head>
  <title>Smart Inventory - User</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

<div class="header">
  <img src="pricol_logo.png.jpg" class="logo">
  <h2 class="title">Smart Inventory Rack System</h2>
</div>

<select id="itemSelect"></select>
<button onclick="findItem()">Find Item</button>

<p id="status" class="statusText"></p>
<div id="rackIndicator" class="indicator"></div>

<a href="admin.html" class="adminLink">Admin Login</a>

<!-- 🔥 Firebase -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<script src="firebase.js"></script>
<script src="user.js"></script>

</body>
</html>
