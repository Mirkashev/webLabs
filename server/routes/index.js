const express = require('express');
const query = require('../query/index.js');

const router = express.Router();

router.get('/tables', async function(req, res) {
  const data = await query('show tables');
  res.send(data);
})

router.get('/categories', async function(req, res) {
  const data = await query(`select * from categories where name like '%${!!req.query?.search_word ? req.query?.search_word : ''}%'`);
  res.send(data);
})
router.post('/categories', async function(req, res) {
  const data = await query(
    `INSERT INTO weblabs.categories (categories.name) values
      ('${req.body.name}')`
  );
  res.send(data);
})

router.delete('/categories', async function (req, res) {
  const data = await query(
    `DELETE FROM weblabs.categories where id = ${req.query.id}`
  );
  res.send(data);
});

router.patch('/categories', async function (req, res) {
  const data = await query(
    `update weblabs.categories set 
    categories.name = '${req.body.name}' 
    where id = ${req.query.id}`
  );
  res.send(data);
});


router.get('/requests', async function (req, res) {
  const data = await query(`SELECT * from requests where 
  name like '%${!!req.query?.search_word ? req.query?.search_word : ''}%' 
  or phone like '%${!!req.query?.search_word ? req.query?.search_word : ''}%'`);
  res.send(data);
});

router.post('/requests', async function (req, res) {
  const data = await query(
    `INSERT INTO weblabs.requests (requests.name, phone, 
      requests.description, requests.categories_id) values
      ('${req.body.name}', '${req.body.phone}', '${req.body.description}', '${req.body.categories_id}')`
  );
  res.send(data);
});

router.delete('/requests', async function (req, res) {
  const data = await query(
    `DELETE FROM weblabs.requests where id = ${req.query.id}`
  );
  res.send(data);
});

router.patch('/requests', async function (req, res) {
  const data = await query(
    `update weblabs.requests set 
    requests.name = '${req.body.name}', 
    requests.phone = '${req.body.phone}', 
    requests.description = '${req.body.description}', 
    requests.categories_id = '${req.body.categories_id}'
    where id = ${req.query.id}`
  );
  res.send(data);
});

module.exports = router;
