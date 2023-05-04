const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('pokemon').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('pokemon').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPokemon = async (req, res) => {
  const pokemon = {
    name: req.body.name,
    type: req.body.type,
    generation: req.body.generation,
    region: req.body.region,
    item: req.body.item,
    moves: req.body.moves
  };
  const response = await mongodb.getDb().db().collection('pokemon').insertOne(pokemon);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the pokemon.');
  }
};

const updatePokemon = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const pokemon = {
    name: req.body.name,
    type: req.body.type,
    generation: req.body.generation,
    region: req.body.region,
    item: req.body.item,
    moves: req.body.moves
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('pokemon')
    .replaceOne({ _id: userId }, pokemon);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the pokemon.');
  }
};

const deletePokemon = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('pokemon').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the pokemon.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createPokemon,
  updatePokemon,
  deletePokemon
};