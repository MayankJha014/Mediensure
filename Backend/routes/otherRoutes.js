const express = require("express");
const { getHomepage, getDental, getDentalDoctor, getDentalEquipment, getEyeCare, getEyeDoctor, getEyeEquipment, getAllDoctors, createLead, getProductId, getPrescriptionDetails, getBlog, getPost } = require("../controllers/othersController");
const router = express.Router();


router.get("/get/homepage",getHomepage)
router.get("/get/dental",getDental)
router.get("/get/dental/doctor",getDentalDoctor)
router.get("/get/dental/equipment",getDentalEquipment)
router.get("/get/eyecare",getEyeCare);
router.get("/get/eye/doctor",getEyeDoctor)
router.get("/get/eye/equipment",getEyeEquipment)
// GET ALL DOCTORS 
router.get("/get/all/doctor",getAllDoctors);
// CREATE LEAD
router.post("/create/lead",createLead);
// get product
router.get("/get/product/:id",getProductId);
router.get("/prescription/:id",getPrescriptionDetails);
router.get("/get/blog/:id",getBlog)
router.get("/get/post/:id",getPost)

module.exports = router