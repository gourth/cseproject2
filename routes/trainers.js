const express = require('express');
const router = express.Router();

const trainersController = require('../controllers/trainers');

router.get('/', trainersController.getAll);

router.get('/:id', trainersController.getSingle);

router.post('/', trainersController.createTrainers);

router.put('/:id', trainersController.updateTrainers);

router.delete('/:id', trainersController.deleteTrainers);

module.exports = router;