const express = require('express');
const server = express();

//Config public
server.use(express.static('public'));

// Template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

//routes
server.get('/', (req, res) => {
  return res.render('index.html');
});

server.get('/create-point', (req, res) => {
  return res.render('create-point.html');
});

server.get('/search', (req, res) => {
  return res.render('search-results.html');
});

// Start server
server.listen(3000);