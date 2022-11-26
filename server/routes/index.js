const express = require('express');
const { QueryTypes } = require('sequelize');
const db = require('../models');

const router = express.Router();

router.post('/login', async (req, res) => {
  console.log(req.body);
  // const query = await db.entities.category.create({});
  // try {
  //   req.send(query);
  // } catch (error) {
  //   res.send(error);
  // }
  // if (req.body) {

  //   console.log(req.body);
  // } else {
  //   console.log('BUG');
  // }
});

router.get('/', async (req, res) => {
  const query = await db.entities.user.findAll();
  try {
    res.send(query);
  } catch (error) {
    res.send(error);
  }
});

router.get('/categories', async (req, res) => {
  const query = await db.entities.category.findAll();
  try {
    res.send(query);
  } catch (error) {
    res.send(error);
  }
});

router.post('/categories', async (req, res) => {
  const query = await db.entities.category.create({});
  try {
    res.send(query);
  } catch (error) {
    res.send(error);
  }
  // if (req.body) {

  //   console.log(req.body);
  // } else {
  //   console.log('BUG');
  // }
});

// create new category

// edit category

// remove category

module.exports = router;
