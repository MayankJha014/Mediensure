const mongoose = require("mongoose");

const networkModel = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number
    },
    experience:{
        type:String
    },
    type:{
        type:String
    },
    status:{
        type:String,
        default:"Sechduled"
    },
    fees:{
        type:Number
    }
})

const Network = mongoose.model("Network",networkModel);
module.exports = Network;