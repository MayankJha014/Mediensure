// // database.js
// const mongoose = require("mongoose");

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to the database");
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error);
//   });

// const conn = mongoose.connection;
// let gfsBucket;

// conn.on("error", (error) => {
//   console.error("Database connection error:", error);
// });
// if(conn){
//   conn.once("open", () => {
//     console.log("Connection opened");
//     gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//       bucketName: "avatar",
//     });
//   });
// }


// function getGridFSBucket() {
//   if (!gfsBucket) {
//     console.error("GridFSBucket not initialized");
//   } else {
//     console.log("GridFSBucket initialized");
//   }
//   return gfsBucket;
// }

// module.exports = { getGridFSBucket };
