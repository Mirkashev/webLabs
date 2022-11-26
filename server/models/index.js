'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

const Category = sequelize.define('category', {
  name: Sequelize.STRING,
});

const SubCategory = sequelize.define('sub_category', {
  name: Sequelize.STRING,
});

const Good = sequelize.define('good', {
  name: Sequelize.STRING,
  description: Sequelize.STRING,
});

const User = sequelize.define('user', {
  name: Sequelize.STRING,
  login: Sequelize.STRING,
  password: Sequelize.STRING,
  role: Sequelize.STRING,
});

Category.hasMany(SubCategory);
SubCategory.hasMany(Good);
User.hasMany(Good);

db.sequelize = sequelize;
db.entities = {
  user: User,
  category: Category,
  subCategory: SubCategory,
  good: Good,
};
db.Sequelize = Sequelize;

module.exports = db;

