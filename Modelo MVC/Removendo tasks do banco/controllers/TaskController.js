// Importo o model do meu controller
const Task = require("../models/Task");

// Aqui no controller é onde conterá as lógicas das minhas views, quando o usuário entra em uma rota,
// ou seja, faz um GET pro servidor, é aqui que eu renderizo a view para ele.

module.exports = class TaskController {
  static createTask(req, res) {
    res.render("tasks/createtask");
  }

  static async saveTask(req, res) {
    const title = req.body.title;
    const description = req.body.description;
    const done = false; // Done sempre false por que nenhuma tarefa que você adiciona vem concluida!

    const task = {
      title,
      description,
      done,
    };

    // Depois de armazenar as variaveis em um objeto eu manipularia esses dados antes de colocalos no banco
    // Verificacoes.
    // Processamento de dados.

    /*
    
    const task = {
      title: req.body.title,
      description: req.body.description,
      done: false,
    }
    
    */

    await Task.create(task);

    res.redirect("/tasks");
  }

  static async viewAllTasks(req, res) {
    const tasks = await Task.findAll({ raw: true });

    res.render("tasks/viewTasks", { tasks });
  }

  static async deleteTask(req, res) {
    await Task.destroy({ where: { id: req.body.id } });

    res.redirect("/tasks");
  }
};
