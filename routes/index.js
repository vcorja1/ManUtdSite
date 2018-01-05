// Require router dependencies
var express = require('express');
var app = express();

// GET response for '/'
app.get('/', function(req, res, next) {

  try {
    res.render('index', {
      title: 'Home Page'
    });
  }
  catch (e) {
    // If there are any errors, send them off the the logger
    next(e);
  }

});

module.exports = app;