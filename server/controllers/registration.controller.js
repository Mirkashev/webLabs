const query = require('../query/index.js');

const registrationController = new class RegistrationController{
  async post(req, res){
    const {login, password} = req.body;

    const checkData = await query(
      `SELECT * FROM weblabs.users where login = '${login}'`
    );
  
    if(!!checkData[0]) {
      res.send({message:"This login already in use"});
    }else {
      await query(
        `INSERT INTO weblabs.users(login, password) values ('${login}', '${password}')`
      );
      res.status(200).send({message:'created'});
    }
  }
}();

module.exports = registrationController;