const router = require("express").Router();

// Importando controller
const UserController = require("../controllers/UserController.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get('/:id', UserController.getUserById)

module.exports = router;
