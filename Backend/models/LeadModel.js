const mongoose = require("mongoose");

const LeadModel = mongoose.Schema({
    data:{
        type:Object,
        required:true

    },
    role:{
        type:String,
        required:true
    }
},{timestamps: true,})

const Lead = mongoose.model("Lead",LeadModel);
module.exports = Lead;