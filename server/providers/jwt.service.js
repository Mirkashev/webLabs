const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somesecrettext';

const jwtService = new class JwtService{
  async sign(log, rol, res){
    jwt.sign({login: log, roles_id: rol}, accessTokenSecret, function(err, accessToken) {
      res.json({accessToken});
    });
  }

  async verification(token) {
    return jwt.verify(token, accessTokenSecret, async function(err, decoded) {
      return decoded?.roles_id;
    });
  }

  async getLogin(token) {
    return jwt.verify(token, accessTokenSecret, async function(err, decoded) {
      return decoded?.login;
    });
  }

}();

module.exports = jwtService;