const mongoose=require("mongoose");

const PharmaSchema = new mongoose.Schema({
    pharmacistName:{
       type:String,
       required:true,
    },
    hospitalname:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true,
    },
    pharmacistEmail:{
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
        default:"Pharmacist",
    },

},
{timestamps:true});

module.exports = mongoose.model("Pharma",PharmaSchema);
