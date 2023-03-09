const query = require('../query/index.js');

const rolesController = new class RolesController{
  async get(req, res){
    const data = await query(`SELECT * FROM weblabs.roles`);
    res.send(data);
  }
}();

module.exports = rolesController;