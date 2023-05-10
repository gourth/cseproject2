const express = require('express');
const router = express.Router();

const trainersController = require('../controllers/trainers');

const validation = require('../middleware/validate')

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', trainersController.getAll);

router.get('/:id', trainersController.getSingle);

router.post('/', isAuthenticated, validation.saveTrainer, trainersController.createTrainers);

router.put('/:id', isAuthenticated,validation.saveTrainer, trainersController.updateTrainers);

router.delete('/:id', isAuthenticated, trainersController.deleteTrainers);

module.exports = router;