const mongoose=require("mongoose");

const RegistrationSchema = new mongoose.Schema({
    name:{
       type:String,
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
    hospitalname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    }
},
{timestamps:true});

module.exports = mongoose.model("Registeroffice",RegistrationSchema);
