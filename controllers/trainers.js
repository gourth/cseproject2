const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


const getAll = async (req, res) => {
  //#swagger.tags=['Trainers']
  //#swagger.summary=Gets all trainers
  //#swagger.description=Select GET to retrieve full list of trainers
  const result = await mongodb.getDb().db('pokedex').collection('trainers').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Trainers']
  //#swagger.summary=Gets a single trainer
  //#swagger.description=Enter ID of trainer to retrieve data
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('pokedex').collection('trainers').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createTrainers = async (req, res) => {
  //#swagger.tags=['Trainers']
  //#swagger.summary=Creates a new trainer
  //#swagger.description=Input info to create a new trainer
  try {
  const trainers = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
    
  };
  const response = await mongodb.getDb().db('pokedex').collection('trainers').insertOne(trainers);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the trainers.');
  }
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateTrainers = async (req, res) => {
  //#swagger.tags=['Trainers']
  //#swagger.summary=Updates a certain trainer
  //#swagger.description=Enter trainer ID to update
  try {
  const userId = new ObjectId(req.params.id);
  const trainers = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('trainers')
    .replaceOne({ _id: userId }, trainers);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the trainers.');
  }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTrainers = async (req, res) => {
  //#swagger.tags=['Trainers']
  //#swagger.summary=Deletes a trainer
  //#swagger.description=Enter trainer ID to delete
  try {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('pokedex').collection('trainers').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the trainers.');
  }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getSingle,
  createTrainers,
  updateTrainers,
  deleteTrainers
};