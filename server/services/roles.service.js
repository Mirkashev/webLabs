const query = require('../query/index.js');

const rolesService = new class RolesService{
  async get(req, res){
    const data = await query(`SELECT * FROM weblabs.roles`);
    res.send(data);
  }
}();

module.exports = rolesService;