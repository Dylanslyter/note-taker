const path = require('path');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/index'))
});
router.get('/notes', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/note'))
  });
module.exports = router;