const jwt = require('../providers/jwt.service.js');

const middlewares = new class Middlewares{
  //TODO: Переписать сендстатусы
  async isAuthorized (req, res, next) {
    const roles_id = await jwt.verification(req?.headers?.authorization);
    if(!!roles_id) {
      req.roles_id = roles_id;
      next();
    }else {
      res.sendStatus(401);
      return;
    }
  }

  async isRoleModer (req, res, next){
    if(req.roles_id === 2 || req.roles_id === 3) {
      console.log('middleware moder - OK');
      next();
    }else {
      res.sendStatus(403);
      return;
    }
  }

  async isRoleAdmin(req, res, next) {
    if(req.roles_id === 3) {
      console.log('middleware admin - OK');
      next();
    }else {
      res.sendStatus(403);
      return;
    }
  }

  async validation(req, res, next) {
    if(!!req?.body) {
      let isValidationOk = true;
      for (const [key, value] of Object.entries(req.body)) {
        if(value.length >= 1 && value.length <= 255) {
          if(key === 'phone' && !value.match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/)) {
            isValidationOk = false;
            return;
          }
  
          if(key === 'login' && value.length < 6) {
            isValidationOk = false;
            return;
          }
  
          if(key === 'password' && value.length < 6) {
            isValidationOk = false;
            return;
          }
  
        }else {
          isValidationOk = false;
          return;
        }
      }
      if(isValidationOk) {
        console.log('validation - OK');
        next();
      }else {
        res.sendStatus(400);
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
      return;
    }
  }

}();

module.exports = middlewares;