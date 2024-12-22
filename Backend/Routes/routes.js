// routes.js
const express = require('express');
const router = express.Router(); 
const {adminRegister, adminLogin,resetPasword,forgetPassword,newPassword,AdminDetail} = require("../Controllers/Admin/AdminController.js")
const {RegisterOffice,GetAllRegisteredUsers, deleteRegisterUser, updateRegisterUser} = require("../Controllers/Registration/RegistrationControllers.js");
const { jwtProtect } = require('../Middleware/authMiddleware.js');
const {registerDoctor,GetAllDoctor, deleteDoctor, updateDoctorDetail} = require('../Controllers/Doctor/DoctorController.js');
const { registerPharmacist,GetAllPharma, deletePharma, updatePharmaDetail } = require('../Controllers/Pharmacist/PharmaController.js');



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
router.delete("/deleteDoctor/:id",jwtProtect,deleteDoctor);
router.put("/updateDoctor/:id",jwtProtect,updateDoctorDetail);

//Pharmacist route
router.post("/registerPharmacist",jwtProtect,registerPharmacist);
router.get("/pharmaDetail",jwtProtect,GetAllPharma);
router.delete("/deletePharma/:id",jwtProtect,deletePharma);
router.put("/updatePharma/:id",jwtProtect,updatePharmaDetail);




// Export the router instance
module.exports = router;  // This exports the router correctly
