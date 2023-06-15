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
router.get("/", PetController.getAllPets);

// Rota para ver os pets que um usuario tem
router.get("/mypets", verifyToken, PetController.getAllUserPets);

// Rota que exibe os pets que estou querendo adotar
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);

// Rota que exibe os pets individualmente para marcar visita.
router.get("/:id", PetController.getPetById);

// Rota para deletar o pet
router.delete("/:id", verifyToken, PetController.deletePetById);

// Rota para atualizar o pet
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePetById)

// Rota para agendar consulta com o dono do pet para adoção
router.patch('/schedule/:id', verifyToken, PetController.schedule)

router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)

module.exports = router;
