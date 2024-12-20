// routes.js
const express = require('express');
const router = express.Router(); 
const {adminRegister, adminLogin,resetPasword,forgetPassword,newPassword,AdminDetail} = require("../Controllers/Admin/AdminController.js")
const {RegisterOffice,GetAllRegisteredUsers, deleteRegisterUser, updateRegisterUser} = require("../Controllers/Registration/RegistrationControllers.js");
const { jwtProtect } = require('../Middleware/authMiddleware.js');
const {registerDoctor,GetAllDoctor} = require('../Controllers/Doctor/DoctorController.js');



/// admin routed
router.post("/registerAdmin",adminRegister);
router.post("/loginadmin",adminLogin);


//reset password route
router.post("/resetpassword",resetPasword);
router.get("/forgetpassword/:id/:token/:role",forgetPassword);
router.get("/newpassword/:id/:token/:role",newPassword);

// Register Office Routes
router.post("/registerRegisterOffice", jwtProtect, RegisterOffice);
router.get("/registeredDetail",jwtProtect,GetAllRegisteredUsers);
router.delete("/deleteRegisterUser/:id", jwtProtect, deleteRegisterUser);
router.put("/updateRegisterUser/:id", jwtProtect, updateRegisterUser);

//Doctor Routes
router.post("/registerDoctor",jwtProtect,registerDoctor);
router.get("/doctorDetail",jwtProtect,GetAllDoctor);

// Export the router instance
module.exports = router;  // This exports the router correctly
