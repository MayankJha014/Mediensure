// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect("mongodb://127.0.0.1:27017/mediensure");
//     console.log("Connected to database");
//   } catch (err) {
//     console.log("Error connecting to database:", err);
//   }
// };

// let gfsBucket; // Declare gfsBucket outside the once() callback to avoid scope issues

// const conn = mongoose.connection;
// conn.once("open", () => {
//   gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "avatar",
//   });
//   console.log("gfsBucket initialized");
// });

// // You can export a function to check if gfsBucket is ready
// const isGfsBucketReady = () => {
//   return !!gfsBucket;
// };

// module.exports = { connectDB, isGfsBucketReady, gfsBucket };
