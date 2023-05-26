const express = require("express");
const router = express.Router();

const CakeController = require("../controllers/CakeController");

router.get('/', CakeController.showAllCakes)
router.get('/create', CakeController.createCake)
router.post('/create', CakeController.createCakeSave)
router.get('/:id', CakeController.getOneCake)

module.exports = router;
