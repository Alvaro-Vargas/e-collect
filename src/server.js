const express = require('express');
const server = express();

//DB
const db = require('./database/db');

//Config public
server.use(express.static('public'));

//enable req.body
server.use(express.urlencoded({ extended: true }));


// Template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

// ROUTES

server.get('/', (req, res) => {
  return res.render('index.html');
});

server.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

server.post('/savepoint', (req, res) =>{
  //insert data
  const query = `
    INSERT INTO places(
      image,
      name, 
      address,
      address2,
      state,
      city,
      items
    ) VALUES(?,?,?,?,?,?,?);
  `;

  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if(err) {
      return console.log(err);
    } 
    return res.render('create-point.html', { saved: true });
  }
  
  db.run(query, values, afterInsertData);
  
});

server.get('/search', (req, res) => {
  
  const search = req.query.search;

  if(search === "") {
    //Empty search
    return res.render('search-results.html', { total: 0});
  }

  //Get database data
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err) {
      return console.log(err);
    } 

    const total = rows.length;

    return res.render('search-results.html', { places: rows, total } );
  })

  
});

// Start server
server.listen(3000);