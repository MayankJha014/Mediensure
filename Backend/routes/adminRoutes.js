const express = require("express");
const {
  homepage,
  AdminData,
  login,
  signin,
  signout,
  sendMail,
  changePassword,
  resetPassword,
  UpdateData,
  avatarupload,
  getAllStudent,
  verifyDoctor,
  updateConsultationFees,
  registerOperator,
  operatorData,
  Operatorsignin,
  OperatorDetails,
  UpdateOperatorDetails,
} = require("../controllers/Admin/AdminController");
const {
  isAuthenticated,
  isAuthenticatedAdmin,
  isAuthenticatedDoctor,
  videSdk,
  meetingroom,
  isAuthenticatedOperation,
} = require("../middlewares/auth");

const router = express.Router();
var multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { ObjectId } = require("mongodb");

var mongoose = require("mongoose");
const crypto = require("crypto");
const id3 = require("node-id3");
const { Readable } = require("stream");
const path = require("path");
const Admin = require("../models/AdminModel");

const { CatchAsyncErrors } = require("../middlewares/CatchAsyncerror");
const errorHanler = require("../error/errorHandler");
const HomePage = require("../models/homepageModel");
require("dotenv").config({ path: "./.env" });

const {
  addBlog,
  changeStatusPost,
  uploadPlans,
  deletePlans,
  updateDentalDoctor,
  shownDentalDoctor,
  uploadEyePlan,
  changeStatusBlogs,
  updatePremiumPrice,
  getAllConsultation,
  getLeads,
  getAllPatient,
  updateEquipmentStatus,
  AddDentalEquipmentReview,
  getInstitution,
  getNetworkConsultation,
} = require("../controllers/dashboardController");
const Dental = require("../models/DentalCare");
const DentalDoctor = require("../models/DentalDoctorModel");
const Equipment = require("../models/Equpments");
const EyeCare = require("../models/EyeCareModel");
const { getPrescriptionDetails } = require("../controllers/othersController");
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
const conn = mongoose.connection;
var gfsBucket;

conn.once("open", () => {
  gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "avatar", // Change to your desired bucket name
  });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image"); // Using single instead of array
// import SariskaMediaTransport  from  "sariska-media-transport";

// SariskaMediaTransport.initialize();
// const token = "279202c6befe19412737d5e33eeceec136c456fc88a1229f7cd1af2f";

// const connection = new SariskaMediaTransport.JitsiConnection(token, "roomName", isNightly);

// //  set isNightly true for latest updates on the features else build will point to stable version

// connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_ESTABLISHED, () => {
//   console.log('connection successful!!!');
// });

// connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_FAILED, (error) => {
//   if (error  === SariskaMediaTransport.events.connection.PASSWORD_REQUIRED) { // token expired set again
//       connection.setToken(token) // set a new token
//       console.log('connection disconnect!!!', error);
//   }
// });

// connection.addEventListener(SariskaMediaTransport.events.connection.CONNECTION_DISCONNECTED, (error) => {
//   console.log('connection disconnect!!!', error);
// });
// connection.connect()
router.get("/", homepage);
// user data
router.get("/admin", isAuthenticatedAdmin, AdminData);
router.get("/operator", isAuthenticatedOperation, operatorData);
// login
router.post("/register", login);
router.post("/operator/register", registerOperator);
// POST signIn
router.post("/signin", signin);
router.post("/operator/login", Operatorsignin);
router.get("/get/operator",isAuthenticatedAdmin, OperatorDetails);
router.get("/update/operator/:id",isAuthenticatedAdmin, UpdateOperatorDetails);

// POST SIGNOUT
router.post("/signout", isAuthenticatedAdmin, signout);
// for forget send mail POST
router.post("/internstudent/sendmail", sendMail);
// password changed
router.post("/forgetlink/:id", changePassword);
// reset password
router.post("/reset/password", isAuthenticatedAdmin, resetPassword);

router.post(
  "/upload/banner",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);
      console.log(imageUploadStream.id.toString());

      const homepage = await HomePage.findOne();

      if (homepage.banner && homepage?.banner.filename) {
        console.log(homepage?.banner.filename);
        // const fileObjectId = new ObjectId();
        gfsBucket.delete(homepage?.banner._id, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err });
          }

          // After successful deletion, update the banner in the model
        });
        homepage.banner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await homepage.save();

        res.status(200).json({
          success: true,
          homepage,
        });
      } else {
        // If no banner exists, create a new one
        homepage.banner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await homepage.save();

        res.status(200).json({
          success: true,
          homepage,
        });
      }
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.get(
  "/get/image/:name/:type/:format",
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const homepage = await HomePage.findOne();

      if (!homepage) {
        return res.status(404).json({
          error: "Image not found",
        });
      }

      const img = await gfsBucket.find({ filename: req.params.name }).toArray();

      if (img.length === 0) {
        return res.status(404).json({
          error: "Image not found",
        });
      }

      const format = req.params.type + "/" + req.params.format;
      const stream = await gfsBucket.openDownloadStreamByName(req.params.name);

      res.set("Content-Type", format);
      res.status(200);
      stream.pipe(res);
    } catch (error) {
      console.error(error);

      // Handle specific errors or return a generic error message
      if (error.name === "CastError") {
        return res.status(400).json({
          error: "Invalid image ID",
        });
      }

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  })
);

router.post(
  "/upload/home/company",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);
      console.log(imageUploadStream.id.toString());

      const homepage = await HomePage.findOne();
      const info = {
        uid: uuidv4(),
        filename: imageRandomName,
        mimetype: imageFile?.mimetype,
        _id: imageUploadStream.id.toString(),
      };
      // If no banner exists, create a new one
      homepage.company.push(info);
      await homepage.save();

      res.status(200).json({
        success: true,
        homepage,
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.post(
  "/delete/home/company/:id",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const homepage = await HomePage.findOne();
      const imageId = req.body.imageId.toString(); // Convert to string explicitly
      const img = await gfsBucket
        .find({ _id: new ObjectId(imageId) })
        .toArray();

      if (img.length === 0) {
        return res.status(404).json({
          error: "Image not found",
        });
      }

      const del = await gfsBucket.delete(new ObjectId(imageId), async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, error: err });
        }
      });
      const home = homepage?.company?.filter((i) => i?.uid !== req.params.id);
      homepage.company = home;
      await homepage.save();

      res.status(200).json({
        success: true,
        homepage,
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);

router.post("/upload/review", isAuthenticatedAdmin, async (req, res, next) => {
  try {
    const imageFile = req.files.image;
    const imageRandomName = crypto.randomBytes(20).toString("hex");
    const imageStream = Readable.from(imageFile.data);
    const imageUploadStream = await gfsBucket.openUploadStream(imageRandomName);
    imageStream.pipe(imageUploadStream);

    const info = {
      uid: uuidv4(),
      text: req.body.text,
      filename: imageRandomName,
      mimetype: imageFile?.mimetype,
      _id: imageUploadStream.id,
    };
    const homepage = await HomePage.findOne();
    homepage.review.push(info);
    await homepage.save();
    res.status(201).json({
      homepage,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
router.post(
  "/delete/home/review/:id",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const homepage = await HomePage.findOne();
      const imageId = req.body.imageId.toString();
      const img = await gfsBucket
        .find({ _id: new ObjectId(imageId) })
        .toArray();

      if (img.length === 0) {
        return res.status(404).json({
          error: "Image not found",
        });
      }

      gfsBucket.delete(new ObjectId(imageId), async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, error: err });
        }
      });
      const home = homepage?.review?.filter((i) => i?.uid !== req.params.id);
      homepage.review = home;
      await homepage.save();
      res.status(200).json({
        success: true,
        homepage,
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.post("/upload/post", isAuthenticatedAdmin, async (req, res, next) => {
  try {
    const imageFile = req.files.image;
    const imageRandomName = crypto.randomBytes(20).toString("hex");
    const imageStream = Readable.from(imageFile.data);
    const imageUploadStream = await gfsBucket.openUploadStream(imageRandomName);
    imageStream.pipe(imageUploadStream);
    const currentDate = new Date();

    // Extract day, month, and year components
    const day = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = String(currentDate.getFullYear()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    const info = {
      uid: uuidv4(),
      content: req.body.content,
      heading: req.body.heading,
      filename: imageRandomName,
      mimetype: imageFile?.mimetype,
      _id: imageUploadStream.id,
      shown: true,
      date: formattedDate,
    };
    const homepage = await HomePage.findOne();
    homepage.posts.push(info);
    await homepage.save();
    res.status(201).json({
      success: true,
      homepage: homepage,
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});
router.get("/status/post/:id", isAuthenticatedAdmin, changeStatusPost);
router.get("/status/blog/:id", isAuthenticatedAdmin, changeStatusBlogs);
router.post("/upload/blog", isAuthenticatedAdmin, addBlog);
router.post(
  "/upload/home/health",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);

      const info = {
        uid: uuidv4(),
        filename: imageRandomName,
        mimetype: imageFile?.mimetype,
        _id: imageUploadStream.id,
      };
      const home = await HomePage.findOne();
      home.health.push(info);
      await home.save();
      res.status(201).json({
        home: home,
        message: "Health Image Uploaded Successfully",
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  })
);
router.post(
  "/delete/home/health/:id",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const homepage = await HomePage.findOne();
      const imageId = req.body.imageId.toString(); // Convert to string explicitly
      const img = await gfsBucket
        .find({ _id: new ObjectId(imageId) })
        .toArray();

      if (img.length === 0) {
        return res.status(404).json({
          error: "Image not found",
        });
      }

      const del = await gfsBucket.delete(new ObjectId(imageId), async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, error: err });
        }
      });
      const home = homepage?.health?.filter((i) => i?.uid !== req.params.id);
      homepage.health = home;
      await homepage.save();

      res.status(200).json({
        success: true,
        homepage,
        message: "Health Image Deleted Successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
// DENTAL BANNER
router.post(
  "/upload/dental/banner",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);

      const dental = await Dental.findOne();

      if (dental.banner && dental?.banner.filename) {
        // const fileObjectId = new ObjectId();
        gfsBucket.delete(dental?.banner._id, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err });
          }
        });
        dental.banner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await dental.save();

        res.status(200).json({
          success: true,
          dental,
          message: "Dental Banner Uploaded Successfully",
        });
      } else {
        dental.banner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await dental.save();

        res.status(200).json({
          success: true,
          dental,
          message: "Dental Banner Uploaded Successfully",
        });
      }
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
// dental PLANS ROUTES
router.post("/upload/dental/plan", isAuthenticatedAdmin, uploadPlans);
router.get("/delete/dental/plan/:id", isAuthenticatedAdmin, deletePlans);

// DENTAL INCLUSIONS
router.post(
  "/upload/dental/inclusions",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);

      const dental = await Dental.findOne();
      const info = {
        img: {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        },
        price: req.body.price,
        points: JSON.parse(req.body.inclusions),
      };
      dental.inclusion.push(info);
      await dental.save();
      res.status(201).json({
        dental: dental,
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.get(
  "/delete/dental/inclusions/:id",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const id = req.params.id;

      gfsBucket.delete(new ObjectId(id), async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, error: err });
        }
      });
      const dental = await Dental.findOne();
      const data = dental.inclusion.filter(
        (i) => i?.img?._id.toString() !== id
      );
      dental.inclusion = data;
      await dental.save();
      // await Dental.findOneAndUpdate(dental);
      res.status(200).json({
        message: "Inclusions Deteleted Successfully",
        dental,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  })
);
router.get("/doctor/verified/:id", isAuthenticatedAdmin, verifyDoctor);
router.post(
  "/update/consultfees",
  isAuthenticatedAdmin,
  updateConsultationFees
);
// DENTAL CONSULTATION
router.post(
  "/upload/dental/doctor",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);
      const info = {
        img: {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        },
        language: JSON.parse(req.body.language),
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
        expierence: req.body.expierence,
        doctorType: "Dental",
      };
      const doctor = await new DentalDoctor(info).save();
      res.status(201).json({
        success: true,
        doctor,
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.get(
  "/delete/dental/doctor/:id",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const d = await DentalDoctor.findById(req.params.id);
      const imageId = d.img._id;
      gfsBucket.delete(imageId, async (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ success: false, error: err });
        }
      });
      const dental = await DentalDoctor.findOneAndDelete({
        _id: req.params.id,
      });

      res.status(201).json({
        success: true,
        dental,
        message: "Doctor Deleted Successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.post(
  "/update/dental/doctor/:id",
  isAuthenticatedAdmin,
  updateDentalDoctor
);
router.get("/shown/dental/doctor/:id", isAuthenticatedAdmin, shownDentalDoctor);
// DENTAL EQUIPMENTS
router.post(
  "/upload/dental/equipment",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFiles = req.files.images; // Note the change to 'images' to match the name attribute in the form
      const uploadedImages = [];
      // Process each image
      if (Array.isArray(imageFiles)) {
        for (const imageFile of imageFiles) {
          const imageRandomName = crypto.randomBytes(20).toString("hex");
          const imageStream = Readable.from(imageFile.data);
          const imageUploadStream = await gfsBucket.openUploadStream(
            imageRandomName
          );

          imageStream.pipe(imageUploadStream);

          uploadedImages.push({
            filename: imageRandomName,
            mimetype: imageFile?.mimetype,
            _id: imageUploadStream.id,
          });
        }
      } else {
        const imageRandomName = crypto.randomBytes(20).toString("hex");
        const imageStream = Readable.from(imageFiles.data);
        const imageUploadStream = await gfsBucket.openUploadStream(
          imageRandomName
        );
        imageStream.pipe(imageUploadStream);
        uploadedImages.push({
          filename: imageRandomName,
          mimetype: imageFiles?.mimetype,
          _id: imageUploadStream.id,
        });
      }

      const info = {
        img: uploadedImages,
        description: JSON.parse(req.body.description),
        subname: req.body.subname,
        name: req.body.name,
        colour: req.body.colour,
        details: JSON.parse(req.body.details),
        type: "Dental",
      };
      const equipment = await new Equipment(info).save();
      res.status(201).json({
        success: true,
        equipment,
        message: "Equipment Added Successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
// DELETE DENTAL QUIPMENT
router.get(
  "/delete/dental/equipment/:id",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const eq = await Equipment.findById(req.params.id);
      eq.img?.map((i) => {
        gfsBucket.delete(i?._id, async (err) => {
          if (err) {
            return res.status(500).json({ success: false, error: err });
          }
        });
      });
      const equipment = await Equipment.findOneAndDelete({
        _id: req.params.id,
      });
      res.status(201).json({
        success: true,
        message: "Equipment Deleted Successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
// EYE BANNER
router.post(
  "/upload/eye/banner",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);

      const eye = await EyeCare.findOne();

      if (eye.banner && eye?.banner.filename) {
        // const fileObjectId = new ObjectId();
        gfsBucket.delete(eye?.banner._id, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err });
          }
        });
        eye.banner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await eye.save();

        res.status(200).json({
          success: true,
          eye,
          message: "Eye Care Banner Uploaded Successfully",
        });
      } else {
        eye.banner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await eye.save();

        res.status(200).json({
          success: true,
          eye,
          message: "Eye Care Banner Uploaded Successfully",
        });
      }
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.post(
  "/upload/eye/doctor",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);
      const info = {
        img: {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        },
        language: JSON.parse(req.body.language),
        type: req.body.type,
        name: req.body.name,
        price: req.body.price,
        expierence: req.body.expierence,
        doctorType: "Eye",
      };
      const doctor = await new DentalDoctor(info).save();
      res.status(201).json({
        success: true,
        doctor,
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
// eye plans & packages
router.post("/upload/eye/plan", isAuthenticatedAdmin, uploadEyePlan);
// eye inclusions
router.post(
  "/upload/eye/inclusions",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);

      const eye = await EyeCare.findOne();
      const info = {
        img: {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        },
        price: req.body.price,
        points: JSON.parse(req.body.inclusions),
      };
      eye.inclusion.push(info);
      await eye.save();
      res.status(201).json({
        eye: eye,
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
// eye equipment
router.post(
  "/upload/eye/equipment",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFiles = req.files.images; // Note the change to 'images' to match the name attribute in the form
      const uploadedImages = [];
      // Process each image
      if (Array.isArray(imageFiles)) {
        for (const imageFile of imageFiles) {
          const imageRandomName = crypto.randomBytes(20).toString("hex");
          const imageStream = Readable.from(imageFile.data);
          const imageUploadStream = await gfsBucket.openUploadStream(
            imageRandomName
          );

          imageStream.pipe(imageUploadStream);

          uploadedImages.push({
            filename: imageRandomName,
            mimetype: imageFile?.mimetype,
            _id: imageUploadStream.id,
          });
        }
      } else {
        const imageRandomName = crypto.randomBytes(20).toString("hex");
        const imageStream = Readable.from(imageFiles.data);
        const imageUploadStream = await gfsBucket.openUploadStream(
          imageRandomName
        );
        imageStream.pipe(imageUploadStream);
        uploadedImages.push({
          filename: imageRandomName,
          mimetype: imageFiles?.mimetype,
          _id: imageUploadStream.id,
        });
      }

      const info = {
        img: uploadedImages,
        description: JSON.parse(req.body.description),
        subname: req.body.subname,
        name: req.body.name,
        colour: req.body.colour,
        details: JSON.parse(req.body.details),
        type: "Eye",
      };
      const equipment = await new Equipment(info).save();
      res.status(201).json({
        success: true,
        equipment,
        message: "Equipment Added Successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
router.post("/update/price/doctor/:id",isAuthenticatedAdmin,updatePremiumPrice)
// ALL CONSULTATION
router.get("/get/all/consultation",isAuthenticatedAdmin,getAllConsultation)
router.get("/operator/get/all/consultation",isAuthenticatedOperation,getAllConsultation)
router.get("/get/all/lead",isAuthenticatedAdmin,getLeads)
router.get("/operator/get/all/lead",isAuthenticatedOperation,getLeads)
// PATIENT
router.get("/get/all/patient",isAuthenticatedAdmin,getAllPatient);
router.get("/operator/get/all/patient",isAuthenticatedOperation,getAllPatient);

// UPLOAD DENTAL EQUIPMENT BANNER
router.post(
  "/upload/dental/equipmentBanner",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);

      const dental = await Dental.findOne();

      if (dental.equipmentBanner && dental?.equipmentBanner.filename) {
        // const fileObjectId = new ObjectId();
        gfsBucket.delete(dental?.equipmentBanner._id, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err });
          }
        });
        dental.equipmentBanner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await dental.save();

        res.status(200).json({
          success: true,
          dental,
          message: "Dental Banner Uploaded Successfully",
        });
      } else {
        dental.equipmentBanner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await dental.save();

        res.status(200).json({
          success: true,
          dental,
          message: "Dental Banner Uploaded Successfully",
        });
      }
    } catch (error) {
      res.json({
        error,
      });
      console.log(error);
    }
  })
);
// UPDATE EQUIPMENT STATUS 
router.get("/update/equipment/:id",isAuthenticatedAdmin,updateEquipmentStatus);
router.post("/upload/equipment/review",isAuthenticatedAdmin,AddDentalEquipmentReview);
// IVF BANNER
router.post(
  "/upload/ivf/banner",
  isAuthenticatedAdmin,
  CatchAsyncErrors(async (req, res, next) => {
    try {
      const imageFile = req.files.image;
      const imageRandomName = crypto.randomBytes(20).toString("hex");
      const imageStream = Readable.from(imageFile.data);
      const imageUploadStream = await gfsBucket.openUploadStream(
        imageRandomName
      );
      imageStream.pipe(imageUploadStream);
      const homepage = await HomePage.findOne();

      if (homepage.ivfBanner && homepage?.ivfBanner.filename) {
        console.log(homepage?.ivfBanner.filename);
        // const fileObjectId = new ObjectId();
        gfsBucket.delete(homepage?.ivfBanner._id, async (err) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ success: false, error: err });
          }

          // After successful deletion, update the ivfBanner in the model
        });
        homepage.ivfBanner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await homepage.save();

        res.status(200).json({
          success: true,
          homepage,
          message:"Banner Uploaded Succesffully"

        });
      } else {
        // If no banner exists, create a new one
        homepage.ivfBanner = {
          filename: imageRandomName,
          mimetype: imageFile?.mimetype,
          _id: imageUploadStream.id,
        };
        await homepage.save();

        res.status(200).json({
          success: true,
          homepage,
          message:"Banner Uploaded Succesffully"
        });
      }
    } catch (error) {
      res.json({
        error,
        message:"Error in uploading Banner"

      });
      console.log(error);
    }
  })
);
// IVF REVIEW
router.post("/upload/ivf/review",isAuthenticatedAdmin,CatchAsyncErrors(async(req,res,next)=>{
  const imageFile = req.files.image;
  const imageRandomName = crypto.randomBytes(20).toString("hex");
  const imageStream = Readable.from(imageFile.data);
  const imageUploadStream = await gfsBucket.openUploadStream(
    imageRandomName
  );
  imageStream.pipe(imageUploadStream);
  const homepage = await HomePage.findOne();
  const img = {
    filename: imageRandomName,
    mimetype: imageFile?.mimetype,
    _id: imageUploadStream.id,
  };
  const info = {
    ...img,
    ...req.body

  };
  homepage.ivfReview.push(info);
  await homepage.save();
  res.status(200).json({
    success:true,
    data:homepage.ivfReview,
    message:"Ivf Review Uploaded Successfully"
  })
}))
// DELETE IVF REVIEW 
router.get("/delete/ivf/review/:id",isAuthenticatedAdmin,CatchAsyncErrors(async(req,res,next)=>{
  try {
    const homepage = await HomePage.findOne();
   
    gfsBucket.delete(new ObjectId(req.params.id), async (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err });
      }
    });
      homepage.ivfReview = homepage.ivfReview?.filter((i) => !i._id.equals(new ObjectId(req.params.id)));
      await homepage.save()
    res.status(200).json({
      success:true,
      message:"Review Deleted Succesfully"
    })
  } catch (error) {
    res.json({
      error,
      message:"Error in deleteing Image"
    })
  }
}))
router.get("/get-token",videSdk);
router.post("/room/token",meetingroom);
// GET INSTITUTE DETAILS
router.get("/get/institute",isAuthenticatedAdmin,getInstitution)
router.get("/operator/get/institute",isAuthenticatedOperation,getInstitution)
// GET NETWORK CONSULTATION
router.get("/get/network/consultation",isAuthenticatedAdmin,getNetworkConsultation)
router.get("/operator/get/network/consultation",isAuthenticatedOperation,getNetworkConsultation)
router.post("/validate-meeting/:meetingId", (req, res) => {
  const token = req.body.token;
  const meetingId = req.params.meetingId;

  const url = `https://api.videosdk.live/api/meetings/${meetingId}`;

  const options = {
    method: "POST",
    headers: { Authorization: token },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => res.json(result)) // result will contain meetingId
    .catch((error) => console.error("error", error));
});
module.exports = router;
