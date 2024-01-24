const mongoose = require("mongoose");

const homepageModel = mongoose.Schema({
  banner: {
    type: Object,
  },
  company: [],
  review: {
    type: Array,
    default: [],
  },
  posts: {
    type: Array,
    default:[],
  },
  blogs:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Blog"
    }
  ],
  health:{
    type:Array,
    default:[]
  },
  ivfBanner:{
    type:Object
  },
  ivfReview:{
    type:Array,
    default:[]
  }
});
const HomePage = mongoose.model("HomePage", homepageModel);
module.exports = HomePage;
