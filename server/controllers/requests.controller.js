const query = require('../query/index.js');

const requestsController = new class RequestsController{
  async get(req, res){
    const data = await query(`SELECT * from requests ${!!req.query?.search_word ? 
      `where categories_id IN (select id from categories where categories.name like '${req.query?.search_word}%')`:''}`);
    res.send(data);
  }

  async post(req, res){
    await query(
      `INSERT INTO weblabs.requests (requests.name, phone, 
        requests.description, requests.categories_id) values
        ('${req.body.name}', '${req.body.phone}', '${req.body.description}', '${req.body.categories_id}')`
    );
    res.status(201).send({message:'created'});
  }

  async update(req, res){
    await query(
      `update weblabs.requests set 
      requests.name = '${req.body.name}', 
      requests.phone = '${req.body.phone}', 
      requests.description = '${req.body.description}', 
      requests.categories_id = '${req.body.categories_id}'
      where id = ${req.query.id}`
    );
    res.status(200).send({message:'updated'});
  }

  async delete(req, res){
    await query(
      `DELETE FROM weblabs.requests where id = ${req.query.id}`
    );
    res.status(200).send({message:'deleted'});
  }
}();

module.exports = requestsController;