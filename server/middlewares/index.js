const jwt = require('../providers/jwt.service.js');
const query = require('../query/index.js');
//TODO: переписать отдельными классами миделвейры

const middlewares = new class Middlewares{
  async isAuthorized (req, res, next) {
    const { login, roles_id } = await jwt.verification(req?.headers?.authorization) || { login: false, roles_id: false };
    const isLoginExists = (await query(`select login from users where login = '${login}'`))[0]?.login === login;
    
    if(isLoginExists) {
      req.roles_id = roles_id;
      next();
    }else {
      res.status(401).send({message: 'unauthorized'});
      return;
    }
  }

  async isRoleModer (req, res, next){
    if(req.roles_id === 2 || req.roles_id === 3) {
      console.log('middleware moder - OK');
      next();
    }else {
      res.status(403).send({message: 'access denied'});
      return;
    }
  }

  async isRoleAdmin(req, res, next) {
    if(req.roles_id === 3) {
      console.log('middleware admin - OK');
      next();
    }else {
      res.status(403).send({message: 'access denied'});
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
        res.status(400).send({message: 'invalid data'});
      }
    }else {
      res.status(400).send({message: 'invalid data'})
    }
  
  }

  async hasQueryId(req, res, next) {
    if(!!req.query?.id) {
      next();
    }else {
      res.status(400).send({message: 'invalid url params'});
      return;
    }
  }

  async isLoginFree(req, res, next) {
    const {login} = req.body;

    const checkData = await query(
      `SELECT * FROM weblabs.users where login = '${login}'`
    );
  
    if(!!checkData[0]) {
      res.status(200).send({message:"This login already in use"});
    }else {
      next();
    }
  }

}();

module.exports = middlewares;