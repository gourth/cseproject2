const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/pokemon');

const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', pokemonController.getAll);

router.get('/:id', pokemonController.getSingle);

router.post('/', isAuthenticated, pokemonController.createPokemon);

router.put('/:id', isAuthenticated, pokemonController.updatePokemon);

router.delete('/:id', isAuthenticated, pokemonController.deletePokemon);

module.exports = router;