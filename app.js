const { v4: uuidv4 } = require('uuid');
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
  const dbFilePath = path.join(__dirname, 'db', 'db.json');
  app.post('/api/note/add', function(req, res) {
    // Generate a unique ID for the new note
    const id = uuidv4();
    
    // Create a new note object with the provided data and the generated ID
    const newNote = {
      id: id,
      title: req.body.title,
      text: req.body.text
    };
  
    // Read existing notes from the JSON file
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      // Parse the existing notes data
      let notes = JSON.parse(data);
  
      // Add the new note to the array of notes
      notes.push(newNote);
  
      // Write the updated notes back to the JSON file
      fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
  
        // Respond with a success message
        res.json({ added: true, id: id });
      });
    });
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
