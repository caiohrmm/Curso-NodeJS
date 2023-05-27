const router = require("express").Router();

// Importando controller
const UserController = require("../controllers/UserController.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
