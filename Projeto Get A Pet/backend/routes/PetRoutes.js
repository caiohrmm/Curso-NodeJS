const router = require("express").Router();

// Middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// Controller
const PetController = require("../controllers/PetController");

router.post("/create", verifyToken, imageUpload.array('images'), PetController.create);

module.exports = router;
