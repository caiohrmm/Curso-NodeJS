const router = require("express").Router();

// Importando controller
const UserController = require("../controllers/UserController.js");

router.post("/register", UserController.register);

module.exports = router;
