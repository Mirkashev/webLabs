const mysql = require('mysql2/promise');
const config = require('../config/index.js');

let isConnected = false;
async function query(sql, params) {
  console.log(sql);
  if(!isConnected) {
    const connection = await mysql.createConnection(config.db);
    try {
      const [results] = await connection.execute(sql, params);
      console.log(results);
      return results;
      
    } catch (error) {
      console.log(error)
      // Переписать на status 200 
      if(error.errno == 1451) {
        return {status: 200, message:"Fk constraint fails"};
      }
      return {status: 500, message:"Unexpected error"};
    }
  }

  isConnected = true;
}

module.exports = query;
