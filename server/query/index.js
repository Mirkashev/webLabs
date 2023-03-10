const mysql = require('mysql2/promise');
const config = require('../config/index.js');

async function query(sql, params) {
  console.log(sql);
  const connection = await mysql.createConnection(config.db);
  try {
    const [results] = await connection.execute(sql, params);
    console.log(results);
    return results;
    
  } catch (error) {
    console.log(error)
    if(error.errno == 1451) {
      return {status: 500, message:"Fk constraint fails"};
    }
    return {status: 500, message:"Unexpected error"};
  }
  
}

module.exports = query;
