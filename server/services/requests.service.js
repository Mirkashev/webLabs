const query = require('../query/index.js');

const requestsService = new class RequestsService{
  async get(req, res){
    const data = await query(`SELECT * from requests where 
    (name like '${!!req.query?.search_word ? req.query?.search_word : ''}%' 
    or phone like '${!!req.query?.search_word ? req.query?.search_word : ''}%') 
    ${!!req.query?.search_params ? `and categories_id = ${req.query?.search_params}`: ''}`);
    res.send(data);
  }

  async post(req, res){
    await query(
      `INSERT INTO weblabs.requests (requests.name, phone, 
        requests.description, requests.categories_id) values
        ('${req.body.name}', '${req.body.phone}', '${req.body.description}', '${req.body.categories_id}')`
    );
    res.sendStatus(200);
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
    res.sendStatus(200);
  }

  async delete(req, res){
    await query(
      `DELETE FROM weblabs.requests where id = ${req.query.id}`
    );
    res.sendStatus(200);
  }
}();

module.exports = requestsService;