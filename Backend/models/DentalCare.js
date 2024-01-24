const mongoose = require("mongoose");

const DentalModel = mongoose.Schema({
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
    },
    equipmentBanner:{
        type:Object
    },
    equipmentReviews:{
        type:Array,
        default:[]
    }
})

const Dental = mongoose.model("Dental",DentalModel);
module.exports = Dental;