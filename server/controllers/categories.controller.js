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
    res.status(201).send({message:'created'});
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
    const dbRes = await query(
      `DELETE FROM weblabs.categories where id = ${req.query.id}`
    );
    if(dbRes?.serverStatus === 2) {
      res.status(200).send({message:'deleted'});
    }else {
      res.status(dbRes.status).send({message:dbRes.message});
    }
  }
}();

module.exports = categoriesController;