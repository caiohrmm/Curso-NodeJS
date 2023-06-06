const router = require("express").Router();

// Importando controller
const UserController = require("../controllers/UserController.js");

// Importando middleware de filtro de imagem
const { imageUpload } = require("../helpers/image-upload.js");

// Importando o middleware de verificação de token
const verifyToken = require("../helpers/verify-token.js");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/checkuser", UserController.checkUser);
router.get("/:id", UserController.getUserById);
router.patch(
  "/edit/:id",
  verifyToken,
  imageUpload.single("image"),
  UserController.editUser
); // Essa rota precisa ser protegida.

module.exports = router;
