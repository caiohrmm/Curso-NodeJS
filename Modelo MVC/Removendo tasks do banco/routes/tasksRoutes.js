const express = require("express");
const router = express.Router();

// Em cada rota irei utilizar uma função do controller
// Importando o controller responsável pela rota ou conjunto de rotas.
const TaskController = require("../controllers/TaskController");

router.get("/", TaskController.viewAllTasks);
router.get("/add", TaskController.createTask);
router.post("/save", TaskController.saveTask);
router.post("/delete", TaskController.deleteTask);

module.exports = router;
