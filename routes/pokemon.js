const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/pokemon');

router.get('/', pokemonController.getAll);

router.get('/:id', pokemonController.getSingle);

router.post('/', pokemonController.createPokemon);

router.put('/:id', pokemonController.updatePokemon);

router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;