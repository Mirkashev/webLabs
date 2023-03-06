const query = require('../query/index.js');

const tablesService = new class TablesService{
  async get(req, res){
    let data = await query('show tables');

    if(req.roles_id !== 3) {
      data = data.filter((el) => el.Tables_in_weblabs !== 'users');
    }
  
    data = data.filter((el) => el.Tables_in_weblabs !== 'roles');
  
    res.send(data);
  }
}();

module.exports = tablesService;