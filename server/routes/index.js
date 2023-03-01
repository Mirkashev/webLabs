const express = require('express');
const query = require('../query/index.js');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somesecrettext'

const router = express.Router();

// const verification = async function(token) {
//   jwt.verify(token, accessTokenSecret, async function(err, decoded) {
//     if(!!decoded?.role) {
//       const data = await query(`select * from categories where name like '${!!req?.query?.search_word ? req?.query?.search_word : ''}%'`);
//       res.send(data);
//     }else {
//       res.sendStatus(403);
//     }
//   });
// }

router.get('/tables', async function(req, res) {
  const data = await query('show tables');
  res.send(data);
})

router.get('/categories', async function(req, res) {
  jwt.verify(req?.headers?.authorization, accessTokenSecret, async function(err, decoded) {
    if(!!decoded?.role) {
      const data = await query(`select * from categories where name like '${!!req?.query?.search_word ? req?.query?.search_word : ''}%'`);
      res.send(data);
    }else {
      res.sendStatus(403);
    }
  });

})
router.post('/categories', async function(req, res) {
  jwt.verify(req?.headers?.authorization, accessTokenSecret, async function(err, decoded) {
    if(decoded?.role === 'moder' || decoded?.role === 'admin') {
      const data = await query(
        `INSERT INTO weblabs.categories (categories.name) values
          ('${req?.body?.name}')`
      );
      res.send(data);
    }else {
      res.sendStatus(403);
    }
  });
})

router.delete('/categories', async function (req, res) {
  jwt.verify(req?.headers?.authorization, accessTokenSecret, async function(err, decoded) {
    if(decoded?.role === 'moder' || decoded?.role === 'admin') {
      const data = await query(
        `DELETE FROM weblabs.categories where id = ${req?.query?.id}`
      );
      res.send(data);
    }else {
      res.sendStatus(403);
    }
  });

});

router.patch('/categories', async function (req, res) {
  jwt.verify(req?.headers?.authorization, accessTokenSecret, async function(err, decoded) {
    if(decoded?.role === 'moder' || decoded?.role === 'admin') {
      const data = await query(
        `update weblabs.categories set 
        categories.name = '${req?.body?.name}' 
        where id = ${req?.query?.id}`
      );
      res.send(data);
    }else {
      res.sendStatus(403);
    }
  });

});


router.get('/requests', async function (req, res) {
  jwt.verify(req?.headers?.authorization, accessTokenSecret, async function(err, decoded) {
    if(!!decoded?.role) {
      const data = await query(`SELECT * from requests where 
      (name like '${!!req?.query?.search_word ? req?.query?.search_word : ''}%' 
      or phone like '${!!req?.query?.search_word ? req?.query?.search_word : ''}%') ${!!req?.query?.search_params ? `and categories_id = ${req?.query?.search_params}`: ''}`);
      // and categories_id='${!!req?.query?.search_params ? req?.query?.search_params : ''}'`);
      res.send(data);
    }else {
      res.sendStatus(403);
    }
  });

});

router.post('/requests', async function (req, res) {
  const data = await query(
    `INSERT INTO weblabs.requests (requests.name, phone, 
      requests.description, requests.categories_id) values
      ('${req?.body?.name}', '${req?.body?.phone}', '${req?.body?.description}', '${req?.body?.categories_id}')`
  );
  res.send(data);
});

router.delete('/requests', async function (req, res) {
  const data = await query(
    `DELETE FROM weblabs.requests where id = ${req?.query.id}`
  );
  res.send(data);
});

router.patch('/requests', async function (req, res) {
  const data = await query(
    `update weblabs.requests set 
    requests.name = '${req?.body?.name}', 
    requests.phone = '${req?.body?.phone}', 
    requests.description = '${req?.body?.description}', 
    requests.categories_id = '${req?.body?.categories_id}'
    where id = ${req?.query.id}`
  );
  res.send(data);
});

router.post('/login', async function(req, res) {
  // console.log(req?.body);
  const {login, password} = req?.body;
  // запрос в бд 
  const data = await query(
    `SELECT * FROM weblabs.users where login = '${login}' and password = '${password}'`
  );
  
  // console.log(!!data[0]);
  if(!data[0]) {
    res.send({message:"Wrong login or password"});
  }else {
    console.log({login: data[0].login, role: data[0].role});
    jwt.sign({login: data[0].login, role: data[0].role}, accessTokenSecret, function(err, accessToken) {
      res.json({accessToken});
    });
  }
})

router.post('/registration', async function(req, res) {
  const {login, password} = req?.body;

  // запрос в бд 
  const checkData = await query(
    `SELECT * FROM weblabs.users where login = '${login}'`
  );

  console.log(!!checkData[0])

  if(!!checkData[0]) {
    // вернуть ошибку по правильному
    res.send({message:"This login already in use"});
  }else {
    const data = await query(
      `INSERT INTO weblabs.users(login, password) values ('${login}', '${password}')`
    );
    res.send(data);
  }
})

module.exports = router;
