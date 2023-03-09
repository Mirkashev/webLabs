const express = require('express');
const router = express.Router();
const Middlewares = require('../middlewares/index.js');

const categoriesService = require('../services/categories.service.js');
const requestsService = require('../services/requests.service.js');
const usersService = require('../services/users.service.js');
const tablesService = require('../services/tables.service.js');
const rolesService = require('../services/roles.service.js');
const loginService = require('../services/login.service.js');
const registrationService = require('../services/registration.service.js')

const accessTokenSecret = 'somesecrettext';
const middlewares = new Middlewares(accessTokenSecret);

router.get('/tables', middlewares.isAuthorized, tablesService.get)



router.get('/categories', middlewares.isAuthorized, categoriesService.get);

router.post('/categories', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.validation, categoriesService.post);

router.delete('/categories', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.hasQueryId, categoriesService.delete);

router.patch('/categories', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.validation, 
  middlewares.hasQueryId, categoriesService.update);



router.get('/requests', middlewares.isAuthorized, requestsService.get);

router.post('/requests', middlewares.isAuthorized, middlewares.isRoleModer, 
  middlewares.validation, requestsService.post);

router.delete('/requests', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.hasQueryId, requestsService.delete);

router.patch('/requests', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.validation, 
  middlewares.hasQueryId, requestsService.update);



router.get('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, usersService.get);

router.post('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, middlewares.validation, usersService.post);

router.patch('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, middlewares.validation, 
  middlewares.hasQueryId, usersService.update);

router.delete('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, middlewares.hasQueryId, usersService.delete);



router.get('/roles', middlewares.isAuthorized, middlewares.isRoleAdmin, rolesService.get);



router.post('/login', middlewares.validation, loginService.post);



router.post('/registration', middlewares.validation, registrationService.post);



module.exports = router;
