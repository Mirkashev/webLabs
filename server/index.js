const express = require('express');
const db = require('./models');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

const port = 3030;

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize.sync().then(() => {
  // return db.entities.user.create({
  //   name: 'Admin123',
  //   login: 'Petrovlog',
  //   password: '123456',
  //   role: 'admin',
  // });
});

// db.sequelize
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

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
