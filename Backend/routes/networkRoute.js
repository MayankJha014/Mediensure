const express = require("express");
const { isAuthenticated, isAuthenticatedAdmin, isAuthenticatedOperation } = require("../middlewares/auth");
const { getDoctor, registerNetwork, bookNetworkConsultation, updateNetwork } = require("../controllers/networkController");
const router = express.Router();


router.get("/get/doctors/:pincode",getDoctor)
router.post("/register/doctor",registerNetwork);
router.post("/book/consultation/:id",isAuthenticated,bookNetworkConsultation)
router.post("/update/network/:id",isAuthenticatedAdmin,updateNetwork)
router.post("/operator/update/network/:id",isAuthenticatedOperation,updateNetwork)
module.exports = router;