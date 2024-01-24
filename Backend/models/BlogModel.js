const mongoose = require("mongoose");

const BlogModel = mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true

    },
    comment:[],
    date:{
        type:String,
        required:true

    },
    shown:{
        type:Boolean,default:true
    }

})

const Blog = mongoose.model("Blog",BlogModel);
module.exports = Blog;