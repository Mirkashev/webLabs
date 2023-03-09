const query = require('../query/index.js');

const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somesecrettext';


const loginService = new class LoginService{
  async post(req, res){
    const {login, password} = req.body;

    const data = await query(
      `SELECT * FROM weblabs.users where login = '${login}' and password = '${password}'`
    );
    
    if(!data[0]) {
      res.status(400).send({message:"Wrong login or password"});
    }else {
      jwt.sign({login: data[0].login, roles_id: data[0].roles_id}, accessTokenSecret, function(err, accessToken) {
        res.json({accessToken});
      });
    }
  }

}();

module.exports = loginService;