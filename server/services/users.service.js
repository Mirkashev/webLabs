const query = require('../query/index.js');

const usersService = new class UsersService{

  async get(req, res){
    const data = await query(`SELECT * from users ${!!req.query?.search_word ? `where login = '${req.query?.search_word}'` : ''}`);
    res.send(data);
  }

  async post(req, res){
    const {login, password, roles_id} = req.body;

    const isLoginFree = (await query(
      `SELECT * FROM weblabs.users where login = '${login}' and password = '${password}'`
    ))[0];
  
    if(!isLoginFree) {
      const data = await query(`insert into users(login, password, roles_id) 
      values('${login}', '${password}', '${roles_id}')`);
      res.send(data);
    }else {
      res.send({message:"This login already in use"});
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
    res.sendStatus(200);
  }

  async delete(req, res){
    await query(`delete from users where id = ${req.query.id}`);
    res.sendStatus(200);
  }
}();

module.exports = usersService;