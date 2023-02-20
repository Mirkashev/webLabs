const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
// const ExpressFormidable = require('express-formidable');

const app = express();
const port = 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(ExpressFormidable());

// app.use('/api', routes);

app.use('/api', cors(), routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
