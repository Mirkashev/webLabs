const express = require('express');
const query = require('../query/index.js');
const jwt = require('jsonwebtoken');

const accessTokenSecret = 'somesecrettext'

const router = express.Router();

const verification = async function(token) {
  return jwt.verify(token, accessTokenSecret, async function(err, decoded) {
    return decoded?.roles_id;
  });
}

const getRoleMiddleware = async function(req, res, next) {
  const roles_id = await verification(req?.headers?.authorization);
  if(!!roles_id) {
    req.roles_id = roles_id;
    next();
  }else {
    console.log('real here')
    res.sendStatus(403);
  }
}

router.get('/tables', getRoleMiddleware, async function(req, res) {
  if(!!req?.roles_id) {
    let data = await query('show tables');
    console.log(req?.roles_id)
    if(req?.roles_id !== 3) {
      data = data.filter((el) => el.Tables_in_weblabs !== 'users');
    }
    data = data.filter((el) => el.Tables_in_weblabs !== 'roles');

    res.send(data);
  }
})

router.get('/categories', getRoleMiddleware, async function(req, res) {
  if(!!req?.roles_id) {
    const data = await query(`select * from categories where name like '${!!req?.query?.search_word ? req?.query?.search_word : ''}%'`);
    res.send(data);
  }
})

router.post('/categories', getRoleMiddleware, async function(req, res) {
  if(req?.roles_id === 2 || req?.roles_id === 3) {
    if(req?.body?.name.length > 1) {
      const data = await query(
        `INSERT INTO weblabs.categories (categories.name) values
          ('${req?.body?.name}')`
      );
      // send statusCode not data
      res.send(data);
    }else {
      res.sendStatus(400);
    }
  }
})

router.delete('/categories', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 2 || req?.roles_id === 3) {
    const data = await query(
      `DELETE FROM weblabs.categories where id = ${req?.query?.id}`
    );
    res.send(data);
  }
});

router.patch('/categories', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 2 || req?.roles_id === 3) {
    if(req?.body?.name.length > 1) {
      const data = await query(
        `update weblabs.categories set 
        categories.name = '${req?.body?.name}' 
        where id = ${req?.query?.id}`
      );
      res.send(data);
    }
  }
});

router.get('/requests', getRoleMiddleware, async function (req, res) {
  if(!!req?.roles_id) {
      const data = await query(`SELECT * from requests where 
      (name like '${!!req?.query?.search_word ? req?.query?.search_word : ''}%' 
      or phone like '${!!req?.query?.search_word ? req?.query?.search_word : ''}%') 
      ${!!req?.query?.search_params ? `and categories_id = ${req?.query?.search_params}`: ''}`);
      // and categories_id='${!!req?.query?.search_params ? req?.query?.search_params : ''}'`);
      res.send(data);
    }
});

router.post('/requests', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 2 || req?.roles_id === 3) {
    if(req?.body?.name.length >= 1 
      && req?.body?.phone.match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/) 
      && req?.body?.description.length >=1) {
      const data = await query(
        `INSERT INTO weblabs.requests (requests.name, phone, 
          requests.description, requests.categories_id) values
          ('${req?.body?.name}', '${req?.body?.phone}', '${req?.body?.description}', '${req?.body?.categories_id}')`
      );
      res.send(data);
    }else {
      res.sendStatus(400);
    }
  }
});

router.delete('/requests', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 2 || req?.roles_id === 3) {
    const data = await query(
      `DELETE FROM weblabs.requests where id = ${req?.query.id}`
    );
    res.send(data);
  }
});

router.patch('/requests', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 2 || req?.roles_id === 3) {
    if(req?.body?.name.length >= 1 
      && req?.body?.phone.match(/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/) 
      && req?.body?.description.length >=1) {
        const data = await query(
          `update weblabs.requests set 
          requests.name = '${req?.body?.name}', 
          requests.phone = '${req?.body?.phone}', 
          requests.description = '${req?.body?.description}', 
          requests.categories_id = '${req?.body?.categories_id}'
          where id = ${req?.query.id}`
        );
        res.send(data);
      }else {
        res.sendStatus(400);
      }
  }
});

router.get('/users', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 3) {
      console.log('users id')
      const data = await query(`SELECT * from users ${!!req?.query?.search_word ? `where login = '${req?.query?.search_word}'` : ''}`);
      res.send(data);
    }
});

router.post('/users', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 3) {
    // console.log(req.body);
    const {login, password, roles_id} = req?.body;

    // if(login.length < )
    const isLoginFree = (await query(
      `SELECT * FROM weblabs.users where login = '${login}' and password = '${password}'`
    ))[0];

    if(!isLoginFree) {
      const data = await query(`insert into users(login, password, roles_id) 
      values('${login}', '${password}', '${roles_id}')`);
      res.send(data);
    }else {
      res.send({message:"This login already in use"});
    }
  }
});

router.patch('/users', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 3) {
      const data = await query(`SELECT * from users`);
      res.send(data);
    }
});

router.delete('/users', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 3) {
      const data = await query(`delete from users where id = ${req?.query?.id}`);
      res.send(data);
    }
});

router.get('/roles', getRoleMiddleware, async function (req, res) {
  if(req?.roles_id === 3) {
    const data = await query(`SELECT * FROM weblabs.roles`);
    res.send(data);
  }
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
    console.log({login: data[0].login, roles_id: data[0].roles_id});

    jwt.sign({login: data[0].login, roles_id: data[0].roles_id}, accessTokenSecret, function(err, accessToken) {
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

  // console.log(!!checkData[0])

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
