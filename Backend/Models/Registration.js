const mongoose=require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    name:{
       type:String,
       required:true,
    },
    hospitalname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"Teacher",
    },
    officerLevel:{
        type:String,
        required:true,
    },
   
},
{timestamps:true});

module.exports = mongoose.model("Registeroffice",RegistrationSchema);
