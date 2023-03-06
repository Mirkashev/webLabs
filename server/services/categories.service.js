const query = require('../query/index.js');

const categoriesService = new class CategoriesService{
  async get(req, res){
    const data = await query(`select * from categories${!!req.query?.search_word ? ` where name like '${req.query?.search_word}%'` : ''}`);
    res.send(data);
  }

  async post(req, res){
    await query(
      `INSERT INTO weblabs.categories (categories.name) values
        ('${req.body.name}')`
    );
    console.log('status OK sended')
    res.sendStatus(200);
  }

  async update(req, res){
    await query(
      `update weblabs.categories set 
      categories.name = '${req.body.name}' 
      where id = ${req.query.id}`
    );
    res.sendStatus(200);
  }

  async delete(req, res){
    await query(
      `DELETE FROM weblabs.categories where id = ${req.query.id}`
    );
    res.sendStatus(200);
  }
}();

module.exports = categoriesService;