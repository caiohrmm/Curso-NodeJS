const router = require("express").Router();

// Middleware
const verifyToken = require("../helpers/verify-token");

// Controller
const PetController = require("../controllers/PetController");

router.post("/create", verifyToken, PetController.create);

module.exports = router;
