const express = require('express');
const router = express.Router();

const trainersController = require('../controllers/trainers');

const validation = require('../middleware/validate')

router.get('/', trainersController.getAll);

router.get('/:id', trainersController.getSingle);

router.post('/', validation.saveTrainer, trainersController.createTrainers);

router.put('/:id', validation.saveTrainer, trainersController.updateTrainers);

router.delete('/:id', trainersController.deleteTrainers);

module.exports = router;