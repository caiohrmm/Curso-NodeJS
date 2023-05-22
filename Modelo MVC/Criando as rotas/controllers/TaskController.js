// Importo o model do meu controller
const Task = require("../models/Task");

// Aqui no controller é onde conterá as lógicas das minhas views, quando o usuário entra em uma rota,
// ou seja, faz um GET pro servidor, é aqui que eu renderizo a view para ele.

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/createtask");
  }
  static viewAllTasks(req, res) {
    res.render("tasks/viewTasks");
  }
};
