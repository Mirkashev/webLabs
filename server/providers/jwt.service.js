const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somesecrettext';

const jwtService = new class JwtService{
  async sign(log, rol, res){
    jwt.sign({login: log, roles_id: rol}, accessTokenSecret, function(err, accessToken) {
      res.json({accessToken:accessToken, role: rol});
    });
  }

  async verification(token) {
    return jwt.verify(token, accessTokenSecret, async function(err, decoded) {
      return decoded;
    });
  }

  async getLogin(token) {
    return (await this.verification(token))?.login;
  }

  async getRole(token) {
    return (await this.verification(token))?.roles_id;
  }

}();

module.exports = jwtService;