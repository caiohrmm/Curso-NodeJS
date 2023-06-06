const router = require("express").Router();

// Middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

// Controller
const PetController = require("../controllers/PetController");

// Rota para criar um novo pet
router.post(
  "/create",
  verifyToken,
  imageUpload.array("images"),
  PetController.create
);

// Rota para ver todos os pets do sistema, nao precisa de autenticação
router.get('/', PetController.getAllPets)

// Rota para ver os pets que um usuario tem
router.get('/mypets', verifyToken, PetController.getAllUserPets)



module.exports = router;
