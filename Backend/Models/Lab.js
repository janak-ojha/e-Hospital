const mongoose=require("mongoose");

const LabSchema = new mongoose.Schema({
    labTechnicianName:{
       type:String,
       required:true,
    },
    hospitalname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    },
    labTechnicianEmail:{
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
        default:"LabTechnician",
    },

},
{timestamps:true});

module.exports = mongoose.model("Lab",LabSchema);
