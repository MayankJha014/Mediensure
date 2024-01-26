require("dotenv").config({ path: "./.env" });
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const allowedOrigins = ["http://localhost:3000", "http://localhost:3001","http://localhost:3002" ,"https://mediensure.in"];
// const  SariskaMediaTransport =  require("sariska-media-transport");

// SariskaMediaTransport.initialize();
const app = express();
const cookieParser = require("cookie-parser");

const httpServer = http.createServer(app);
const io = new socketIo.Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// io.on("connection", (socket) => { 
//   console.log("A user connected:", socket.id);

// //   socket.on("myevent", (dets) => {
// //     console.log("hello Garvity");
// //     socket.emit("responseEvent", "Hello Client");
// //   });
// });
// io.on("email",(data)=>{
//   console.log("email send");
// })
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const session = require("express-session");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
  })
);

const cors = require("cors");
const corsOptions = {
  origin: "*", // Allow any origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  
};
app.use(cors({origin:allowedOrigins,credentials:true}))

app.use(cookieParser());
const fileupload = require("express-fileupload");
app.use(fileupload());

const logger = require("morgan");
app.use(logger("tiny"));

// Routes
app.use("/api/v1/user", require("./routes/indexRoute.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes.js"));
app.use("/api/v1/other", require("./routes/otherRoutes.js"));
app.use("/api/v1/network", require("./routes/networkRoute.js"));

// Error handling
const errorHanler = require("./error/errorHandler.js");
const { generatedErrror } = require("./middlewares/error.js");


app.all("*", (req, res, next) => {
  next(new errorHanler(`requested url not found ${req.url}`, 404));
});

app.use(generatedErrror);

// Start the server
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = {app, io };
