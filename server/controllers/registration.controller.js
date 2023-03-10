const query = require('../query/index.js');

const registrationController = new class RegistrationController{
  async post(req, res){
    const {login, password} = req.body;
    
    await query(
      `INSERT INTO weblabs.users(login, password) values ('${login}', '${password}')`
    );
    res.status(200).send({message:'created'});
  }
}();

module.exports = registrationController;