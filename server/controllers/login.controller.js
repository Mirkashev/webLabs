const query = require('../query/index.js');
const jwt = require('../providers/jwt.service.js')

const loginController = new class LoginController{
  async post(req, res){
    const {login, password} = req.body;

    const data = await query(
      `SELECT * FROM weblabs.users where login = '${login}' and password = '${password}'`
    );
    
    if(!data[0]) {
      res.status(400).send({message:"Wrong login or password"});
    }else {
      jwt.sign(data[0].login, data[0].roles_id, res);
    }
  }

}();

module.exports = loginController;