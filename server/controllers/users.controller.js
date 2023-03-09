const query = require('../query/index.js');

const usersController = new class UsersController{

  async get(req, res){
    const data = await query(`SELECT * from users ${!!req.query?.search_word ? `where login = '${req.query?.search_word}'` : ''}`);
    res.send(data);
  }

  async post(req, res){
    const {login, password, roles_id} = req.body;

    const isLoginFree = await query(
      `SELECT * FROM weblabs.users where login = '${login}';`
    );

    if(!isLoginFree[0]) {
      const data = await query(`insert into users(login, password, roles_id) 
      values('${login}', '${password}', '${roles_id}')`);
      res.status(201).send(data);
    }else {
      res.status(400).send({message:"This login already in use"});
    }
  }

  async update(req, res){
    await query(
      `update weblabs.users set 
      users.login = '${req.body.login}', 
      users.password = '${req.body.password}', 
      users.roles_id = '${req.body.roles_id}'
      where id = ${req.query.id}`
    );
    res.status(200).send('updated');
  }

  async delete(req, res){
    await query(`delete from users where id = ${req.query.id}`);
    res.status(200).send('deleted');
  }
}();

module.exports = usersController;