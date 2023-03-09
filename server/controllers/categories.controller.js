const query = require('../query/index.js');

const categoriesController = new class CategoriesController{
  async get(req, res){
    const data = await query(`select * from categories${!!req.query?.search_word ? ` where name like '${req.query?.search_word}%'` : ''}`);
    res.send(data);
  }

  async post(req, res){
    await query(
      `INSERT INTO weblabs.categories (categories.name) values
        ('${req.body.name}')`
    );
    res.status(200).send({message:'created'});
  }

  async update(req, res){
    await query(
      `update weblabs.categories set 
      categories.name = '${req.body.name}' 
      where id = ${req.query.id}`
    );
    res.status(200).send({message:'updated'});
  }

  async delete(req, res){
    await query(
      `DELETE FROM weblabs.categories where id = ${req.query.id}`
    );
    res.status(200).send({message:'deleted'});
  }
}();

module.exports = categoriesController;