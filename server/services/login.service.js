const query = require('../query/index.js');

const loginService = new class LoginService{
  async post(req, res){
    const {login, password} = req.body;

    const data = await query(
      `SELECT * FROM weblabs.users where login = '${login}' and password = '${password}'`
    );
    
    if(!data[0]) {
      res.send({message:"Wrong login or password"});
    }else {
      jwt.sign({login: data[0].login, roles_id: data[0].roles_id}, accessTokenSecret, function(err, accessToken) {
        res.json({accessToken});
      });
    }
  }

}();

module.exports = loginService;