const router = require("express").Router();
const Admin = require("../../Models/Admin");
const bcrypt = require("bcryptjs");
const TokenGenerate = require("../../Middleware/Tokengenerate");
const jwt = require("jsonwebtoken");
const { json } = require("express");

//authorization for admin
const  adminRegister = async(req,res) =>{
    const {username,hospitalname,email,role,password} = req.body;
    try {
        const salt= await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password,salt)
        let admin = new Admin({
            username,
            hospitalname,
            email,
            role,
            password:hashedpass
        });
        const existingAdminByEmail = await Admin.findOne({email});
        const existingHospital = await Admin.findOne({hospitalname});
        if(existingAdminByEmail){
            res.send({message:"Email already Exist"});
        }
        else if(existingHospital){
            res.send({message:"Hospital name already Exist"})
        }
        else{
            let result=await admin.save();
            res.status(200).json({
                _id:result._id,
                username:result.username,
                hospitalname:result.hospitalname,
                email:result.email,
                role:result.role,
                token:TokenGenerate(result._id)
            })
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

//login all
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the admin user by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Successful login response
        res.status(200).json({
            id: admin._id,
            username: admin.username,
            hospitalname: admin.hospitalname,
            email: admin.email,
            role: admin.role,
            token: TokenGenerate(admin._id), // Ensure `TokenGenerate` is defined and secure
        });
    } catch (error) {
        // Internal server error
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};


module.exports={adminRegister,adminLogin};
 