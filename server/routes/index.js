const express = require('express');
const router = express.Router();
// const Middlewares = require('../middlewares/index.js');

const categoriesController = require('../controllers/categories.controller.js');
const requestsController = require('../controllers/requests.controller.js');
const usersController = require('../controllers/users.controller.js');
const tablesController = require('../controllers/tables.controller.js');
const rolesController = require('../controllers/roles.controller.js');
const loginController = require('../controllers/login.controller.js');
const registrationController = require('../controllers/registration.controller.js')

// const accessTokenSecret = 'somesecrettext';
const middlewares = require('../middlewares/index.js');

router.get('/tables', middlewares.isAuthorized, tablesController.get)



router.get('/categories', middlewares.isAuthorized, categoriesController.get);

router.post('/categories', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.validation, categoriesController.post);

router.delete('/categories', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.hasQueryId, categoriesController.delete);

router.patch('/categories', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.validation, 
  middlewares.hasQueryId, categoriesController.update);



router.get('/requests', middlewares.isAuthorized, requestsController.get);

router.post('/requests', middlewares.isAuthorized, middlewares.isRoleModer, 
  middlewares.validation, requestsController.post);

router.delete('/requests', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.hasQueryId, requestsController.delete);

router.patch('/requests', middlewares.isAuthorized, 
  middlewares.isRoleModer, middlewares.validation, 
  middlewares.hasQueryId, requestsController.update);



router.get('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, usersController.get);

router.post('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, middlewares.validation, usersController.post);

router.patch('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, middlewares.validation, 
  middlewares.hasQueryId, usersController.update);

router.delete('/users', middlewares.isAuthorized, 
  middlewares.isRoleAdmin, middlewares.hasQueryId, usersController.delete);



router.get('/roles', middlewares.isAuthorized, middlewares.isRoleAdmin, rolesController.get);



router.post('/login', middlewares.validation, loginController.post);



router.post('/registration', middlewares.validation, registrationController.post);



module.exports = router;
