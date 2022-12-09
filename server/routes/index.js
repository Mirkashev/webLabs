const express = require('express');
const query = require('../query/index.js');

const router = express.Router();

router.get('/requests', async function (req, res) {
  console.log('try get data');
  try {
    const data = await query('SELECT * FROM requests');
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.post('/requests', async function (req, res) {
  try {
    await query(
      `INSERT INTO weblabs.requests (requests.name, phone, 
        requests.description, requests.type) values
        ('${req.body.name}', '${req.body.phone}', '${req.body.description}', '${req.body.type}')`
    );
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
