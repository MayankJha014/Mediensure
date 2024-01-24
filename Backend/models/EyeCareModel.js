const mongoose = require("mongoose");

const EyeCareModel = mongoose.Schema({
    banner:{
        type:Object
    },
    plans:{
        type:Array,
        default:[]
    },
    inclusion:{
        type:Array,
        default:[]
    }
})

const EyeCare = mongoose.model("EyeCare",EyeCareModel);
module.exports = EyeCare;