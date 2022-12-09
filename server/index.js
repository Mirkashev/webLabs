const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000


app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql2');
const urlencodedParser = express.urlencoded({extended: false});

const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "weblabs",
    password: "root"
  });

  app.set("view engine", "hbs");

  app.get("/", function(req, res){
    pool.query("SELECT * FROM table1", function(err, data) {
      if(err) return console.log(err);
      res.render("index.hbs", {
          users: data
      });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

// app.get("/create", function(req, res){
//     res.render("create.hbs");
// });

// const connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database:'weblabs'
// });


// connection.connect();

// connection.query('SELECT * from table1', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0].solution);
// });


// app.get('/', (req, res) => {
//   connection.query('SELECT * from table1', function(err, rows, fields) {
//     if (err) throw err;
//     res.send(rows[0])

//     console.log('The solution is: ', rows[0]);
//   });
// })

