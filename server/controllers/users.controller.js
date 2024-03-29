const jwtService = require('../providers/jwt.service.js');
const query = require('../query/index.js');

const usersController = new class UsersController{

  async get(req, res){
    const data = await query(`SELECT * from users ${!!req.query?.search_word ? `where login = '${req.query?.search_word}'` : ''}`);
    res.send(data);
  }

  async post(req, res){
    const {login, password, roles_id} = req.body;

    await query(`insert into users(login, password, roles_id) 
    values('${login}', '${password}', '${roles_id}')`);

    res.status(201).send({message:'created'});
  }

  async update(req, res){
    const {login, password, roles_id} = req.body;

    const checkData = await query(
      `SELECT * FROM weblabs.users where login = '${login}'`
    );

    if(+checkData[0]?.id === +req.query.id) {
      await query(
        `update weblabs.users set 
        users.login = '${login}', 
        users.password = '${password}', 
        users.roles_id = '${roles_id}'
        where id = ${req.query.id}`
      );
      res.status(200).send({message:'updated'});
    }else {
      res.status(200).send({message:'This login already in use!'});
    }
  }

  async delete(req, res){
    const checkData = await query(
      `SELECT users.login FROM weblabs.users where id = ${+req.query.id}`
    );

    if(checkData[0]?.login === await jwtService.getLogin(req.headers.authorization)) {
      res.status(200).send({message:'Cannot delete using user'});
    }else {
      await query(`delete from users where id = ${req.query.id}`);
      res.status(200).send({message:'deleted'});
    }
  }
}();

module.exports = usersController;