const fs = require('node:fs');
var createError = require('http-errors');
var express = require('express');
var path = require('path');


var app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


/* GET home page. */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/index.html'))
});
app.get('/notes', function(req, res) {
    res.sendFile(path.join(__dirname+'/public/notes.html'))
  });
  
  app.post('/api/note/add', function(req, res) {
    res.json(({added:true}))
  });

  app.get('/api/note/list', function(req, res) {
fs.readFile(path.join(__dirname+'/db/db.json'), 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  res.json(({items:JSON.parse(data)}))
});
  });


module.exports = app;
