// routes.js
const express = require('express');
const router = express.Router(); 
const {adminRegister, adminLogin} = require("../Controllers/Admin/AdminController.js")


/// admin routed
router.post("/registerAdmin",adminRegister);
router.post("/loginadmin",adminLogin);

// Export the router instance
module.exports = router;  // This exports the router correctly
