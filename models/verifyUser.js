const mongoose = require("mongoose");

const verifySchema = new mongoose.Schema(
    {
        username:{
            type:String,
            requireed:true,
        },
        email:{
            type:String,
            requireed:true,
        },
        password:{
            type:String,
            requireed:true,
        },
        token:{
            type:String,
            requireed:true,
        },
    },{
        collection:"verifyUser",
    }
    );


module.exports = mongoose.model("verifyUser",verifySchema);

