const mongoose = require("mongoose")
const EquipmentModel = mongoose.Schema({
    img:{
        type:Array,
        default:[]
    },
    name:{
        type:String,

    },
    subname:{
        type:String
    },
    rating:{
        type:Number,
        default:0
    },
    description:{
        type:Array,
        default:[]
    },
    details:{
        type:Array,
        default:[]
    },
    colour:{
     type:String

    },
    review:{
        type:Array,
        default:[]
    },
    type:{
        type:String
    },
    shown:{
        type:Boolean,
        default:false
    }

})

const Equipment = mongoose.model("Equipment",EquipmentModel);
module.exports = Equipment