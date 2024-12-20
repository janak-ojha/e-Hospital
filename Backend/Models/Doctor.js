const mongoose=require("mongoose");

const DoctorSchema = new mongoose.Schema({
    doctorName:{
       type:String,
       required:true,
    },
    hospitalname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    },
    doctorEmail:{
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
        default:"Doctor",
    },
    doctorType:{
        type:String,
        required:true,
    },
},
{timestamps:true});

module.exports = mongoose.model("Doctor",DoctorSchema);
