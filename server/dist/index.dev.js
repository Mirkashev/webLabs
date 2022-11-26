"use strict";

var express = require('express');

var db = require('./models');

var bodyParser = require('body-parser');

var routes = require('./routes/index');

var cors = require('cors');

var app = express();
app.use(bodyParser.json());
var port = 3030;
db.sequelize.authenticate().then(function () {
  console.log('Connection has been established successfully.');
})["catch"](function (err) {
  console.error('Unable to connect to the database:', err);
});
db.sequelize.sync().then(function () {// return db.entities.user.create({
  //   name: 'Admin123',
  //   login: 'Petrovlog',
  //   password: '123456',
  //   role: 'admin',
  // });
}); // db.sequelize
//   .sync()
//   .then(() => {
// return db.entities.user.create({
//   name: 'Admin123',
//   login: 'Petrovlog',
//   password: '123456',
//   role: 'admin',
// });
//   })
//   .then((admin) => {
//     console.log(
//       admin.get({
//         plain: true,
//       })
//     );
//   });

app.use('/api', cors(), routes);
app.listen(port, function () {
  console.log("app listening on port ".concat(port));
});