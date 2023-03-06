const jwt = require('jsonwebtoken');

class Middlewares{
  constructor(secretWord) {
    this.secretWord = secretWord; 
  }

  async verification(token, secretWord) {
    return jwt.verify(token, secretWord, async function(err, decoded) {
      return decoded?.roles_id;
    });
  }

  isAuthorized = async (req, res, next) =>{
    const roles_id = await this.verification(req?.headers?.authorization, this.secretWord);
    if(!!roles_id) {
      req.roles_id = roles_id;
      next();
    }else {
      res.sendStatus(401);
    }
  }

  async isRoleModer (req, res, next){
    if(req.roles_id === 2 || req.roles_id === 3) {
      console.log('middleware moder - OK');
      next();
    }else {
      res.sendStatus(403);
    }
  }

  async isRoleAdmin(req, res, next) {
    if(req.roles_id === 3) {
      console.log('middleware admin - OK');
      next();
    }else {
      res.sendStatus(403);
    }
  }

  async validation(req, res, next) {
    if(!!req?.body) {
      for (const [key, value] of Object.entries(req.body)) {
        if(value.length >= 1 && value.length <= 255) {
          if(key === 'phone' && !value.match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)) {
            res.sendStatus(400);
          }
  
          if(key === 'login' && value.length < 6) {
            res.sendStatus(400);
          }
  
          if(key === 'password' && value.length < 6) {
            res.sendStatus(400);
          }
          console.log('validation - OK');
          next();
  
        }else {
          res.sendStatus(400);
        }
      }
    }else {
      res.sendStatus(400);
    }
  
  }

  async hasQueryId(req, res, next) {
    if(!!req.query?.id) {
      next();
    }else {
      res.sendStatus(400);
    }
  }

}

module.exports = Middlewares;