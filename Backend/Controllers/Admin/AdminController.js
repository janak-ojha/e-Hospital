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

const resetPasword=async(req,res)=>{
    try {
        const{email,role}=req.body;
        let emailExists;
        if(role === "Admin"){
            emailExists=await Admin.findOne({email});
        }else if(role === "Doctor"){
            emailExists=await Doctor.findOne({email});
        }
        if(emailExists){
            const token= jwt.sign({ _id: emailExists._id},process.env.JWT_SECRET,{
                expiresIn:"120s",
            });
           let setUserToken;
             if(role==="Admin"){
              setUserToken=await Admin.findByIdAndUpdate(
                {_id: emailExists._id},
                {verifytoken: token},
                {new: true}
              );
           }else if(role==="Doctor"){
            setUserToken = await Teacher.findByIdAndUpdate(
                { _id: emailExists._id },
                { verifytoken: token },
                { new: true },
              );
           }
       
       if(setUserToken){
        const mailOptions = {
            from:process.env.EMAIL,
            to:email,
            subject:"Sending Email for password reset.",
            text:`this link valid for 2 minutes ${process.env.PORT}/forgetpassword/${emailExists._id}/${setUserToken.verifytoken}/${role}`,
        };
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                res.status(401).send({status:401,message:"Email not send."});
            }else{
                res
                  .status(200)
                  .send({status:200,message:"Email sent successfully."});
            }
        });
       }
    }else{
        res.status(200).send({message:"email doesn't exist."}); 
    }
    } catch (error) {
        res.send({message:"error occcured"});
    }
};

//used for checking the validing user and token
const forgetPassword=async(req,res)=>{
    try {
        const{id,token,role}=req.params;
        let validuser;
        if(role==="Admin"){
            validuser=await Admin.findOne({_id:id,verifytoken:token});
        }else if(role==="Doctor"){
            validuser=await Doctor.findOne({_id:id,verifytoken:token});
        }
        const verifytoken=jwt.verify(token,process.env.JWT_SECRET);
        
        if(validuser && verifytoken._id){
            res.status(201).send({status:201,validuser});
        }else{
            res.status(201).send({status:401,message:"user not exist"});
        }

    } catch (error) {
        res.status(404).send(error);
    }
};

const newPassword=async(req,res)=>{
    try {
        const {id,token,role}=req.params;
        const {password} = req.body;
        let validuser;
        if(role === "Admin"){
            validuser=await Admin.findOne({_id:id,verifytoken:token});
        }else if(role === "Doctor"){
            validuser=await Doctor.findOne({_id:id,verifytoken:token});
        }
        const verifytoken=jwt.verify(token,process.env.JWT_SECRET);
        if(validuser && verifytoken._id){
            const salt = await bcrypt.genSalt(10);
            const hashedpass = await bcrypt.hash(password,salt);
            let result;
            if(role === "Admin"){
                result=await Admin.findByIdAndUpdate(id,{password: hashedpass});
            }else if(role === "Doctor"){
                result=await Doctor.findByIdAndUpdate(id,{password: hashedpass});
            }
            res.status(201).send({status:201,result});
        }else{
            res.status(401).send({status:401,message:"user not exist"});
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

// getting all the detail off the admin
const AdminDetail=async(req,res)=>{
    try {
        const admins=await Admin.find();
        res.json(admins);
    } catch (error) {
       res.status(500).json({error:"error while fetching the details"}) 
    }
};

module.exports={adminRegister,adminLogin,resetPasword,forgetPassword,newPassword,AdminDetail};
 