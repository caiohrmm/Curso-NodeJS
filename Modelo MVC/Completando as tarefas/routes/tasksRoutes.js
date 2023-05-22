const express = require("express");
const router = express.Router();

// Em cada rota irei utilizar uma função do controller
// Importando o controller responsável pela rota ou conjunto de rotas.
const TaskController = require("../controllers/TaskController");

router.get("/", TaskController.viewAllTasks);
router.get("/add", TaskController.createTask);
router.post("/save", TaskController.saveTask);
router.post("/delete", TaskController.deleteTask);
router.get("/update/:id", TaskController.viewForEdit);
router.post("/update", TaskController.updateTask);
router.post("/updateStatus", TaskController.updateStatus)

module.exports = router;
