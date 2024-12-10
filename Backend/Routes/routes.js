// routes.js
const express = require('express');
const router = express.Router(); 
const {adminRegister, adminLogin,resetPasword,forgetPassword,newPassword,AdminDetail} = require("../Controllers/Admin/AdminController.js")
const {RegisterOffice} = require("../Controllers/Registration/RegistrationControllers.js");
const { jwtProtect } = require('../Middleware/authMiddleware.js');



/// admin routed
router.post("/registerAdmin",adminRegister);
router.post("/loginadmin",adminLogin);


//reset password route
router.post("/resetpassword",resetPasword);
router.get("/forgetpassword/:id/:token/:role",forgetPassword);
router.get("/newpassword/:id/:token/:role",newPassword);

// Register Office Routes
router.post("/registerRegisterOffice", jwtProtect, RegisterOffice);



// Export the router instance
module.exports = router;  // This exports the router correctly
