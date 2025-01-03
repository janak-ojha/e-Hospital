const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    hospitalname:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:'Admin',
    },
    verifytoken:{  //for password resetting process
        type:String,
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Admin",adminSchema);